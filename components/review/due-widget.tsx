// components/review/due-widget.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Repeat } from "lucide-react";
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
      className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Repeat className="h-4 w-4" aria-hidden />
      <span>오늘 복습할 카드 {due}개</span>
    </Link>
  );
}
