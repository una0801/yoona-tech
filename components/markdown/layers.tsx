import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

/* 계층/스택 구조 시각화 — OSI 7계층·메모리 레이아웃·메모리 계층 등 */
export function Layers({ children }: PropsWithChildren) {
  return <div className="my-6 flex flex-col gap-1.5">{children}</div>;
}

type Color = "pink" | "sky" | "violet" | "green" | "amber" | "rose" | "cyan" | "stone";

// 모노톤: color prop은 기존 문서 호환용, 모두 같은 단색
const COLOR: Record<Color, string> = {
  pink: "border-border border-l-foreground/40 bg-muted/40",
  sky: "border-border border-l-foreground/40 bg-muted/40",
  violet: "border-border border-l-foreground/40 bg-muted/40",
  green: "border-border border-l-foreground/40 bg-muted/40",
  amber: "border-border border-l-foreground/40 bg-muted/40",
  rose: "border-border border-l-foreground/40 bg-muted/40",
  cyan: "border-border border-l-foreground/40 bg-muted/40",
  stone: "border-border border-l-foreground/40 bg-muted/40",
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
