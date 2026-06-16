// app/review/dashboard/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getReviewRepo } from "@/lib/review";
import type { OverviewStats } from "@/lib/review/types";
import { SevenDayBar } from "@/components/review/seven-day-bar";
import { downloadBackup, restoreBackup } from "@/lib/review/backup";

export default function DashboardPage() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function load() {
    getReviewRepo().getOverview().then(setStats);
  }
  useEffect(load, []);

  async function onRestore(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await restoreBackup(file);
    load();
    e.target.value = "";
  }

  if (!stats) {
    return <div className="max-w-3xl mx-auto py-16 px-4 text-center text-muted-foreground">불러오는 중…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">복습 대시보드</h1>
        <Link href="/review/cards" className="text-sm text-primary underline">
          카드 관리 →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <Stat label="오늘 복습" value={stats.dueCount} accent />
        <Stat label="총 카드" value={stats.totalCards} />
        <Stat label="연속일" value={`${stats.streak}일`} />
      </div>

      {stats.dueCount > 0 && (
        <Link href="/review" className="mb-8 block w-full rounded-md bg-primary text-primary-foreground py-3 text-center font-semibold">
          복습 시작 ({stats.dueCount}개)
        </Link>
      )}

      <h2 className="text-sm font-semibold text-muted-foreground mb-3">최근 7일</h2>
      <div className="border rounded-lg p-4 mb-8">
        <SevenDayBar data={stats.last7} />
      </div>

      <div className="flex gap-2">
        <button onClick={downloadBackup} className="flex-1 rounded-md border py-2.5 text-sm font-semibold">
          백업 내보내기
        </button>
        <button onClick={() => fileRef.current?.click()} className="flex-1 rounded-md border py-2.5 text-sm font-semibold">
          백업 가져오기
        </button>
        <input ref={fileRef} type="file" accept="application/json" onChange={onRestore} className="hidden" />
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 text-center ${accent ? "border-pink-300 bg-pink-50 dark:bg-pink-950/20" : ""}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
