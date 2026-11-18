// 화면용 목차 모델: ROUTES(카테고리 → 섹션 → [소분류] → 문서)를 목록·사이드바가 쓰는 모양으로 변환
import { ROUTES, type EachRoute } from "./routes-config";

export const CATEGORY_LABELS: Record<string, string> = {
  cs: "CS",
  backend: "Backend",
  kubernetes: "Kubernetes",
  aws: "AWS",
  ai: "AI",
  code: "Code",
};

export function categoryLabel(key: string): string {
  return CATEGORY_LABELS[key] ?? key.toUpperCase();
}

export type NavDoc = { title: string; href: string };
export type NavGroup = { label: string; introHref?: string; docs: NavDoc[] };
export type NavSection = {
  title: string;
  href: string;
  introHref?: string;
  count: number;
  groups: NavGroup[];
};
export type NavTree = Record<string, NavSection[]>;

function introOf(node: EachRoute, base: string, exists: (href: string) => boolean) {
  if (!node.intro) return undefined;
  const href = `${base}${node.intro}`;
  return exists(href) ? href : undefined;
}

function buildSection(cat: string, sec: EachRoute, exists: (href: string) => boolean): NavSection {
  const base = `/${cat}${sec.href}`;
  const groups: NavGroup[] = [];
  let loose: NavGroup | null = null;

  for (const item of sec.items ?? []) {
    if (item.items) {
      const gBase = `${base}${item.href}`;
      groups.push({
        label: item.title,
        introHref: introOf(item, gBase, exists),
        docs: item.items
          .filter((d) => !d.items)
          .map((d) => ({ title: d.title, href: `${gBase}${d.href}` }))
          .filter((d) => exists(d.href)),
      });
    } else {
      if (!loose) {
        loose = { label: "", docs: [] };
        groups.push(loose);
      }
      const href = `${base}${item.href}`;
      if (exists(href)) loose.docs.push({ title: item.title, href });
    }
  }

  const kept = groups.filter((g) => g.docs.length > 0 || g.introHref);
  return {
    title: sec.title,
    href: base,
    introHref: introOf(sec, base, exists),
    count: kept.reduce((a, g) => a + g.docs.length, 0),
    groups: kept,
  };
}

export function buildNavTree(
  routes: Record<string, EachRoute[]>,
  exists: (href: string) => boolean
): NavTree {
  const tree: NavTree = {};
  for (const [cat, sections] of Object.entries(routes)) {
    tree[cat] = sections.map((s) => buildSection(cat, s, exists)).filter((s) => s.count > 0);
  }
  return tree;
}

export function sectionHrefs(section: NavSection): string[] {
  const out: string[] = [];
  if (section.introHref) out.push(section.introHref);
  for (const g of section.groups) {
    if (g.introHref) out.push(g.introHref);
    for (const d of g.docs) out.push(d.href);
  }
  return out;
}

export function findDocLocation(
  tree: NavTree,
  href: string
): { category: string; sectionIndex: number } | null {
  for (const [category, sections] of Object.entries(tree)) {
    const sectionIndex = sections.findIndex((s) => sectionHrefs(s).includes(href));
    if (sectionIndex !== -1) return { category, sectionIndex };
  }
  return null;
}

export function categoryOfPath(pathname: string): string | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && first in ROUTES ? first : null;
}

// 복습 카드 카테고리 표시: 개편 전 저장된 devops 카드는 문서 경로로 AWS/Kubernetes 구분
export function cardCategoryLabel(category: string, docSlug: string | null): string {
  if (category === "devops") return docSlug && /^\/(devops\/)?aws\//.test(docSlug) ? "AWS" : "Kubernetes";
  return categoryLabel(category);
}
