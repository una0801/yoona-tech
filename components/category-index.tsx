// 카테고리 전체 목록: 실제 문서 전부를 한 화면에 (섹션당 ≤12, 섹션 ≤12 규칙으로 크기 상한)
import Link from "next/link";
import { getNavTree } from "@/lib/nav-server";
import { categoryLabel } from "@/lib/nav";

const linkCls =
  "rounded-sm hover:text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function CategoryIndex({ category }: { category: string }) {
  const sections = getNavTree()[category] ?? [];
  const total = sections.reduce((a, s) => a + s.count, 0);

  return (
    <div className="py-10">
      <h1 className="una-heading text-2xl font-semibold">{categoryLabel(category)}</h1>
      <p className="mt-1 text-sm text-muted-foreground">문서 {total}개</p>

      <div className="mt-8 md:columns-[200px] md:gap-8">
        {sections.map((s) => (
          <section key={s.href} id={s.href.split("/").pop()} className="mb-7 scroll-mt-20 break-inside-avoid">
            <h2 className="una-heading flex items-baseline justify-between border-b border-primary/40 pb-1.5 text-sm font-semibold">
              {s.introHref ? (
                <Link href={s.introHref} className={linkCls}>
                  {s.title}
                </Link>
              ) : (
                s.title
              )}
              <span className="text-xs font-normal text-muted-foreground">{s.count}</span>
            </h2>
            {s.groups.map((g, gi) => (
              <div key={g.label || gi}>
                {g.label && (
                  <div className="mt-3 text-xs text-muted-foreground">
                    {g.introHref ? (
                      <Link href={g.introHref} className={linkCls}>
                        {g.label}
                      </Link>
                    ) : (
                      g.label
                    )}
                  </div>
                )}
                <ul>
                  {g.docs.map((d) => (
                    <li key={d.href}>
                      <Link
                        href={d.href}
                        className={`${linkCls} flex min-h-10 items-center text-[15px] md:block md:min-h-0 md:py-[3px] md:text-sm`}
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
