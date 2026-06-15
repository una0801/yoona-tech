// 경로 기반으로 각 글 frontmatter에 tags 주입 (이미 tags 있으면 skip)
// 유도 규칙: contents/<cat>/<...중간...>/<leaf>/index.mdx 에서
//   중간 폴더들을 태그로 (카테고리·leaf 제외), 소문자 통일, stoplist 제거, 최대 3개
import { promises as fs } from "fs";
import path from "path";

const CATS = ["cs", "backend", "devops", "ai", "code"];
const STOP = new Set(["note", "index"]);

function deriveTags(relDir, category) {
  const segs = relDir.split("/").filter(Boolean);
  segs.pop(); // leaf(글 자신=title) 제외
  const tags = segs
    .map((s) => s.toLowerCase())
    .filter((s) => !STOP.has(s))
    .slice(0, 3);
  return tags.length ? tags : [category];
}

async function walk(dir, base, category, acc) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, base, category, acc);
    else if (e.name === "index.mdx") {
      const relDir = path.relative(base, dir).split(path.sep).join("/");
      acc.push({ file: p, relDir, category });
    }
  }
}

let updated = 0,
  skipped = 0;
for (const cat of CATS) {
  const base = path.join(process.cwd(), "contents", cat);
  const files = [];
  await walk(base, base, cat, files);
  for (const { file, relDir, category } of files) {
    const raw = await fs.readFile(file, "utf-8");
    if (!raw.startsWith("---")) {
      skipped++;
      continue;
    }
    const end = raw.indexOf("\n---", 3);
    if (end === -1) {
      skipped++;
      continue;
    }
    const fmBlock = raw.slice(0, end);
    if (/^tags:/m.test(fmBlock)) {
      skipped++;
      continue; // 이미 tags 있음
    }
    const tags = deriveTags(relDir, category);
    const tagLine = `tags: [${tags.join(", ")}]`;
    const next = raw.slice(0, end) + "\n" + tagLine + raw.slice(end);
    await fs.writeFile(file, next, "utf-8");
    updated++;
  }
}
console.log(`updated: ${updated}, skipped: ${skipped}`);
