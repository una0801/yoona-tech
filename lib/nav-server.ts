// 서버 전용: 실제 파일 존재 여부를 반영한 NavTree (빈 문서·빈 섹션 숨김)
import fs from "fs";
import path from "path";
import { ROUTES, type EachRoute } from "./routes-config";
import { buildNavTree, findDocLocation, sectionHrefs, type NavTree } from "./nav";

let cache: NavTree | null = null;

export function docFileExists(href: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "contents", href, "index.mdx"));
}

export function getNavTree(): NavTree {
  if (!cache) cache = buildNavTree(ROUTES as Record<string, EachRoute[]>, docFileExists);
  return cache;
}

// 카테고리 안 읽기 순서 (섹션 소개 → 소분류 소개 → 문서)
export function getPreviousNext(href: string): {
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
} {
  const tree = getNavTree();
  const loc = findDocLocation(tree, href);
  if (!loc) return { prev: null, next: null };
  const titles = new Map<string, string>();
  const order = tree[loc.category].flatMap((s) => {
    if (s.introHref) titles.set(s.introHref, `${s.title} 개요`);
    for (const g of s.groups) {
      if (g.introHref) titles.set(g.introHref, `${g.label} 개요`);
      for (const d of g.docs) titles.set(d.href, d.title);
    }
    return sectionHrefs(s);
  });
  const i = order.indexOf(href);
  const at = (j: number) => (j >= 0 && j < order.length ? { title: titles.get(order[j])!, href: order[j] } : null);
  return { prev: at(i - 1), next: at(i + 1) };
}
