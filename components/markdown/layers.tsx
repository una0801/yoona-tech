import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

/* 계층/스택 구조 시각화 — OSI 7계층·메모리 레이아웃·메모리 계층 등 */
export function Layers({ children }: PropsWithChildren) {
  return <div className="my-6 flex flex-col gap-1.5">{children}</div>;
}

type Color = "pink" | "sky" | "violet" | "green" | "amber" | "rose" | "cyan" | "stone";

const COLOR: Record<Color, string> = {
  pink: "border-pink-400 bg-pink-50/70 dark:bg-pink-950/20",
  sky: "border-sky-400 bg-sky-50/70 dark:bg-sky-950/20",
  violet: "border-violet-400 bg-violet-50/70 dark:bg-violet-950/20",
  green: "border-green-400 bg-green-50/70 dark:bg-green-950/20",
  amber: "border-amber-400 bg-amber-50/70 dark:bg-amber-950/20",
  rose: "border-rose-400 bg-rose-50/70 dark:bg-rose-950/20",
  cyan: "border-cyan-400 bg-cyan-50/70 dark:bg-cyan-950/20",
  stone: "border-stone-400 bg-stone-50/70 dark:bg-stone-900/40",
};

export function Layer({
  title,
  sub,
  color = "stone",
  children,
}: PropsWithChildren<{ title: string; sub?: string; color?: Color }>) {
  return (
    <div className={cn("flex items-start gap-3 rounded-lg border border-l-4 px-4 py-2.5", COLOR[color])}>
      <div className="w-28 shrink-0 sm:w-36">
        <div className="text-sm font-semibold tracking-tight">{title}</div>
        {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
      </div>
      <div className="flex-1 text-sm leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-stone-200/70 [&_code]:px-1 [&_code]:text-[0.85em] dark:[&_code]:bg-stone-800">
        {children}
      </div>
    </div>
  );
}
