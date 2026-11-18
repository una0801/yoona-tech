// 홈 학습 지도: 섹션 타일 크기·진하기 = 문서 수 (숫자를 글자로도 표시해 색에만 의존하지 않음)
import Link from "next/link";
import { categoryLabel, type NavTree } from "@/lib/nav";

// 문서 수 구간별 연한 버블검 단계 (진하게 꽉 찬 칸 없이, 글자는 pink-900로 대비 확보)
function tone(n: number): string {
  if (n >= 11) return "bg-pink-300 text-pink-950 dark:bg-pink-800 dark:text-pink-50";
  if (n >= 8) return "bg-pink-200 text-pink-900 dark:bg-pink-900 dark:text-pink-100";
  if (n >= 5) return "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-100";
  return "bg-pink-50 text-pink-900 dark:bg-pink-950/40 dark:text-pink-200";
}

const focusCls = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function StudyMap({ tree }: { tree: NavTree }) {
  const cats = Object.entries(tree).map(([cat, sections]) => ({
    cat,
    sections,
    total: sections.reduce((a, s) => a + s.count, 0),
  }));
  const max = Math.max(...cats.map((c) => c.total), 1);

  return (
    <>
      {/* 데스크톱: 카테고리 줄 + 섹션 타일 */}
      <div className="hidden flex-col gap-2 md:flex">
        {cats.map(({ cat, sections, total }) => (
          <div key={cat} className="grid grid-cols-[88px_1fr] gap-3">
            <div className="pt-2 text-sm font-bold">
              <Link href={`/${cat}`} className={`rounded-sm hover:text-primary ${focusCls}`}>
                {categoryLabel(cat)}
              </Link>
              <span className="block text-xs font-normal text-muted-foreground">{total}개</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={`/${cat}#${s.href.split("/").pop()}`}
                  title={`${s.title} ${s.count}개`}
                  style={{ flex: `${s.count} ${s.count} 0` }}
                  className={`flex min-h-[54px] min-w-[96px] flex-col justify-between rounded-lg border border-transparent px-2.5 py-2 transition-colors hover:border-[hsl(var(--brand))] ${tone(s.count)} ${focusCls}`}
                >
                  <span className="text-[12.5px] font-semibold leading-snug">{s.title}</span>
                  <span className="text-xs opacity-90">{s.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          문서 적음
          <i className="h-3 w-[18px] rounded-sm bg-pink-50" />
          <i className="h-3 w-[18px] rounded-sm bg-pink-100" />
          <i className="h-3 w-[18px] rounded-sm bg-pink-200" />
          <i className="h-3 w-[18px] rounded-sm bg-pink-300" />
          많음 · 타일 크기도 문서 수
        </p>
      </div>

      {/* 모바일: 카테고리 6줄 + 문서 수 막대 */}
      <ul className="md:hidden">
        {cats.map(({ cat, total }) => (
          <li key={cat} className="border-b last:border-0">
            <Link href={`/${cat}`} className={`flex min-h-[52px] items-center gap-3 ${focusCls}`}>
              <span className="w-24 font-semibold">{categoryLabel(cat)}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-pink-50 dark:bg-pink-950/40" aria-hidden>
                <span className="block h-full rounded-full bg-[hsl(var(--brand))]" style={{ width: `${(total / max) * 100}%` }} />
              </span>
              <span className="w-10 text-right text-sm text-muted-foreground">{total}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
