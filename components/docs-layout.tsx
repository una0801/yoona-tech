import { Leftbar } from "@/components/leftbar";

// 카테고리 공통 레이아웃: 문서 페이지면 왼쪽 섹션 사이드바, 목록 페이지면 본문 전체 폭
export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-start gap-8">
      <Leftbar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
