// 태그 문자열 → 고정 색상 클래스. 같은 태그는 항상 같은 색
// tailwind purge 대비: 클래스명을 리터럴 문자열로 보관
const TAG_COLORS = [
  "bg-pink-200 text-pink-800 border-pink-400",
  "bg-rose-200 text-rose-800 border-rose-400",
  "bg-fuchsia-200 text-fuchsia-800 border-fuchsia-400",
  "bg-purple-200 text-purple-800 border-purple-400",
  "bg-violet-200 text-violet-800 border-violet-400",
  "bg-indigo-200 text-indigo-800 border-indigo-400",
  "bg-sky-200 text-sky-800 border-sky-400",
  "bg-cyan-200 text-cyan-800 border-cyan-400",
  "bg-teal-200 text-teal-800 border-teal-400",
  "bg-emerald-200 text-emerald-800 border-emerald-400",
  "bg-lime-200 text-lime-800 border-lime-400",
  "bg-amber-200 text-amber-800 border-amber-400",
  "bg-orange-200 text-orange-800 border-orange-400",
];

export function tagColorClass(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return TAG_COLORS[hash % TAG_COLORS.length];
}
