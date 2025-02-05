import { buttonVariants } from "@/components/ui/button";
import { MoveUpRightIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16 min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      {/* 블로그 로고 / 제목 */}
      <h1 className="text-5xl font-extrabold sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 drop-shadow-md">
        Yoonicorn 🦄
      </h1>
      <p className="text-lg sm:text-xl text-rose-500 mt-4">
        몽환적인 코드의 세계로, 유니콘처럼 ✨
      </p>

      {/* CTA 버튼들 */}
      <div className="flex flex-row gap-5 mt-8">
        <Link
          href="/blog"
          className={buttonVariants({
            className: "px-6 py-3 text-lg rounded-full shadow-lg bg-pink-500 hover:bg-pink-600 text-white",
          })}
        >
          블로그 시작하기 🚀
        </Link>
        <Link
          href="/about"
          className={buttonVariants({
            className: "px-6 py-3 text-lg rounded-full shadow-lg bg-white border border-pink-400 text-pink-600 hover:bg-pink-100",
          })}
        >
          About Me 💖
        </Link>
      </div>

      {/* 귀여운 유니콘 감성 한 줄 */}
      <div className="mt-12 px-6 py-4 rounded-lg bg-white/80 backdrop-blur-md shadow-lg border border-rose-200 max-w-lg">
        <SparklesIcon className="w-5 h-5 text-pink-400 inline-block mr-2" />
        <span className="text-md text-rose-600 font-semibold">
        </span>
      </div>

      {/* 깜찍한 GitHub 링크 */}
      <Link
        href="https://github.com/nisabmohd/Aria-Docs"
        target="_blank"
        className="mt-6 text-rose-500 hover:text-rose-600 flex items-center gap-1 text-sm sm:text-base"
      >
        Follow me on GitHub <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
    </div>
  );
}
