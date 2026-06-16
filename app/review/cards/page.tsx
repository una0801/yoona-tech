// app/review/cards/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReviewRepo } from "@/lib/review";
import type { Card } from "@/lib/review/types";

const SOURCE_LABEL: Record<string, string> = {
  quiz_wrong: "퀴즈 오답",
  manual: "수동",
  ai: "AI",
};

export default function CardsPage() {
  const [cards, setCards] = useState<Card[] | null>(null);

  function load() {
    getReviewRepo()
      .listCards()
      .then((list) => setCards(list.sort((a, b) => b.createdAt - a.createdAt)));
  }
  useEffect(load, []);

  async function remove(id: string) {
    if (!confirm("이 카드를 삭제할까요?")) return;
    await getReviewRepo().deleteCard(id);
    load();
  }

  if (!cards) {
    return <div className="max-w-3xl mx-auto py-16 px-4 text-center text-muted-foreground">불러오는 중…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">복습 카드 관리</h1>
        <Link href="/review/dashboard" className="text-sm text-primary underline">
          대시보드 →
        </Link>
      </div>

      {cards.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">
          아직 카드가 없어요. 퀴즈에서 틀린 문제를 복습 카드로 추가해보세요.
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">총 {cards.length}개</p>
          <ul className="space-y-2">
            {cards.map((c) => (
              <li key={c.id} className="flex items-start gap-3 rounded-md border p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium mb-1 break-words">{c.front}</p>
                  <div className="flex gap-2 text-[11px] text-muted-foreground">
                    <span className="uppercase">{c.category}</span>
                    <span>·</span>
                    <span>{SOURCE_LABEL[c.source] ?? c.source}</span>
                  </div>
                </div>
                <button
                  onClick={() => remove(c.id)}
                  className="shrink-0 rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/10"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
