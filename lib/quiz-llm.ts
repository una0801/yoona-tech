import type { QuizDoc, QuizQuestion } from "./quiz-types";
import { extractHeadings, findHeadingSlug, type Heading } from "./headings";

const GEMINI_MODEL = "gemini-2.5-flash-lite"; // 무료 일일 한도가 큰 2.5 세대 모델
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// 본문이 너무 길면 토큰 절감 위해 자름
function truncate(body: string, max = 6000): string {
  return body.length > max ? body.slice(0, max) : body;
}

function buildPrompt(doc: QuizDoc, body: string, count: number): string {
  return [
    `다음은 기술 학습 노트 "${doc.title}"의 내용이다.`,
    `이 내용만을 근거로 한국어 객관식 문제를 정확히 ${count}개 만들어라.`,
    `규칙:`,
    `- 각 문제는 4지선다(보기 4개) 또는 O/X(보기 2개) 중 하나`,
    `- 정답은 반드시 본문 내용에 근거해야 하며, 본문에 없거나 모호한 내용은 출제하지 말 것`,
    `- answerIndex는 0부터 시작하는 정답 보기의 위치이며, 가리키는 보기가 실제 정답인지 다시 확인할 것`,
    `- explanation은 1~2문장 한국어 해설이며, answerIndex가 가리키는 보기가 왜 정답인지와 일치해야 함`,
    `- 정답 보기와 explanation이 모순되면 그 문제는 만들지 말 것`,
    `- 오답 보기도 그럴듯하되 본문 기준으로 명백히 틀린 것으로 만들 것`,
    `- 코드가 들어가면 마크다운 코드 표기를 써라: 짧은 식별자/코드는 백틱(\`code\`), 여러 줄 코드는 \`\`\`python ... \`\`\` 펜스로 감싼다`,
    `- section에는 이 문제의 근거가 된 소제목(## 또는 ### 제목)을 content에서 그대로 복사해 넣어라`,
    `출력은 아래 형식의 JSON 배열만. 다른 텍스트 금지:`,
    `[{"question":"...","options":["...","...","...","..."],"answerIndex":0,"explanation":"...","section":"..."}]`,
    ``,
    `--- 내용 시작 ---`,
    truncate(body),
    `--- 내용 끝 ---`,
  ].join("\n");
}

// 문서 1개 → 문제 count개. 키 없음/HTTP 실패면 throw (route가 폴백)
export async function generateQuestionsForDoc(
  doc: QuizDoc,
  body: string,
  count: number
): Promise<QuizQuestion[]> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not set");

  // maxDuration(60s)보다 앞서 끊어 504 전에 정적 폴백 보장
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 50_000);
  let res: Response;
  try {
    res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(doc, body, count) }] }],
        generationConfig: { temperature: 0.7, responseMimeType: "application/json" },
      }),
      signal: ac.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    // 429면 재시도 시간(초)과 "일일 한도 여부"를 파싱해 에러에 부착
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
      // 일일 한도(PerDay) 위반이면 카운트다운이 무의미 → 플래그
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
    throw err; // → route가 폴백 + retryAfter/dailyLimit 전달
  }

  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  const headings = extractHeadings(body);
  return parseQuizResponse(text, doc.href, headings);
}

// LLM 텍스트 응답에서 JSON 배열을 추출·검증해 유효한 문제만 반환
export function parseQuizResponse(
  text: string,
  sourceHref: string,
  headings: Heading[] = []
): QuizQuestion[] {
  // 코드펜스 제거 후 첫 배열 추출
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "");
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const out: QuizQuestion[] = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const q = item as Record<string, unknown>;
    const question = q.question;
    const options = q.options;
    const answerIndex = q.answerIndex;
    const explanation = q.explanation;

    if (typeof question !== "string" || !question.trim()) continue;
    if (!Array.isArray(options) || options.length < 2 || options.length > 4) continue;
    if (!options.every((o) => typeof o === "string" && o.trim())) continue;
    if (typeof answerIndex !== "number" || !Number.isInteger(answerIndex)) continue;
    if (answerIndex < 0 || answerIndex >= options.length) continue;
    if (typeof explanation !== "string" || !explanation.trim()) continue;

    const section = q.section;
    const anchor =
      typeof section === "string" && headings.length
        ? findHeadingSlug(headings, section)
        : undefined;

    out.push({
      question,
      options: options as string[],
      answerIndex,
      explanation,
      sourceHref,
      anchor,
    });
  }
  return out;
}
