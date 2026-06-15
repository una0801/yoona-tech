"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes-config";
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

// 표시용 라벨 (없으면 키를 대문자로 fallback)
const CATEGORY_LABELS: Record<string, string> = {
  cs: "CS",
  backend: "Backend",
  devops: "DevOps",
  ai: "AI",
  code: "Code",
};

// ROUTES 키에서 자동 생성 → 새 최상위 카테고리 추가 시 자동 반영
const CATEGORIES = Object.keys(ROUTES).map((key) => ({
  key,
  label: CATEGORY_LABELS[key] ?? key.toUpperCase(),
}));

const COUNTS = [10, 20, 30];

type Phase = "select" | "loading" | "playing" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [category, setCategory] = useState(""); // 포커스한 최상위 카테고리 ("" = 전체)
  const [subgroups, setSubgroups] = useState<string[]>([]); // 카테고리 내 선택한 하위 그룹 href prefix들
  const [count, setCount] = useState(20);

  // 포커스한 카테고리의 하위 그룹 목록 (ROUTES 최상위 항목)
  const subOptions = category
    ? (ROUTES[category as keyof typeof ROUTES] ?? []).map((r) => ({
        prefix: `/${category}${r.href}`,
        label: r.title,
      }))
    : [];

  // 실제 출제 범위(경로 prefix 목록) 계산: 카테고리 없으면 전체, 하위 미선택이면 카테고리 전체
  function computePrefixes(): string[] {
    if (!category) return [];
    if (subgroups.length === 0) return [`/${category}`];
    return subgroups;
  }

  function focusCategory(key: string) {
    setCategory((prev) => (prev === key ? "" : key));
    setSubgroups([]); // 카테고리 바뀌면 하위 선택 초기화
  }
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [source, setSource] = useState<"llm" | "static">("llm");
  const [retryAfter, setRetryAfter] = useState<number | null>(null); // rate-limit 회복까지 남은 초
  const [dailyLimit, setDailyLimit] = useState(false); // 일일 무료 한도 소진 여부

  // 회복 카운트다운 (1초마다 감소)
  useEffect(() => {
    if (!retryAfter || retryAfter <= 0) return;
    const t = setTimeout(() => setRetryAfter(retryAfter - 1), 1000);
    return () => clearTimeout(t);
  }, [retryAfter]);

  async function start() {
    setPhase("loading");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefixes: computePrefixes(), count }),
      });
      const data = await res.json();
      if (!data.questions?.length) throw new Error("empty");
      setQuestions(data.questions);
      setSource(data.source);
      setRetryAfter(typeof data.retryAfter === "number" ? data.retryAfter : null);
      setDailyLimit(!!data.dailyLimit);
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
        <p className="text-muted-foreground mb-6 text-sm">정리한 내용으로 객관식 {count}문제를 풉니다.</p>

        <p className="text-xs font-medium text-muted-foreground mb-2">
          카테고리 <span className="font-normal">· 미선택 시 전체 랜덤</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
          {CATEGORIES.map((s) => (
            <button
              key={s.key}
              onClick={() => focusCategory(s.key)}
              className={cn(
                "border rounded-md py-3 text-sm",
                category === s.key
                  ? "border-primary bg-primary/10 font-semibold"
                  : "hover:bg-stone-100 dark:hover:bg-stone-900"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {category && subOptions.length > 0 && (
          <>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              세부 범위 <span className="font-normal">· 복수 선택 가능, 미선택 시 {category.toUpperCase()} 전체</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
              {subOptions.map((s) => {
                const active = subgroups.includes(s.prefix);
                return (
                  <button
                    key={s.prefix}
                    onClick={() =>
                      setSubgroups((prev) =>
                        prev.includes(s.prefix)
                          ? prev.filter((k) => k !== s.prefix)
                          : [...prev, s.prefix]
                      )
                    }
                    className={cn(
                      "border rounded-md py-2.5 px-2 text-xs text-left",
                      active
                        ? "border-primary bg-primary/10 font-semibold"
                        : "hover:bg-stone-100 dark:hover:bg-stone-900"
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <p className="text-xs font-medium text-muted-foreground mb-2">문제 수</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {COUNTS.map((c) => (
            <button
              key={c}
              onClick={() => setCount(c)}
              className={cn(
                "border rounded-md py-3 text-sm",
                count === c ? "border-primary bg-primary/10 font-semibold" : "hover:bg-stone-100 dark:hover:bg-stone-900"
              )}
            >
              {c}문제
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
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
        <span>{current + 1} / {questions.length}</span>
        {source === "static" && (
          <span className="flex items-center gap-1.5 text-xs">
            <span>기존 문제</span>
            {dailyLimit ? (
              <span className="flex items-center gap-1 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 px-2 py-0.5">
                <CalendarClock className="h-3 w-3" />
                오늘 생성 한도 소진 · 내일 회복
              </span>
            ) : (
              retryAfter != null &&
              retryAfter > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 px-2 py-0.5">
                  <Clock className="h-3 w-3" />약 {retryAfter}초 후 생성 가능
                </span>
              )
            )}
          </span>
        )}
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
