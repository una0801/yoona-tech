"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SparklesIcon, SendIcon } from "lucide-react";

type Mode = "summarize" | "explain" | "example" | "ask";

const ACTIONS: { mode: Mode; label: string }[] = [
  { mode: "summarize", label: "요약" },
  { mode: "explain", label: "쉽게 설명" },
  { mode: "example", label: "예시 더" },
];

export function AiAssistant({ href, title }: { href: string; title: string }) {
  const [loading, setLoading] = useState<Mode | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");

  async function run(mode: Mode, q?: string) {
    if (loading) return;
    setLoading(mode);
    setError("");
    setAnswer("");
    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ href, title, mode, question: q }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          setError(
            data.dailyLimit
              ? "오늘 AI 사용량 한도를 다 썼어요. 내일 다시 시도해 주세요."
              : `요청이 많아요. ${data.retryAfter ?? 30}초 후 다시 시도해 주세요.`
          );
        } else {
          setError(data.error ?? "AI 응답 생성에 실패했어요.");
        }
        return;
      }
      setAnswer(data.text ?? "");
    } catch {
      setError("네트워크 오류가 발생했어요.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="una-card not-prose mt-12 p-5">
      <div className="mb-3 flex items-center gap-2">
        <SparklesIcon className="h-4 w-4 una-accent" />
        <h3 className="font-bold una-heading">AI 학습 도우미</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.mode}
            onClick={() => run(a.mode)}
            disabled={loading !== null}
            className="una-card-link px-3 py-1.5 text-sm font-medium una-heading disabled:opacity-50"
          >
            {loading === a.mode ? "생성 중…" : a.label}
          </button>
        ))}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (question.trim()) run("ask", question.trim());
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="이 글에 대해 질문해보세요"
          className="una-card flex-1 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          type="submit"
          disabled={loading !== null || !question.trim()}
          className="una-card-link flex items-center gap-1 px-3 py-1.5 text-sm font-medium una-heading disabled:opacity-50"
        >
          {loading === "ask" ? "생성 중…" : <SendIcon className="h-4 w-4" />}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {answer && (
        <div className="prose prose-sm mt-4 max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
