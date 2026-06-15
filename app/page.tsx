import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getRandomPosts, getCategoryCounts, getAllPosts } from "@/lib/posts";
import { StatsBar } from "@/components/home/stats-bar";
import { CategoryCard } from "@/components/home/category-card";
import { tagColorClass } from "@/lib/tag-color";

// 하루마다 재생성 → "오늘의 글" 랜덤 셋이 매일 바뀜
export const revalidate = 86400;

const HEARTS = [
  "absolute left-20 top-32 w-8 h-8 text-pink-300 opacity-70 animate-float z-0",
  "absolute right-24 top-40 w-7 h-7 text-fuchsia-200 opacity-60 animate-float z-0",
  "absolute left-36 bottom-40 w-6 h-6 text-rose-300 opacity-60 animate-float z-0",
  "absolute left-1/4 top-1/5 w-6 h-6 text-pink-200 opacity-60 animate-float z-0",
  "absolute right-32 top-1/3 w-8 h-8 text-fuchsia-100 opacity-50 animate-float z-0",
  "absolute left-1/6 bottom-24 w-5 h-5 text-pink-200 opacity-50 animate-float z-0",
  "absolute right-10 bottom-36 w-7 h-7 text-rose-100 opacity-60 animate-float z-0",
];

export default async function Home() {
  const [picks, categories, all] = await Promise.all([
    getRandomPosts(5),
    getCategoryCounts(),
    getAllPosts(),
  ]);
  const firstDocHref = categories.find((c) => c.count > 0)?.firstHref ?? "/backend";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-200">
      {/* 동글뱅이 배경 효과 */}
      <div className="absolute top-[-60px] left-[-60px] w-60 h-60 bg-pink-200 opacity-30 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-fuchsia-200 opacity-30 rounded-full blur-3xl animate-float z-0" />
      {/* 하트 배경 */}
      {HEARTS.map((cls, i) => (
        <svg key={i} className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z" />
        </svg>
      ))}

      {/* 좌우 분할 (대시보드형) — nav(h-16) 제외한 한 화면 */}
      <div className="relative z-20 mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2 lg:gap-12 lg:py-0">
        {/* ===== 왼쪽: 브랜드 ===== */}
        <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200 opacity-50 blur-2xl animate-pulse" />
            <Image
              src="/logo.png"
              alt="Unademy Logo"
              width={92}
              height={92}
              className="relative rounded-full border-4 border-pink-200 bg-white shadow-lg animate-fade-in"
              priority
            />
          </div>
          <h1 className="animate-fade-in bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_10px_#fff] sm:text-6xl">
            Unademy
          </h1>
          <div className="flex animate-fade-in flex-row items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-pink-200" />
            <span className="text-lg font-medium tracking-wide text-pink-500">
              🎀 Una&apos;s Tech Wiki Blog 🎀
            </span>
            <div className="h-1 w-8 rounded-full bg-pink-200" />
          </div>
          <div className="mt-2 flex flex-row gap-4">
            <Link
              href={firstDocHref}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-7 py-3 text-lg font-extrabold text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(236,72,153,0.32)]"
            >
              <span>📚</span>
              <span>문서 보기</span>
            </Link>
            <Link
              href="/about"
              className="rounded-full border-2 border-pink-300 bg-white px-7 py-3 text-lg font-extrabold text-pink-600 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-pink-50"
            >
              About
            </Link>
          </div>
          <StatsBar posts={all.length} categories={categories.length} />
          <Link
            href="https://github.com/una0801/"
            target="_blank"
            className="flex items-center gap-1 text-base font-medium text-pink-400 transition-colors hover:text-fuchsia-500"
          >
            <MoveUpRightIcon className="h-4 w-4" />
            <span className="underline underline-offset-4">GitHub</span>
          </Link>
        </div>

        {/* ===== 오른쪽: 카테고리 + 최근 글 ===== */}
        <div className="flex flex-col gap-7">
          <div>
            <h2 className="mb-4 text-xl font-extrabold text-pink-600">카테고리</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.category} category={c.category} count={c.count} href={c.firstHref} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-extrabold text-pink-600">오늘의 글</h2>
            <div className="flex flex-col gap-2">
              {picks.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-3 rounded-xl border-2 border-pink-100 bg-white/70 px-4 py-2.5 shadow-sm transition-all hover:border-pink-300 hover:shadow-md"
                >
                  <span className="shrink-0 text-[10px] font-semibold uppercase text-fuchsia-400">
                    {p.category}
                  </span>
                  <span className="flex-1 truncate font-semibold text-pink-700">{p.title}</span>
                  <span className="hidden shrink-0 gap-1.5 sm:flex">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ring-1 ring-white/60 ${tagColorClass(t)}`}
                      >
                        #{t}
                      </span>
                    ))}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
