import { PropsWithChildren } from "react";
import { BoxBadge, boxCls } from "./badge";

/* ── 강조 배너 ── 페이지에서 가장 중요한 한 줄 강조 */
export function KeyPoint({
  title = "핵심",
  children,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <div className={`${boxCls} my-6 flex gap-3 p-4`}>
      <BoxBadge kind="key" />
      <div className="min-w-0">
        <div className="font-bold">{title}</div>
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
    <div className={`${boxCls} p-4 text-center`}>
      <div className="text-2xl font-extrabold tracking-tight text-primary">
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
    <div className="my-6 ml-2 border-l-2 border-border pl-6">
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
      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-[hsl(var(--brand))] bg-background" />
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
      className={`${boxCls} p-4 text-sm leading-relaxed [&_ul]:m-0 [&_ul]:list-none [&_ul]:space-y-1 [&_ul]:pl-0`}
    >
      <div className="mb-2 flex items-center gap-2 font-bold">
        <BoxBadge kind={tone === "pro" ? "success" : "danger"} />
        {title}
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
