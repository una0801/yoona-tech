// components/review/seven-day-bar.tsx
"use client";

import type { DayCount } from "@/lib/review/types";

// 차트 라이브러리 없이 tailwind div 막대
export function SevenDayBar({ data }: { data: DayCount[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end justify-between gap-1.5 h-28">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-gradient-to-t from-pink-400 to-fuchsia-400"
            style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? "6px" : "2px" }}
            title={`${d.count}개`}
          />
          <span className="text-[10px] text-muted-foreground">
            {d.dayOffset === 0 ? "오늘" : d.dayOffset}
          </span>
        </div>
      ))}
    </div>
  );
}
