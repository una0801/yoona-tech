import GithubSlugger from "github-slugger";

export type Heading = { text: string; slug: string };

// rehype-slug와 동일한 github-slugger로 헤딩 id 생성. 코드펜스는 제거(가짜 헤딩/중복 카운터 방지)
export function extractHeadings(markdown: string): Heading[] {
  const noCode = markdown.replace(/```[\s\S]*?```/g, "");
  const slugger = new GithubSlugger();
  const re = /^(#{1,6})\s+(.+?)\s*#*$/gm;
  const out: Heading[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(noCode)) !== null) {
    const text = m[2].trim();
    out.push({ text, slug: slugger.slug(text) });
  }
  return out;
}

// LLM이 돌려준 헤딩 텍스트를 실제 슬러그로 매핑 (정확 일치 우선, 부분 일치 보조)
export function findHeadingSlug(headings: Heading[], sectionText: string): string | undefined {
  const norm = (s: string) => s.trim().toLowerCase();
  const target = norm(sectionText);
  if (!target) return undefined;
  const exact = headings.find((h) => norm(h.text) === target);
  if (exact) return exact.slug;
  const partial = headings.find((h) => norm(h.text).includes(target) || target.includes(norm(h.text)));
  return partial?.slug;
}
