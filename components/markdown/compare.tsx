import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

// 두 개념을 나란히 비교 (예: Multi-AZ vs Read Replica)
export function Compare({ children }: PropsWithChildren) {
  return <div className="my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

type Color = "pink" | "sky" | "green" | "amber" | "stone";

const COLOR: Record<Color, string> = {
  pink: "border-pink-300 bg-pink-50/60 dark:border-pink-900 dark:bg-pink-950/20",
  sky: "border-sky-300 bg-sky-50/60 dark:border-sky-900 dark:bg-sky-950/20",
  green: "border-green-300 bg-green-50/60 dark:border-green-900 dark:bg-green-950/20",
  amber: "border-amber-300 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20",
  stone: "border-stone-300 bg-stone-50/60 dark:border-stone-700 dark:bg-stone-900/40",
};

export function CompareCol({
  title,
  subtitle,
  color = "stone",
  children,
}: PropsWithChildren<{ title: string; subtitle?: string; color?: Color }>) {
  return (
    <div className={cn("rounded-xl border-2 p-4", COLOR[color])}>
      <div className="mb-2 border-b pb-2">
        <div className="font-bold tracking-tight">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      <div className="space-y-1.5 text-sm leading-relaxed [&_code]:rounded [&_code]:bg-stone-200/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] dark:[&_code]:bg-stone-800">
        {children}
      </div>
    </div>
  );
}
