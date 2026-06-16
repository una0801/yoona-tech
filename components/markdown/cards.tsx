import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

// 개념 카드 그리드 — 핵심 개념을 표 대신 카드로 시각화
export function Cards({
  children,
  cols = 2,
}: PropsWithChildren<{ cols?: 2 | 3 }>) {
  return (
    <div
      className={cn(
        "grid gap-3 my-6",
        cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
      )}
    >
      {children}
    </div>
  );
}

export function Card({
  icon,
  title,
  children,
}: PropsWithChildren<{ icon?: string; title: string }>) {
  return (
    <div className="rounded-xl border bg-stone-50/60 dark:bg-stone-900/40 p-4 transition-colors hover:border-pink-300 dark:hover:border-pink-800">
      <div className="mb-1.5 flex items-center gap-2">
        {icon && <span className="text-xl leading-none">{icon}</span>}
        <span className="font-bold tracking-tight">{title}</span>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-stone-200/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] dark:[&_code]:bg-stone-800">
        {children}
      </div>
    </div>
  );
}
