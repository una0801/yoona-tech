import { NextResponse } from "next/server";
import { getQuizDocs, getQuizDocBody } from "@/lib/quiz-content";
import { generateQuestionsForDoc } from "@/lib/quiz-llm";
import { getStaticQuestions } from "@/lib/quiz-fallback";
import type { QuizQuestion } from "@/lib/quiz-types";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Vercel 함수 제한 상향 (기본 10s→504 방지, Hobby 최대 60s)

// body: { prefixes?: string[], count?: number } — prefixes 비면 전체 (경로 prefix로 범위 지정)
export async function POST(req: Request) {
  let prefixes: string[] = [];
  let count = 20;
  try {
    const body = await req.json();
    if (Array.isArray(body.prefixes)) {
      prefixes = body.prefixes.filter((s: unknown): s is string => typeof s === "string");
    }
    if (Number.isInteger(body.count) && body.count > 0 && body.count <= 30) count = body.count;
  } catch {
    // 기본값 사용
  }

  const inScope = (href: string) =>
    prefixes.some((p) => href === p || href.startsWith(`${p}/`));

  const allDocs = await getQuizDocs();
  const docs = prefixes.length ? allDocs.filter((d) => inScope(d.href)) : allDocs;
  if (docs.length === 0) {
    return NextResponse.json({ source: "static", questions: getStaticQuestions(count, prefixes) });
  }

  // 범위에서 랜덤 문서 선택 (문서당 일정 문제 수 + 실패/짧은 문서 대비 버퍼 1개)
  // perDoc를 크게 두면 호출 수가 줄어 분당 한도(RPM)·지연에 유리
  const perDoc = 10;
  const numDocs = Math.ceil(count / perDoc) + 1;
  const picked = [...docs].sort(() => Math.random() - 0.5).slice(0, numDocs);

  // 문서별 생성을 병렬 실행 — 순차 대비 대기시간 단축, 한 문서 실패(429/파싱오류)는 건너뜀
  const settled = await Promise.allSettled(
    picked.map(async (doc) => {
      const body = await getQuizDocBody(doc.href);
      return generateQuestionsForDoc(doc, body, perDoc);
    })
  );
  const results: QuizQuestion[] = settled
    .filter((s): s is PromiseFulfilledResult<QuizQuestion[]> => s.status === "fulfilled")
    .flatMap((s) => s.value);

  // 실패들에서 429 재시도 시간(초) 최대값 + 일일 한도 여부 — rate-limit 안내용
  let retryAfter: number | undefined;
  let dailyLimit = false;
  for (const s of settled) {
    if (s.status === "rejected") {
      const r = s.reason as { retryAfter?: number; dailyLimit?: boolean };
      if (typeof r?.retryAfter === "number") retryAfter = Math.max(retryAfter ?? 0, r.retryAfter);
      if (r?.dailyLimit) dailyLimit = true;
    }
  }

  if (results.length > 0) {
    let questions = results.slice(0, count);
    // LLM이 목표 개수보다 적게 만들었으면 정적 풀(같은 섹션)로 보충
    if (questions.length < count) {
      const seen = new Set(questions.map((q) => q.question));
      const fill = getStaticQuestions(count - questions.length, prefixes).filter(
        (q) => !seen.has(q.question)
      );
      questions = [...questions, ...fill];
    }
    return NextResponse.json({ source: "llm", questions });
  }

  // LLM 전부 실패(키 없음/지속 429 등) → 정적 폴백 (범위 기준). 429면 retryAfter/dailyLimit 동봉
  return NextResponse.json({
    source: "static",
    questions: getStaticQuestions(count, prefixes),
    retryAfter: dailyLimit ? undefined : retryAfter, // 일일 한도면 카운트다운 무의미
    dailyLimit,
  });
}
