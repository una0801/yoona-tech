import staticData from "./quiz-static.json";
import type { QuizQuestion } from "./quiz-types";

const ALL: QuizQuestion[] = staticData.questions as QuizQuestion[];

// section이 주어지면 해당 섹션 문제만, 없으면(또는 해당 섹션 정적문제 없음) 전체에서 랜덤 count개
export function getStaticQuestions(count: number, section?: string): QuizQuestion[] {
  const pool = section ? ALL.filter((q) => q.sourceHref.startsWith(`/${section}/`)) : ALL;
  const base = pool.length ? pool : ALL;
  const shuffled = [...base].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
