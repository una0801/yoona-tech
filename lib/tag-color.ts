// 태그 문자열 → 고정 색상 클래스. 같은 태그는 항상 같은 색
// tailwind purge 대비: 클래스명을 리터럴 문자열로 보관
// 계열당 1개 + 인접 인덱스가 대비되도록 warm/cool 교차 배열
const TAG_COLORS = [
  "bg-rose-200 text-rose-800 border-rose-400",
  "bg-sky-200 text-sky-800 border-sky-400",
  "bg-amber-200 text-amber-800 border-amber-400",
  "bg-violet-200 text-violet-800 border-violet-400",
  "bg-emerald-200 text-emerald-800 border-emerald-400",
  "bg-orange-200 text-orange-800 border-orange-400",
  "bg-blue-200 text-blue-800 border-blue-400",
  "bg-lime-200 text-lime-800 border-lime-400",
  "bg-fuchsia-200 text-fuchsia-800 border-fuchsia-400",
  "bg-teal-200 text-teal-800 border-teal-400",
  "bg-yellow-200 text-yellow-800 border-yellow-400",
  "bg-cyan-200 text-cyan-800 border-cyan-400",
];

// 해시 기반: 같은 태그는 항상 같은 색 (오늘의 글 등 산발적 태그용)
export function tagColorClass(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return TAG_COLORS[hash % TAG_COLORS.length];
}

// 인덱스 기반: 목록(태그 클라우드)에서 서로 다른 색 보장 (12개까지 무충돌)
export function tagColorByIndex(index: number): string {
  return TAG_COLORS[index % TAG_COLORS.length];
}
