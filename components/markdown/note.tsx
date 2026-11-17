import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from "lucide-react";

type NoteProps = PropsWithChildren & {
  title?: string;
  type?: "note" | "danger" | "warning" | "success" | "pink";
};

// 모노톤 박스 + 왼쪽 선. 경고·위험·성공은 색만이 아니라 아이콘으로도 구분
const STYLE = {
  note: { line: "border-l-foreground/30", Icon: Info, icon: "text-muted-foreground" },
  pink: { line: "border-l-foreground/30", Icon: Info, icon: "text-muted-foreground" },
  danger: { line: "border-l-red-500", Icon: OctagonAlert, icon: "text-red-600 dark:text-red-400" },
  warning: { line: "border-l-amber-500", Icon: AlertTriangle, icon: "text-amber-600 dark:text-amber-400" },
  success: { line: "border-l-green-600", Icon: CheckCircle2, icon: "text-green-700 dark:text-green-400" },
};

export default function Note({ children, title = "Note", type = "note" }: NoteProps) {
  const { line, Icon, icon } = STYLE[type] ?? STYLE.note;
  return (
    <div className={cn("mb-7 mt-5 rounded-md border border-l-4 bg-muted/40 px-5 pb-0.5 text-sm", line)}>
      <p className="-mb-2.5 flex items-center gap-1.5 font-bold">
        <Icon className={cn("h-4 w-4", icon)} aria-hidden />
        {title}
      </p>
      {children}
    </div>
  );
}
