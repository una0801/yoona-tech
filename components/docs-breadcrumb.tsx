// 문서 위치: 카테고리 / 섹션 (한글 섹션 이름)
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getNavTree } from "@/lib/nav-server";
import { categoryLabel, findDocLocation } from "@/lib/nav";

export default function DocsBreadcrumb({ href }: { href: string }) {
  const tree = getNavTree();
  const loc = findDocLocation(tree, href);
  if (!loc) return null;
  const sec = tree[loc.category][loc.sectionIndex];
  return (
    <nav aria-label="문서 위치" className="flex items-center gap-1 pb-5 text-sm text-muted-foreground">
      <Link
        href={`/${loc.category}`}
        className="-my-1 rounded-sm py-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {categoryLabel(loc.category)}
      </Link>
      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
      <span>{sec.title}</span>
    </nav>
  );
}
