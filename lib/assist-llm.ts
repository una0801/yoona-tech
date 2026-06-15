// AI 학습 도우미 — Gemini 호출 (quiz-llm과 동일 패턴, 응답은 마크다운 텍스트)
const GEMINI_MODEL = "gemini-2.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export type AssistMode = "summarize" | "explain" | "example" | "ask";

function truncate(body: string, max = 8000): string {
  return body.length > max ? body.slice(0, max) : body;
}

function buildPrompt(mode: AssistMode, title: string, body: string, question?: string): string {
  const header = `다음은 기술 학습 노트 "${title}"의 내용이다.`;
  const content = `\n--- 내용 시작 ---\n${truncate(body)}\n--- 내용 끝 ---`;
  const common = `\n출력은 한국어 마크다운. 군더더기 인사말 없이 바로 본론.`;

  switch (mode) {
    case "summarize":
      return `${header} 핵심만 불릿 5개 이내로 요약하라.${common}${content}`;
    case "explain":
      return `${header} 입문자도 이해할 수 있게 쉬운 말과 비유로 풀어 설명하라.${common}${content}`;
    case "example":
      return `${header} 본문 개념을 이해하는 데 도움되는 구체적 예시나 코드 예제를 추가로 제시하라. 코드는 \`\`\`python 펜스로 감싼다.${common}${content}`;
    case "ask":
      return `${header} 아래 질문에 본문을 근거로 답하라. 본문에 없으면 일반 지식임을 밝히고 답하라.\n질문: ${question ?? ""}${common}${content}`;
  }
}

// Gemini 단일 호출 → 텍스트. 실패 시 status/retryAfter/dailyLimit를 붙여 throw (route가 처리)
export async function geminiText(prompt: string, temperature = 0.6): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not set");

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature },
    }),
  });

  if (!res.ok) {
    let retryAfter: number | undefined;
    let dailyLimit = false;
    if (res.status === 429) {
      const errBody = await res.json().catch(() => null);
      const details = errBody?.error?.details ?? [];
      const retry = details.find((d: { retryDelay?: string }) => typeof d?.retryDelay === "string");
      const m =
        retry?.retryDelay?.match(/([\d.]+)s/) ??
        errBody?.error?.message?.match(/retry in ([\d.]+)s/i);
      if (m) retryAfter = Math.ceil(parseFloat(m[1]));
      const quotaFail = details.find(
        (d: { violations?: { quotaId?: string }[] }) => Array.isArray(d?.violations)
      );
      dailyLimit = (quotaFail?.violations ?? []).some((v: { quotaId?: string }) =>
        /PerDay/i.test(v?.quotaId ?? "")
      );
    }
    const err = new Error(`Gemini error ${res.status}`) as Error & {
      status?: number;
      retryAfter?: number;
      dailyLimit?: boolean;
    };
    err.status = res.status;
    err.retryAfter = retryAfter;
    err.dailyLimit = dailyLimit;
    throw err;
  }

  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  return text.trim();
}

// 문서 기반 학습 도우미 응답
export async function generateAssist(
  mode: AssistMode,
  title: string,
  body: string,
  question?: string
): Promise<string> {
  return geminiText(buildPrompt(mode, title, body, question), 0.6);
}
