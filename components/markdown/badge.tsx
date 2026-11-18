// 본문 박스 왼쪽 동그라미 배지: 색이 꽉 찬 원 + 흰 기호 (종류는 색과 기호 둘 다로 구분)
import { cn } from "@/lib/utils";

export type BadgeKind = "key" | "note" | "warning" | "danger" | "success";

const GLYPH: Record<BadgeKind, JSX.Element> = {
  key: (
    <>
      <path d="M12 5.5v8" />
      <path d="M12 18.5h.01" />
    </>
  ),
  note: (
    <>
      <path d="M12 18v-7" />
      <path d="M12 6.5h.01" />
    </>
  ),
  warning: (
    <>
      <path d="M12 5.5v8" />
      <path d="M12 18.5h.01" />
    </>
  ),
  danger: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  success: <path d="M20 6 9 17l-5-5" />,
};

const BG: Record<BadgeKind, string> = {
  key: "bg-[hsl(var(--brand))]",
  note: "bg-stone-400 dark:bg-stone-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  success: "bg-green-600",
};

export function BoxBadge({ kind, className }: { kind: BadgeKind; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full", BG[kind], className)}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px]"
        fill="none"
        stroke="#fff"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GLYPH[kind]}
      </svg>
    </span>
  );
}

// 본문 박스 공통 표면: 흰(다크는 카드) 바탕 + 회색 테두리
export const boxCls = "rounded-xl border bg-card";
