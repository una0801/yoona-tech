import Link from "next/link";
import { Binary, Server, Container, Cloud, Sparkles, Code2, FileText, type LucideIcon } from "lucide-react";
import { categoryLabel } from "@/lib/nav";

// 카테고리는 아이콘으로 구분, 색은 브랜드 핑크 한 가지
const ICONS: Record<string, LucideIcon> = {
  cs: Binary,
  backend: Server,
  kubernetes: Container,
  aws: Cloud,
  ai: Sparkles,
  code: Code2,
};

export function CategoryCard({ category, count, href }: { category: string; count: number; href: string }) {
  const Icon = ICONS[category] ?? FileText;
  return (
    <Link href={href} className="una-card-link group flex flex-col gap-3 p-5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold">{categoryLabel(category)}</span>
        <span className="text-sm text-muted-foreground">문서 {count}개</span>
      </div>
    </Link>
  );
}
