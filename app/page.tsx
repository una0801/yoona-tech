// 홈: 벤토 그리드 (소개·검색 / 블로그 / 오늘의 글 / 학습 지도 / 복습 / 퀴즈)
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getRandomPosts } from "@/lib/posts";
import { getAllBlogs } from "@/lib/markdown";
import { getNavTree } from "@/lib/nav-server";
import { categoryLabel } from "@/lib/nav";
import { getSearchIndex } from "@/lib/search-index";
import { formatDate2, stringToDate } from "@/lib/utils";
import Search from "@/components/search";
import { StudyMap } from "@/components/home/study-map";
import { ReviewCard } from "@/components/home/review-card";

// 하루마다 재생성 → "오늘의 글" 랜덤 셋이 매일 바뀜
export const revalidate = 86400;

const card = "rounded-2xl border bg-card p-5 sm:p-6";
const focusCls = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const h2Cls = "una-heading text-base font-semibold";

export default async function Home() {
  const [picks, blogs, searchIndex] = await Promise.all([getRandomPosts(4), getAllBlogs(), getSearchIndex()]);
  const tree = getNavTree();
  const docCount = Object.values(tree).reduce((a, secs) => a + secs.reduce((b, s) => b + s.count, 0), 0);
  const sectionCount = Object.values(tree).reduce((a, secs) => a + secs.length, 0);
  const latest = [...blogs].sort((a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime())[0];

  return (
    <div className="una-hero">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-0 py-8 sm:py-12 md:grid-cols-12">
        {/* 소개 + 검색 */}
        <section className={`${card} relative flex min-h-[220px] flex-col justify-between gap-6 overflow-hidden md:col-span-7`}>
          {/* 마스코트: 그림 아래 "unademy" 글자는 제목과 겹치지 않게 잘라냄 (위쪽 75%만 보임) */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-3 top-3 aspect-[100/75] w-20 select-none overflow-hidden md:-right-2 md:bottom-0 md:top-auto md:w-48"
          >
            <Image src="/logo.png" alt="" width={360} height={360} priority className="w-full" />
          </div>
          <h1 className="relative text-4xl font-bold tracking-tight text-[hsl(var(--brand))] sm:text-5xl">Unademy</h1>
          <div className="relative flex flex-col gap-3 md:mr-40">
            <Search index={searchIndex} variant="hero" />
            <p className="text-sm text-muted-foreground">
              문서 <b className="text-foreground">{docCount}</b> · 섹션 <b className="text-foreground">{sectionCount}</b> · 블로그{" "}
              <b className="text-foreground">{blogs.length}</b>
            </p>
          </div>
        </section>

        {/* 블로그 (최신 글) */}
        <section className={`${card} flex flex-col overflow-hidden !p-0 md:col-span-5 md:row-span-2`}>
          <h2 className={`${h2Cls} px-5 pt-5 sm:px-6`}>블로그</h2>
          {latest ? (
            <Link href={`/blog/${latest.slug}`} className={`group mt-3 flex flex-1 flex-col ${focusCls}`}>
              {latest.cover && (
                <div className="relative aspect-[2/1] w-full overflow-hidden border-y bg-muted">
                  <Image src={latest.cover} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-1.5 px-5 py-4 sm:px-6">
                <span className="text-xs text-muted-foreground">{formatDate2(latest.date)}</span>
                <h3 className="text-[17px] font-semibold leading-snug group-hover:text-primary">{latest.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{latest.description}</p>
              </div>
            </Link>
          ) : (
            <p className="px-6 py-4 text-sm text-muted-foreground">아직 글이 없어요</p>
          )}
          <Link href="/blog" className={`mx-5 mb-5 inline-flex items-center gap-1 self-start rounded-sm text-sm text-primary sm:mx-6 ${focusCls}`}>
            블로그 전체 보기 <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>

        {/* 오늘의 글 */}
        <section className={`${card} md:col-span-7`}>
          <h2 className={h2Cls}>오늘의 글</h2>
          <ul className="mt-2">
            {picks.map((p) => (
              <li key={p.href} className="border-b last:border-0">
                <Link href={p.href} className={`group flex min-h-11 items-center gap-3 rounded-sm py-1.5 ${focusCls}`}>
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">{categoryLabel(p.category)}</span>
                  <span className="flex-1 truncate font-medium group-hover:text-primary">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 학습 지도 */}
        <section className={`${card} md:col-span-12`}>
          <h2 className={`${h2Cls} mb-4`}>
            학습 지도 <span className="ml-1 text-sm font-normal text-muted-foreground">섹션을 누르면 해당 목록으로</span>
          </h2>
          <StudyMap tree={tree} />
        </section>

        {/* 복습 */}
        <section className={`${card} border-pink-200 bg-pink-50/60 md:col-span-7 dark:border-pink-900 dark:bg-pink-950/20`} aria-label="복습">
          <ReviewCard />
        </section>

        {/* 퀴즈 */}
        <section className={`${card} flex flex-col justify-center gap-1 md:col-span-5`}>
          <h2 className="font-semibold">퀴즈</h2>
          <p className="text-sm text-muted-foreground">카테고리·섹션 골라서 10~30문제</p>
          <Link href="/quiz" className={`mt-1 inline-flex items-center gap-1 self-start rounded-sm text-sm font-semibold text-primary ${focusCls}`}>
            퀴즈 풀기 <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}
