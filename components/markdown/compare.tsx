import { cn } from "@/lib/utils";
import { boxCls } from "./badge";
import { PropsWithChildren } from "react";

// 두 개념을 나란히 비교 (예: Multi-AZ vs Read Replica)
export function Compare({ children }: PropsWithChildren) {
  return <div className="my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

type Color = "pink" | "sky" | "green" | "amber" | "stone";

// color prop은 기존 문서 호환용 (모든 색이 같은 흰 박스)

export function CompareCol({
  title,
  subtitle,
  children,
}: PropsWithChildren<{ title: string; subtitle?: string; color?: Color }>) {
  return (
    <div className={cn(boxCls, "p-4")}>
      <div className="mb-2 border-b-2 border-[hsl(var(--brand))] pb-2">
        <div className="font-bold tracking-tight">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      <div className="space-y-1.5 text-sm leading-relaxed [&_code]:rounded [&_code]:bg-stone-200/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] dark:[&_code]:bg-stone-800">
        {children}
      </div>
    </div>
  );
}
