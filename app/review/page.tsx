// app/review/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReviewRepo } from "@/lib/review";
import type { Card } from "@/lib/review/types";
import { GradeButtons } from "@/components/review/grade-buttons";

type Phase = "loading" | "reviewing" | "done";

export default function ReviewPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    getReviewRepo()
      .getDueCards()
      .then((cards) => {
        setQueue(cards);
        setPhase(cards.length ? "reviewing" : "done");
      });
  }, []);

  function advance() {
    const nextIndex = index + 1;
    if (nextIndex >= queue.length) {
      setPhase("done");
    } else {
      setIndex(nextIndex);
      setRevealed(false);
    }
  }

  async function grade(g: number) {
    const card = queue[index];
    await getReviewRepo().recordReview(card.id, g);
    setReviewedCount((n) => n + 1);
    advance();
  }

  // 채점 없이 카드 삭제 후 다음으로
  async function discard() {
    const card = queue[index];
    if (!confirm("이 카드를 삭제할까요?")) return;
    await getReviewRepo().deleteCard(card.id);
    advance();
  }

  if (phase === "loading") {
    return <div className="max-w-2xl mx-auto py-16 px-4 text-center text-muted-foreground">불러오는 중…</div>;
  }

  if (phase === "done") {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <p className="text-3xl mb-3">🎉</p>
        <h1 className="text-2xl font-bold mb-2">오늘 복습 완료</h1>
        <p className="text-muted-foreground mb-8">
          {reviewedCount > 0 ? `${reviewedCount}개 복습함` : "오늘 복습할 카드가 없어요"}
        </p>
        <div className="flex justify-center gap-2">
          <Link href="/review/dashboard" className="rounded-md border px-5 py-2.5 text-sm font-semibold">
            대시보드
          </Link>
          <Link href="/quiz" className="rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold">
            퀴즈 풀기
          </Link>
        </div>
      </div>
    );
  }

  const card = queue[index];
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
        <span>{index + 1} / {queue.length}</span>
        <span className="text-xs uppercase">{card.category}</span>
      </div>

      <div className="border rounded-lg p-6 mb-6 min-h-[160px] whitespace-pre-wrap">
        <p className="font-semibold text-lg mb-4">{card.front}</p>
        {revealed && <p className="border-t pt-4 text-muted-foreground">{card.back}</p>}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full rounded-md bg-primary text-primary-foreground py-3 font-semibold"
        >
          정답 보기
        </button>
      ) : (
        <GradeButtons onGrade={grade} />
      )}

      {card.docSlug && (
        <Link href={card.docSlug} className="mt-4 block text-center text-xs text-primary underline">
          원본 문서 →
        </Link>
      )}

      <button
        onClick={discard}
        className="mt-4 mx-auto block text-xs text-muted-foreground hover:text-red-600"
      >
        이 카드 삭제
      </button>
    </div>
  );
}
