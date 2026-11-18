// 태그 칩 색: 브랜드 핑크 한 계열 (무지개 대신). 호출부 호환 위해 함수 시그니처 유지
const TAG_CLASS = "bg-pink-50 text-pink-800 border-pink-200 dark:bg-pink-950/40 dark:text-pink-200 dark:border-pink-900";

export function tagColorClass(tag?: string): string {
  void tag;
  return TAG_CLASS;
}

export function tagColorByIndex(index?: number): string {
  void index;
  return TAG_CLASS;
}
