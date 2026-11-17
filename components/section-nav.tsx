"use client";

// 문서 페이지 사이드바: 현재 섹션 문서만 펼침 (접기 없음)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { categoryLabel, findDocLocation, type NavTree } from "@/lib/nav";
import { cn } from "@/lib/utils";

const focusCls = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SectionNav({ tree, isSheet = false }: { tree: NavTree; isSheet?: boolean }) {
  const pathname = usePathname().replace(/\/$/, "");
  const loc = findDocLocation(tree, pathname);
  if (!loc) return null;

  const sections = tree[loc.category];
  const sec = sections[loc.sectionIndex];
  const prev = sections[loc.sectionIndex - 1];
  const next = sections[loc.sectionIndex + 1];

  // 시트(모바일)에서는 링크 클릭 시 시트 닫기
  const Wrap = ({ children }: { children: React.ReactNode }) =>
    isSheet ? <SheetClose asChild>{children}</SheetClose> : <>{children}</>;

  const item = (href: string, title: string) => {
    const on = href === pathname;
    return (
      <Wrap key={href}>
        <Link
          href={href}
          aria-current={on ? "page" : undefined}
          className={cn(
            "flex min-h-10 items-center rounded-r-md border-l-2 px-3 text-sm md:min-h-0 md:py-1.5",
            focusCls,
            on
              ? "border-primary bg-primary/10 font-semibold text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {title}
        </Link>
      </Wrap>
    );
  };

  return (
    <nav aria-label={`${sec.title} 문서`} className="flex flex-col pb-8 pt-6">
      <Wrap>
        <Link
          href={`/${loc.category}`}
          className={cn("mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", focusCls)}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {categoryLabel(loc.category)} 전체
        </Link>
      </Wrap>

      <div className="una-heading mb-2 flex items-baseline justify-between border-b border-primary/40 pb-1.5 text-sm font-semibold">
        <span>{sec.title}</span>
        <span className="text-xs font-normal text-muted-foreground">{sec.count}</span>
      </div>

      {sec.introHref && item(sec.introHref, "개요")}
      {sec.groups.map((g, gi) => (
        <div key={g.label || gi}>
          {g.label && <div className="mb-1 mt-4 px-3 text-xs text-muted-foreground">{g.label}</div>}
          {g.introHref && item(g.introHref, `${g.label} 개요`)}
          {g.docs.map((d) => item(d.href, d.title))}
        </div>
      ))}

      {(prev || next) && (
        <div className="mt-6 flex flex-col gap-3 border-t pt-4 text-xs text-muted-foreground">
          {prev && (
            <div>
              이전 섹션
              <Wrap>
                <Link href={sectionFirst(prev)} className={cn("block text-sm text-foreground hover:underline", focusCls)}>
                  {prev.title}
                </Link>
              </Wrap>
            </div>
          )}
          {next && (
            <div>
              다음 섹션
              <Wrap>
                <Link href={sectionFirst(next)} className={cn("block text-sm text-foreground hover:underline", focusCls)}>
                  {next.title}
                </Link>
              </Wrap>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function sectionFirst(s: NavTree[string][number]): string {
  return s.introHref ?? s.groups[0].introHref ?? s.groups[0].docs[0].href;
}

// 데스크톱 왼쪽 사이드바 (목록 페이지에서는 자리 자체를 없애 본문이 전체 폭)
export function DocsSidebar({ tree }: { tree: NavTree }) {
  const pathname = usePathname().replace(/\/$/, "");
  if (!findDocLocation(tree, pathname)) return null;
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto pr-4 md:block">
      <SectionNav tree={tree} />
    </aside>
  );
}
