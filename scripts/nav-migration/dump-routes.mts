// 현재 ROUTES를 전체 href 트리 JSON으로 덤프 (node 22+ 타입 스트리핑으로 실행)
import fs from "node:fs";
import path from "node:path";

const { ROUTES } = await import(path.join(process.cwd(), "lib/routes-config.ts"));

type Node = { title: string; href: string; noLink?: boolean; items?: Node[] };

function walk(type: string, node: any, parent = ""): Node {
  const full = parent + node.href;
  const out: Node = { title: node.title, href: `/${type}${full}` };
  if (node.noLink) out.noLink = true;
  if (node.items) out.items = node.items.map((c: any) => walk(type, c, full));
  return out;
}

const data = Object.entries(ROUTES).map(([type, sections]: [string, any]) => ({
  type,
  sections: sections.map((s: any) => walk(type, s)),
}));
fs.writeFileSync(process.argv[2], JSON.stringify(data, null, 1));
