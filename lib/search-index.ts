// 실제 mdx 파일 기반 검색 색인 (존재하는 페이지만 → 404 없음)
// fs/gray-matter만 사용, 컴포넌트/next-mdx-remote 미import → 모듈 그래프 순환 방지
import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { ROUTES } from "./routes-config";

export type SearchDoc = {
  title: string;
  description?: string;
  href: string;
  type: string;
};

let _searchIndexCache: SearchDoc[] | null = null;

async function walkContents(
  dir: string,
  base: string,
  type: string,
  acc: SearchDoc[]
) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walkContents(p, base, type, acc);
    } else if (e.name === "index.mdx") {
      const raw = await fs.readFile(p, "utf-8");
      const fm = matter(raw).data as { title?: string; description?: string };
      const rel = path.relative(base, dir).split(path.sep).join("/"); // ex) kafka/install
      const href = `/${type}/${rel}`;
      const title = fm.title || rel.split("/").pop() || rel;
      acc.push({ title, description: fm.description, href, type });
    }
  }
}

export async function getSearchIndex(): Promise<SearchDoc[]> {
  if (_searchIndexCache) return _searchIndexCache;
  const types = Object.keys(ROUTES); // cs, backend, devops, ai, code
  const docs: SearchDoc[] = [];
  for (const type of types) {
    const base = path.join(process.cwd(), "contents", type);
    await walkContents(base, base, type, docs);
  }
  _searchIndexCache = docs;
  return docs;
}
