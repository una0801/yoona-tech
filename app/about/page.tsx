import Link from "next/link";
import { MoveUpRightIcon } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Una's Tech Wiki Blog 소개",
};

const STACK = ["Python", "FastAPI", "Ruby on Rails", "AWS Aurora MySQL", "Pulumi"];
const TOPICS = ["AI", "Backend", "Code", "CS", "DevOps"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="mb-2 text-4xl font-extrabold text-pink-600">About</h1>
      <p className="mb-10 text-lg text-pink-400">🎀 Una&apos;s Tech Wiki Blog 🎀</p>

      <section className="mb-8 rounded-2xl border-2 border-pink-100 bg-white/70 p-6">
        <h2 className="mb-2 font-bold text-pink-600">소개</h2>
        <p className="text-muted-foreground">
          공부하며 정리하는 개인 기술 위키. 백엔드·인프라 중심으로 배운 내용을 기록한다.
        </p>
      </section>

      <section className="mb-8 rounded-2xl border-2 border-pink-100 bg-white/70 p-6">
        <h2 className="mb-3 font-bold text-pink-600">다루는 주제</h2>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <span key={t} className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-600">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-2xl border-2 border-pink-100 bg-white/70 p-6">
        <h2 className="mb-3 font-bold text-pink-600">기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {STACK.map((t) => (
            <span key={t} className="rounded-full bg-fuchsia-100 px-3 py-1 text-sm text-fuchsia-600">
              {t}
            </span>
          ))}
        </div>
      </section>

      <Link
        href="https://github.com/una0801/yoona-tech"
        target="_blank"
        className="flex items-center gap-1 font-medium text-pink-500 hover:text-fuchsia-500"
      >
        <MoveUpRightIcon className="h-4 w-4" />
        <span className="underline underline-offset-4">GitHub</span>
      </Link>
    </div>
  );
}
