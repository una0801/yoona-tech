"use client";

// 홈 복습 카드: IndexedDB에서 오늘 복습 수를 읽음 (서버에선 알 수 없어서 클라이언트 섬)
import { useEffect, useState } from "react";
import Link from "next/link";
import { getReviewRepo } from "@/lib/review";

export function ReviewCard() {
  const [due, setDue] = useState<number | null>(null);

  useEffect(() => {
    getReviewRepo()
      .getOverview()
      .then((s) => setDue(s.dueCount))
      .catch(() => setDue(0));
  }, []);

  return (
    <div className="flex h-full flex-wrap items-center gap-4">
      <b className="min-w-[2ch] text-4xl leading-none text-primary" aria-live="polite">
        {due ?? "–"}
      </b>
      <p className="flex-1 font-semibold">
        오늘 복습할 카드
        <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
          {due ? "퀴즈에서 틀린 문제가 쌓였어요" : "퀴즈에서 틀린 문제가 여기 쌓여요"}
        </span>
      </p>
      {due ? (
        <Link
          href="/review"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          복습 시작
        </Link>
      ) : null}
    </div>
  );
}
