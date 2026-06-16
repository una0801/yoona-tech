// components/review/due-widget.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReviewRepo } from "@/lib/review";

// 클라이언트 섬: IndexedDB에서 오늘 복습 수를 읽어 표시. 0이면 숨김.
export function DueWidget() {
  const [due, setDue] = useState<number | null>(null);

  useEffect(() => {
    getReviewRepo().getOverview().then((s) => setDue(s.dueCount));
  }, []);

  if (!due) return null; // null(로딩) 또는 0이면 표시 안 함

  return (
    <Link
      href="/review"
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 px-6 py-3 text-base font-extrabold text-white shadow-lg transition-all hover:scale-105"
    >
      <span>🔁</span>
      <span>오늘 복습할 카드 {due}개</span>
    </Link>
  );
}
