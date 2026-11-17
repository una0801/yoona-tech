// 문서 경로 판별과 TOC 추출 (컴포넌트 의존 없음)
import path from "path";
import { promises as fs } from "fs";
import GithubSlugger from "github-slugger";
import { ROUTES } from "./routes-config";

// "cs/db/index" → contents/cs/db/index/index.mdx (첫 조각이 카테고리가 아니면 null)
export function getContentPath(slug: string): string | null {
  const [type, ...rest] = slug.split("/").filter(Boolean);
  if (!type || !(type in ROUTES) || rest.length === 0) return null;
  return path.join(process.cwd(), "contents", type, ...rest, "index.mdx");
}

// fullPath: 카테고리 포함 경로 ("aws/architecture/x")
export async function getDocsTocs(fullPath: string) {
  const contentPath = getContentPath(fullPath);
  if (!contentPath) return [];
  try {

    const rawMdx = await fs.readFile(contentPath, "utf-8");

    // 헤딩 추출 — 코드펜스 제거(가짜 헤딩 방지) + rehype-slug와 동일한 github-slugger로 슬러그 생성
    // (자체 sluggify는 ·, — 등 특수문자를 안 지워 실제 id와 불일치 → TOC 앵커 깨짐)
    const noCode = rawMdx.replace(/```[\s\S]*?```/g, "");
    const slugger = new GithubSlugger();
    const headingsRegex = /^(#{2,4})\s+(.+?)\s*#*$/gm;
    let match;
    const extractedHeadings = [];
    while ((match = headingsRegex.exec(noCode)) !== null) {
      const headingLevel = match[1].length;
      const headingText = match[2].trim();

      extractedHeadings.push({
        level: headingLevel,
        text: headingText,
        href: `#${slugger.slug(headingText)}`,
      });
    }
    return extractedHeadings;
  } catch (err) {
    console.error(`❌ Error reading file: ${contentPath}`, err);
    return [];
  }
}
