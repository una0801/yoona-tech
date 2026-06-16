import { ArrowUpRight, BookOpen, Brain, Repeat } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getRandomPosts, getCategoryCounts, getAllPosts } from "@/lib/posts";
import { StatsBar } from "@/components/home/stats-bar";
import { CategoryCard } from "@/components/home/category-card";
import { tagColorClass, tagColorByIndex } from "@/lib/tag-color";
import { DueWidget } from "@/components/review/due-widget";

// 하루마다 재생성 → "오늘의 글" 랜덤 셋이 매일 바뀜
export const revalidate = 86400;

export default async function Home() {
  const [picks, categories, all] = await Promise.all([
    getRandomPosts(5),
    getCategoryCounts(),
    getAllPosts(),
  ]);
  const firstDocHref = categories.find((c) => c.count > 0)?.firstHref ?? "/backend";

  // 인기 태그 집계 (상위 10개)
  const tagCounts = new Map<string, number>();
  for (const p of all) for (const t of p.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t);

  return (
    <div className="una-hero">
      {/* 좌우 분할 — nav(h-16) 제외한 한 화면 */}
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-0">
        {/* ===== 왼쪽: 브랜드 ===== */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-br from-pink-300/45 via-fuchsia-300/35 to-violet-300/25 blur-2xl" />
            <Image
              src="/logo.png"
              alt="Unademy Logo"
              width={88}
              height={88}
              className="rounded-2xl border bg-white shadow-md ring-1 ring-pink-200/60 dark:ring-pink-900/40"
              priority
            />
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            Unademy
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Una&apos;s Tech Wiki — 읽고, 풀고, 복습하는 학습 노트
          </p>

          {/* 기능 칩 */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {[
              { Icon: BookOpen, label: "문서" },
              { Icon: Brain, label: "퀴즈" },
              { Icon: Repeat, label: "복습" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5 text-pink-500" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href={firstDocHref}
              className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pink-600"
            >
              <BookOpen className="h-4 w-4" />
              문서 보기
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              About
            </Link>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
            <StatsBar posts={all.length} categories={categories.length} />
            <DueWidget />
            <Link
              href="https://github.com/una0801/"
              target="_blank"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="underline underline-offset-4">GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 인기 태그 */}
          {topTags.length > 0 && (
            <div className="mt-9 w-full">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                인기 태그
              </h2>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {topTags.map((t, i) => (
                  <Link
                    key={t}
                    href={`/tags/${t}`}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-transform hover:scale-105 ${tagColorByIndex(i)}`}
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== 오른쪽: 카테고리 + 최근 글 ===== */}
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              카테고리
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.category} category={c.category} count={c.count} href={c.firstHref} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              오늘의 글
            </h2>
            <div className="flex flex-col gap-1.5">
              {picks.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="una-card-link flex items-center gap-3 px-4 py-3"
                >
                  <span className="w-16 shrink-0 text-[10px] font-bold uppercase tracking-wide text-pink-500">
                    {p.category}
                  </span>
                  <span className="flex-1 truncate font-medium">{p.title}</span>
                  <span className="hidden shrink-0 gap-1.5 sm:flex">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${tagColorClass(t)}`}
                      >
                        #{t}
                      </span>
                    ))}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
