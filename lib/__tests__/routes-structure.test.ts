import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { ROUTES, page_routes, type EachRoute } from "@/lib/routes-config";

const CONTENTS = path.join(process.cwd(), "contents");

// ROUTES 밖이라 이동하지 않은 템플릿 잔여 파일
const ORPHANS = new Set([
  "/backend/components",
  "/backend/components/code-block",
  "/backend/components/custom",
  "/backend/components/image-link",
  "/backend/components/note",
  "/backend/components/stepper",
  "/backend/components/tabs",
  "/backend/framework/fast-api/oop/class-instance",
  "/code/note",
  "/code/note/baekjoon",
  "/code/note/baekjoon/mathematics",
  "/code/note/code-block",
  "/code/note/custom",
  "/code/note/image-link",
  "/code/note/stepper",
  "/code/note/tabs",
]);

// 대소문자까지 정확히 일치하는 파일만 인정 (Linux 배포 기준)
function existsExact(href: string): boolean {
  let cur = CONTENTS;
  for (const seg of href.split("/").filter(Boolean)) {
    if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(seg)) return false;
    cur = path.join(cur, seg);
  }
  return fs.existsSync(path.join(cur, "index.mdx"));
}

function walkFiles(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(p, acc);
    else acc.push(p);
  }
  return acc;
}

const allHrefs = Object.entries(page_routes).flatMap(([cat, list]) => list.map((r) => `/${cat}${r.href}`));
const docHrefs = new Set(allHrefs);

describe("routes 구조", () => {
  it("href 중복 없음", () => {
    expect(allHrefs.length).toBe(docHrefs.size);
  });

  it("모든 문서 URL은 3단계", () => {
    expect(allHrefs.filter((h) => h.split("/").filter(Boolean).length !== 3)).toEqual([]);
  });

  it("섹션당 문서 12개, 카테고리당 섹션 12개 이하", () => {
    const count = (n: EachRoute): number => (n.items ? n.items.reduce((a, c) => a + count(c), 0) : 1);
    for (const sections of Object.values(ROUTES) as EachRoute[][]) {
      expect(sections.length).toBeLessThanOrEqual(12);
      for (const s of sections) expect(count(s), s.title).toBeLessThanOrEqual(12);
    }
  });

  it("파일이 있는 문서는 대소문자까지 일치", () => {
    const bad = allHrefs.filter((h) => !existsExact(h) && fs.existsSync(path.join(CONTENTS, h.toLowerCase(), "index.mdx")));
    expect(bad).toEqual([]);
  });

  it("ROUTES 밖 파일은 허용 목록뿐", () => {
    const files = walkFiles(CONTENTS)
      .filter((f) => f.endsWith("index.mdx") && !f.includes(`${path.sep}blogs${path.sep}`))
      .map((f) => "/" + path.relative(CONTENTS, path.dirname(f)).split(path.sep).join("/"));
    expect(files.filter((f) => !docHrefs.has(f) && !ORPHANS.has(f))).toEqual([]);
  });

  it("문서 안 내부 링크는 전부 실제 문서", () => {
    const cats = Object.keys(ROUTES).join("|");
    const re = new RegExp(`[("'](/(?:${cats})/[\\w/.-]+)`, "g");
    const broken: string[] = [];
    const isOrphan = (f: string) => ORPHANS.has("/" + path.relative(CONTENTS, path.dirname(f)).split(path.sep).join("/"));
    for (const f of walkFiles(CONTENTS).filter((x) => x.endsWith(".mdx") && !isOrphan(x))) {
      for (const m of fs.readFileSync(f, "utf-8").matchAll(re)) {
        const href = m[1].replace(/\/$/, "");
        if (/\.\w+$/.test(href)) continue; // 이미지 등 정적 파일
        if (!existsExact(href)) broken.push(`${path.relative(CONTENTS, f)} → ${href}`);
      }
    }
    expect(broken).toEqual([]);
  });
});
