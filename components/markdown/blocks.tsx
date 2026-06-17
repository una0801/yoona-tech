import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

/* ── 강조 배너 ── 페이지에서 가장 중요한 한 줄 강조 */
export function KeyPoint({
  title = "핵심",
  children,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="my-6 flex gap-3 rounded-xl border border-l-4 border-pink-500 bg-gradient-to-r from-pink-50 to-transparent p-4 dark:from-pink-950/30">
      <span className="text-lg leading-none">💡</span>
      <div className="min-w-0">
        <div className="font-bold text-pink-600 dark:text-pink-300">{title}</div>
        <div className="mt-1 text-sm leading-relaxed [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

/* ── 큰 숫자 지표 타일 ── */
export function Stats({ children }: PropsWithChildren) {
  return <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>;
}

export function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border bg-stone-50/60 p-4 text-center dark:bg-stone-900/40">
      <div className="text-2xl font-extrabold tracking-tight text-pink-600 dark:text-pink-300">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

/* ── 세로 타임라인 ── 흐름/생명주기 (머메이드 대안) */
export function Timeline({ children }: PropsWithChildren) {
  return (
    <div className="my-6 ml-2 border-l-2 border-pink-200 pl-6 dark:border-pink-900/60">
      {children}
    </div>
  );
}

export function TimelineItem({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="relative pb-6 last:pb-0">
      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-pink-500 bg-background" />
      <div className="font-semibold tracking-tight">{title}</div>
      <div className="mt-1 text-sm leading-relaxed text-muted-foreground [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

/* ── 장단점 대비 ── */
export function ProsCons({ children }: PropsWithChildren) {
  return <div className="my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

function PCBox({
  tone,
  title,
  children,
}: PropsWithChildren<{ tone: "pro" | "con"; title: string }>) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 text-sm leading-relaxed [&_ul]:m-0 [&_ul]:list-none [&_ul]:space-y-1 [&_ul]:pl-0",
        tone === "pro"
          ? "border-green-300 bg-green-50/60 dark:border-green-900 dark:bg-green-950/20"
          : "border-red-300 bg-red-50/60 dark:border-red-900 dark:bg-red-950/20"
      )}
    >
      <div
        className={cn(
          "mb-2 font-bold",
          tone === "pro"
            ? "text-green-700 dark:text-green-300"
            : "text-red-700 dark:text-red-300"
        )}
      >
        {tone === "pro" ? "✅" : "❌"} {title}
      </div>
      {children}
    </div>
  );
}

export function Pros({
  title = "장점",
  children,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <PCBox tone="pro" title={title}>
      {children}
    </PCBox>
  );
}

export function Cons({
  title = "단점",
  children,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <PCBox tone="con" title={title}>
      {children}
    </PCBox>
  );
}
