import { NextResponse } from "next/server";
import { getQuizDocBody } from "@/lib/quiz-content";
import { generateAssist, type AssistMode } from "@/lib/assist-llm";

export const dynamic = "force-dynamic";

const MODES: AssistMode[] = ["summarize", "explain", "example", "ask"];

// body: { href: string, title: string, mode: AssistMode, question?: string }
export async function POST(req: Request) {
  let href = "";
  let title = "";
  let mode: AssistMode = "summarize";
  let question: string | undefined;
  try {
    const body = await req.json();
    if (typeof body.href === "string") href = body.href;
    if (typeof body.title === "string") title = body.title;
    if (typeof body.mode === "string" && MODES.includes(body.mode)) mode = body.mode;
    if (typeof body.question === "string") question = body.question;
  } catch {
    // 무시
  }

  if (!href) return NextResponse.json({ error: "href required" }, { status: 400 });
  if (mode === "ask" && !question?.trim()) {
    return NextResponse.json({ error: "question required" }, { status: 400 });
  }

  const docBody = await getQuizDocBody(href);
  if (!docBody) return NextResponse.json({ error: "content not found" }, { status: 404 });

  try {
    const text = await generateAssist(mode, title || href, docBody, question);
    return NextResponse.json({ text });
  } catch (e) {
    const err = e as { status?: number; retryAfter?: number; dailyLimit?: boolean };
    return NextResponse.json(
      {
        error: "AI 응답 생성 실패",
        retryAfter: err.dailyLimit ? undefined : err.retryAfter,
        dailyLimit: err.dailyLimit ?? false,
      },
      { status: err.status === 429 ? 429 : 500 }
    );
  }
}
