import staticData from "./quiz-static.json";
import type { QuizQuestion } from "./quiz-types";

const ALL: QuizQuestion[] = staticData.questions as QuizQuestion[];

// prefixes(경로 prefix)가 주어지면 그 범위 문제만, 없으면(또는 범위 내 정적문제 없음) 전체에서 랜덤 count개
export function getStaticQuestions(count: number, prefixes?: string[]): QuizQuestion[] {
  const pool =
    prefixes && prefixes.length
      ? ALL.filter((q) =>
          prefixes.some((p) => q.sourceHref === p || q.sourceHref.startsWith(`${p}/`))
        )
      : ALL;
  const base = pool.length ? pool : ALL;
  const shuffled = [...base].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
