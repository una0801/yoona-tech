import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { BoxBadge, boxCls, type BadgeKind } from "./badge";

type NoteProps = PropsWithChildren & {
  title?: string;
  type?: "note" | "pink" | "info" | "tip" | "danger" | "warning" | "success";
};

// 흰 박스 + 왼쪽 동그라미 배지. 일반 메모(note·pink·info·tip)는 핵심 박스와 같은 핑크 !로 통일
const KIND: Record<NonNullable<NoteProps["type"]>, BadgeKind> = {
  note: "key",
  pink: "key",
  info: "key",
  tip: "key",
  warning: "warning",
  danger: "danger",
  success: "success",
};

export default function Note({ children, title = "Note", type = "note" }: NoteProps) {
  return (
    <div className={cn(boxCls, "mb-7 mt-5 flex gap-3 px-4 pb-0.5 pt-3.5 text-sm")}>
      <BoxBadge kind={KIND[type] ?? "key"} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <p className="!mb-0 !mt-0 font-bold">{title}</p>
        {children}
      </div>
    </div>
  );
}
