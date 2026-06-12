// 경로 segment에 포함되면 제외하는 키워드
const BLOCK_SEGMENTS = new Set([
  "install",
  "hands-on",
  "test",
  "setup",
  "components",
  "tabs",
  "stepper",
  "code-block",
  "custom",
  "image-link",
]);

// 섹션별 추가 제외 (segment 단위)
const CODE_PRACTICE_SEGMENTS = new Set(["programmers", "baekjoon"]);

export function isQuizEligible(input: { href: string; quizFlag?: boolean }): boolean {
  const { href, quizFlag } = input;

  // frontmatter 명시 플래그가 최우선
  if (quizFlag === true) return true;
  if (quizFlag === false) return false;

  const segments = href.split("/").filter(Boolean); // ["backend","kafka","install"]

  // 키워드 블록리스트
  if (segments.some((s) => BLOCK_SEGMENTS.has(s))) return false;

  // code 섹션의 알고리즘 풀이 제외
  if (segments[0] === "code" && segments.some((s) => CODE_PRACTICE_SEGMENTS.has(s))) {
    return false;
  }

  return true;
}
