import { NextResponse } from "next/server";
import { getQuizDocs, getQuizDocBody } from "@/lib/quiz-content";
import { generateQuestionsForDoc } from "@/lib/quiz-llm";
import { getStaticQuestions } from "@/lib/quiz-fallback";
import type { QuizQuestion } from "@/lib/quiz-types";

export const dynamic = "force-dynamic";

// body: { section?: string, count?: number }
export async function POST(req: Request) {
  let section: string | undefined;
  let count = 10;
  try {
    const body = await req.json();
    section = typeof body.section === "string" ? body.section : undefined;
    if (Number.isInteger(body.count) && body.count > 0 && body.count <= 20) count = body.count;
  } catch {
    // 기본값 사용
  }

  const allDocs = await getQuizDocs();
  const docs = section ? allDocs.filter((d) => d.href.startsWith(`/${section}`)) : allDocs;
  if (docs.length === 0) {
    return NextResponse.json({ source: "static", questions: getStaticQuestions(count, section) });
  }

  // 범위에서 랜덤 문서 몇 개 선택 (문서당 일정 문제 수)
  const perDoc = 5;
  const numDocs = Math.max(1, Math.ceil(count / perDoc));
  const picked = [...docs].sort(() => Math.random() - 0.5).slice(0, numDocs);

  try {
    const results: QuizQuestion[] = [];
    for (const doc of picked) {
      const body = await getQuizDocBody(doc.href);
      const qs = await generateQuestionsForDoc(doc, body, perDoc);
      results.push(...qs);
    }
    if (results.length === 0) throw new Error("no questions generated");
    return NextResponse.json({ source: "llm", questions: results.slice(0, count) });
  } catch {
    // 키 없음 / 429 / 파싱실패 → 정적 폴백 (섹션 기준)
    return NextResponse.json({ source: "static", questions: getStaticQuestions(count, section) });
  }
}
