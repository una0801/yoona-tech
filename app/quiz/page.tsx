"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Question = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  sourceHref: string;
  anchor?: string;
};

function Markdown({ text, inline = false }: { text: string; inline?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <span>{children}</span>,
        code: ({ className, children }) => {
          const isBlock = /language-/.test(className || "");
          if (isBlock && !inline) {
            return (
              <code className="block font-mono text-xs whitespace-pre-wrap">{children}</code>
            );
          }
          return (
            <code className="px-1 py-0.5 rounded bg-stone-200 dark:bg-stone-800 font-mono text-[0.85em]">
              {children}
            </code>
          );
        },
        pre: ({ children }) =>
          inline ? (
            <span>{children}</span>
          ) : (
            <pre className="my-2 p-3 rounded-md bg-stone-100 dark:bg-stone-900 overflow-x-auto">
              {children}
            </pre>
          ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

const SECTIONS = [
  { key: "", label: "전체 랜덤" },
  { key: "cs", label: "CS" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
  { key: "ai", label: "AI" },
  { key: "code", label: "Code" },
];

type Phase = "select" | "loading" | "playing" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [section, setSection] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [source, setSource] = useState<"llm" | "static">("llm");

  async function start() {
    setPhase("loading");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: section || undefined, count: 10 }),
      });
      const data = await res.json();
      if (!data.questions?.length) throw new Error("empty");
      setQuestions(data.questions);
      setSource(data.source);
      setAnswers([]);
      setCurrent(0);
      setPicked(null);
      setPhase("playing");
    } catch {
      alert("문제를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      setPhase("select");
    }
  }

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((a) => [...a, i]);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setPicked(null);
    }
  }

  if (phase === "select") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-2">📝 퀴즈</h1>
        <p className="text-muted-foreground mb-6 text-sm">정리한 내용으로 객관식 10문제를 풉니다.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={cn(
                "border rounded-md py-3 text-sm",
                section === s.key ? "border-primary bg-primary/10 font-semibold" : "hover:bg-stone-100 dark:hover:bg-stone-900"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button onClick={start} className="w-full bg-primary text-primary-foreground rounded-md py-3 font-semibold">
          시작하기
        </button>
      </div>
    );
  }

  if (phase === "loading") {
    return <div className="max-w-2xl mx-auto py-20 px-4 text-center text-muted-foreground">문제 생성 중…</div>;
  }

  if (phase === "result") {
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0), 0);
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">결과</h1>
        <p className="text-lg mb-6">
          {questions.length}문제 중 <span className="text-primary font-bold">{score}</span>문제 정답
        </p>
        <div className="space-y-4 mb-8">
          {questions.map((q, i) => {
            const correct = answers[i] === q.answerIndex;
            return (
              <div key={i} className="border rounded-md p-4">
                <p className="font-medium mb-1">
                  {correct ? "✅" : "❌"} <Markdown text={q.question} inline />
                </p>
                <p className="text-sm text-muted-foreground mb-1">정답: <Markdown text={q.options[q.answerIndex]} inline /></p>
                <div className="text-sm mb-2"><Markdown text={q.explanation} /></div>
                <Link href={q.anchor ? `${q.sourceHref}#${q.anchor}` : q.sourceHref} className="text-xs text-primary underline">
                  원본 보기 →
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPhase("select")} className="flex-1 border rounded-md py-3">
            다른 범위
          </button>
          <button onClick={start} className="flex-1 bg-primary text-primary-foreground rounded-md py-3 font-semibold">
            새 문제
          </button>
        </div>
      </div>
    );
  }

  // playing
  const q = questions[current];
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        <span>{current + 1} / {questions.length}</span>
        {source === "static" && <span className="text-xs">기존 문제</span>}
      </div>
      <h2 className="text-lg font-semibold mb-6"><Markdown text={q.question} /></h2>
      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answerIndex;
          const show = picked !== null;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={cn(
                "w-full text-left border rounded-md px-4 py-3 text-sm",
                show && isAnswer && "border-green-500 bg-green-500/10",
                show && picked === i && !isAnswer && "border-red-500 bg-red-500/10",
                !show && "hover:bg-stone-100 dark:hover:bg-stone-900"
              )}
            >
              <Markdown text={opt} inline />
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="border-t pt-4">
          <div className="text-sm mb-3"><Markdown text={q.explanation} /></div>
          <div className="flex items-center justify-between">
            <Link href={q.anchor ? `${q.sourceHref}#${q.anchor}` : q.sourceHref} className="text-xs text-primary underline">원본 보기 →</Link>
            <button onClick={next} className="bg-primary text-primary-foreground rounded-md px-6 py-2 text-sm font-semibold">
              {current + 1 >= questions.length ? "결과 보기" : "다음"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
