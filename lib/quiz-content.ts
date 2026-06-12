import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { ROUTES } from "./routes-config";
import { isQuizEligible } from "./quiz-eligibility";
import type { QuizDoc } from "./quiz-types";

let _quizDocsCache: QuizDoc[] | null = null;

async function walk(dir: string, base: string, section: string, acc: QuizDoc[]) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(p, base, section, acc);
    } else if (e.name === "index.mdx") {
      const raw = await fs.readFile(p, "utf-8");
      const fm = matter(raw).data as { title?: string; description?: string; quiz?: boolean };
      const rel = path.relative(base, dir).split(path.sep).join("/");
      const href = `/${section}/${rel}`;
      if (!isQuizEligible({ href, quizFlag: fm.quiz })) continue;
      acc.push({
        title: fm.title || rel.split("/").pop() || rel,
        href,
        section,
        description: fm.description,
      });
    }
  }
}

export async function getQuizDocs(): Promise<QuizDoc[]> {
  if (_quizDocsCache) return _quizDocsCache;
  const sections = Object.keys(ROUTES); // cs, backend, devops, ai, code
  const docs: QuizDoc[] = [];
  for (const section of sections) {
    const base = path.join(process.cwd(), "contents", section);
    await walk(base, base, section, docs);
  }
  _quizDocsCache = docs;
  return docs;
}

// href(/backend/kafka/basic)로 mdx 본문(frontmatter 제외) 반환
export async function getQuizDocBody(href: string): Promise<string> {
  const segments = href.split("/").filter(Boolean);
  const section = segments[0];
  const rest = segments.slice(1).join("/");
  const filePath = path.join(process.cwd(), "contents", section, rest, "index.mdx");
  const raw = await fs.readFile(filePath, "utf-8");
  return matter(raw).content;
}
