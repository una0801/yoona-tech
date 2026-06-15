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
      <h1 className="mb-2 text-4xl font-extrabold una-heading">About</h1>
      <p className="mb-10 text-lg una-accent">🎀 Una&apos;s Tech Wiki Blog 🎀</p>

      <section className="una-card mb-8 p-6">
        <h2 className="mb-2 font-bold una-heading">소개</h2>
        <p className="text-muted-foreground">
          공부하며 정리하는 개인 기술 위키. 백엔드·인프라 중심으로 배운 내용을 기록한다.
        </p>
      </section>

      <section className="una-card mb-8 p-6">
        <h2 className="mb-3 font-bold una-heading">다루는 주제</h2>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <span key={t} className="una-card rounded-full px-3 py-1 text-sm una-accent">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="una-card mb-8 p-6">
        <h2 className="mb-3 font-bold una-heading">기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {STACK.map((t) => (
            <span key={t} className="una-card rounded-full px-3 py-1 text-sm una-accent">
              {t}
            </span>
          ))}
        </div>
      </section>

      <Link
        href="https://github.com/una0801/"
        target="_blank"
        className="flex items-center gap-1 font-medium una-accent transition-opacity hover:opacity-70"
      >
        <MoveUpRightIcon className="h-4 w-4" />
        <span className="underline underline-offset-4">GitHub</span>
      </Link>
    </div>
  );
}
