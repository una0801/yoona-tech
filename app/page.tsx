import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 relative bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-200 overflow-hidden">
      {/* 동글뱅이 배경 효과 */}
      <div className="absolute top-[-60px] left-[-60px] w-60 h-60 bg-pink-200 opacity-30 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-fuchsia-200 opacity-30 rounded-full blur-3xl animate-float z-0" />
      {/* 여러 하트 배경 (더 추가 가능) */}
      <svg className="absolute left-20 top-32 w-8 h-8 text-pink-300 opacity-70 animate-float z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z"/>
      </svg>
      <svg className="absolute right-24 top-40 w-7 h-7 text-fuchsia-200 opacity-60 animate-float z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z"/>
      </svg>
      <svg className="absolute left-36 bottom-40 w-6 h-6 text-rose-300 opacity-60 animate-float z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z"/>
      </svg>
      <svg className="absolute left-1/4 top-1/5 w-6 h-6 text-pink-200 opacity-60 animate-float z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z"/>
      </svg>
      <svg className="absolute right-32 top-1/3 w-8 h-8 text-fuchsia-100 opacity-50 animate-float z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z"/>
      </svg>
      <svg className="absolute left-1/6 bottom-24 w-5 h-5 text-pink-200 opacity-50 animate-float z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z"/>
      </svg>
      <svg className="absolute right-10 bottom-36 w-7 h-7 text-rose-100 opacity-60 animate-float z-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.8-8.5-7.3C1.4 11.3 2.6 8.3 5.1 7.1c2-1 4.3-.3 5.6 1.3 1.4-1.6 3.6-2.3 5.6-1.3 2.5 1.2 3.7 4.2 1.6 6.6C18.7 16.2 12 21 12 21z"/>
      </svg>
      {/* 로고 뒤 네온 glow + pulse 원 */}
      <div className="absolute top-[127px] sm:top-[155px] w-[110px] h-[110px] rounded-full bg-pink-200 blur-2xl opacity-50 animate-pulse z-10" />
      {/* 로고 */}
      <Image
        src="/logo.png"
        alt="Unademy Logo"
        width={98}
        height={98}
        className="rounded-full shadow-lg border-4 border-pink-200 bg-white mb-8 animate-fade-in z-20"
        priority
      />
      {/* 타이틀 */}
      <h1 className="font-extrabold text-5xl sm:text-7xl bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 bg-clip-text text-transparent tracking-tight mb-4 animate-fade-in z-20 relative drop-shadow-[0_2px_10px_#fff]">
  Unademy
</h1>

      {/* 서브타이틀 */}
      <div className="flex flex-row items-center gap-2 mb-14 animate-fade-in z-20">
        <div className="h-1 w-8 rounded-full bg-pink-200" />
        <span className="text-lg sm:text-xl text-pink-500 font-medium tracking-wide">
        🎀 Una&apos;s Tech Wiki Blog 🎀
        </span>
        <div className="h-1 w-8 rounded-full bg-pink-200" />
      </div>
      {/* CTA 버튼 */}
      <div className="flex flex-row gap-4 mb-14 z-20">
        <Link
          href="/cs/dsa/structures/basic"
          className="px-7 py-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 shadow-lg text-white font-extrabold text-lg hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(236,72,153,0.32)] hover:animate-jump-on-hover active:scale-100 focus:ring-2 focus:ring-fuchsia-200 transition-all duration-200 flex items-center gap-2"
        >
          <span>📚</span>
        </Link>
        <Link
          href="/about"
          className="px-7 py-3 rounded-full bg-white border-2 border-pink-300 text-pink-600 font-extrabold text-lg shadow-lg hover:bg-pink-50 hover:scale-110 hover:animate-jump-on-hover transition-all duration-200 focus:ring-2 focus:ring-pink-200"
        >
          About
        </Link>
      </div>
      {/* 깔끔한 깃허브 링크 */}
      <Link
        href="https://github.com/nisabmohd/Aria-Docs"
        target="_blank"
        className="text-pink-400 hover:text-fuchsia-500 flex items-center gap-1 text-base font-medium transition-all duration-150 z-20"
      >
        <MoveUpRightIcon className="w-4 h-4" />
        <span className="underline underline-offset-4">GitHub</span>
      </Link>
    </div>
  );
}
