// 한글 분당 ~400자 기준. 코드블록·마크다운 기호 제거 후 글자 수로 계산, 최소 1분
const CHARS_PER_MIN = 400;

export function readingTime(raw: string): number {
  const cleaned = raw
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/[#>*_~\-\[\]()!`>|]/g, "")
    .replace(/\s+/g, "");
  const minutes = Math.ceil(cleaned.length / CHARS_PER_MIN);
  return Math.max(1, minutes);
}
