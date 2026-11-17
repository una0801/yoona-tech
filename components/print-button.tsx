"use client";

import { Printer } from "lucide-react";

// 데스크톱 전용: 모바일에선 본문을 가려서 숨김
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="fixed bottom-5 right-5 hidden items-center gap-1.5 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:inline-flex print:hidden"
    >
      <Printer className="h-4 w-4" aria-hidden />
      인쇄
    </button>
  );
}
