import { NextResponse } from "next/server";
import { geminiText } from "@/lib/assist-llm";

export const dynamic = "force-dynamic";

// body: { code: string } → 코드의 input() 형식에 맞는 예시 stdin 생성
export async function POST(req: Request) {
  let code = "";
  try {
    const body = await req.json();
    if (typeof body.code === "string") code = body.code;
  } catch {
    // 무시
  }
  if (!code.trim()) return NextResponse.json({ error: "code required" }, { status: 400 });

  const prompt = [
    "다음 파이썬 코드는 input()으로 표준입력을 읽는다.",
    "이 코드가 정상 실행되도록 형식에 정확히 맞는 예시 입력값을 생성하라.",
    "규칙:",
    "- 입력값 텍스트만 출력 (설명·주석·코드펜스 금지)",
    "- 코드가 읽는 줄 수/형식을 정확히 맞출 것",
    "- 값은 작고 단순하게",
    "",
    "--- 코드 시작 ---",
    code.slice(0, 4000),
    "--- 코드 끝 ---",
  ].join("\n");

  try {
    let input = await geminiText(prompt, 0.4);
    // 혹시 코드펜스로 감싸 오면 제거
    input = input.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();
    return NextResponse.json({ input });
  } catch (e) {
    const err = e as { status?: number; retryAfter?: number; dailyLimit?: boolean };
    return NextResponse.json(
      {
        error: "예시 입력 생성 실패",
        retryAfter: err.dailyLimit ? undefined : err.retryAfter,
        dailyLimit: err.dailyLimit ?? false,
      },
      { status: err.status === 429 ? 429 : 500 }
    );
  }
}
