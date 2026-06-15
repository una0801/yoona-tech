// lib/posts.ts
// 단일 데이터 소스. fs+gray-matter만 사용(컴포넌트/next-mdx-remote 미import → 모듈 순환 방지)
import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { ROUTES } from "./routes-config";
import { readingTime } from "./reading-time";
import {
  computeDate,
  parseTags,
  sortByDateDesc,
  aggregateTags,
  rankRelated,
  type PostMeta,
} from "./posts-utils";

export type { PostMeta };

let _cache: PostMeta[] | null = null;

async function walk(dir: string, base: string, category: string, acc: PostMeta[]) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(p, base, category, acc);
    } else if (e.name === "index.mdx") {
      const raw = await fs.readFile(p, "utf-8");
      const stat = await fs.stat(p);
      const { data, content } = matter(raw);
      const fm = data as {
        title?: string;
        description?: string;
        date?: string;
        tags?: unknown;
        series?: string;
      };
      const rel = path.relative(base, dir).split(path.sep).join("/");
      const title = fm.title || rel.split("/").pop() || rel;
      acc.push({
        title,
        description: fm.description,
        href: `/${category}/${rel}`,
        category,
        date: computeDate(fm.date, stat.mtime),
        tags: parseTags(fm.tags),
        series: fm.series || undefined,
        readingTime: readingTime(content),
      });
    }
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (_cache) return _cache;
  const categories = Object.keys(ROUTES);
  const acc: PostMeta[] = [];
  for (const category of categories) {
    const base = path.join(process.cwd(), "contents", category);
    await walk(base, base, category, acc);
  }
  _cache = sortByDateDesc(acc);
  return _cache;
}

export async function getRecentPosts(n: number): Promise<PostMeta[]> {
  return (await getAllPosts()).slice(0, n);
}

export async function getRandomPosts(n: number): Promise<PostMeta[]> {
  const all = [...(await getAllPosts())];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, n);
}

export async function getCategoryCounts(): Promise<{ category: string; count: number; firstHref: string }[]> {
  const posts = await getAllPosts();
  return Object.keys(ROUTES).map((category) => {
    const inCat = posts.filter((p) => p.category === category);
    const sorted = [...inCat].sort((a, b) => a.href.localeCompare(b.href));
    return {
      category,
      count: inCat.length,
      firstHref: sorted[0]?.href ?? `/${category}`,
    };
  });
}

export async function getAllTags() {
  return aggregateTags(await getAllPosts());
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  return (await getAllPosts()).filter((p) => p.tags.includes(tag));
}

export async function getRelatedPosts(href: string, n: number): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const target = all.find((p) => p.href === href);
  if (!target) return [];
  return rankRelated(target, all, n);
}

export async function getSeriesPosts(series: string): Promise<PostMeta[]> {
  const posts = (await getAllPosts()).filter((p) => p.series === series);
  return [...posts].sort((a, b) => a.date.getTime() - b.date.getTime());
}
