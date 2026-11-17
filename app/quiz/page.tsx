import QuizPage, { type QuizSectionOption } from "@/components/quiz-page";
import { getNavTree } from "@/lib/nav-server";

// 출제 범위 선택지: 실제 문서가 있는 섹션만 (빈 섹션 고르면 다른 카테고리 문제가 섞여 나오던 문제)
export default function Page() {
  const tree = getNavTree();
  const sections: Record<string, QuizSectionOption[]> = Object.fromEntries(
    Object.entries(tree).map(([cat, secs]) => [cat, secs.map((s) => ({ prefix: s.href, label: s.title }))])
  );
  return <QuizPage sections={sections} />;
}
