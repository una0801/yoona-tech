"use client";

import { getDocsTocs } from "@/lib/markdown";
import clsx from "clsx";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Props = { data: Awaited<ReturnType<typeof getDocsTocs>> };

export default function TocObserver({ data }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveId(visibleEntry.target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20px 0px 0px 0px",
      threshold: 0.1,
    });

    const elements = data.map((item) =>
      document.getElementById(item.href.slice(1))
    );
    console.log("🔍 Expected IDs:", data.map((item) => item.href.slice(1))); // ✅ 예상되는 ID 목록
    console.log("🔍 Found Elements:", elements); 
    elements.forEach((el) => {
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        elements.forEach((el) => {
          if (el) {
            observer.current!.unobserve(el);
          }
        });
      }
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-2.5 text-sm dark:text-stone-300/85 text-stone-800 ml-0.5">
      {data.map(({ href, level, text }, index) => {
        return (
<Link
  key={href + text + level + index}
  href={href}
  scroll={false}
  onClick={(e) => {
    e.preventDefault();
    const targetId = href.slice(1);

    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {

        const offset = 80; // 네비게이션 바 높이 조절
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        
        // URL 변경 (히스토리 관리)
        history.pushState(null, "", href);
      } else {
        console.warn("TOC 이동 실패: ID 없음", targetId);
      }
    }, 200); // 지연시간 증가
  }}
  className={clsx({
    "pl-0": level == 2,
    "pl-4": level == 3,
    "pl-8 ": level == 4,
    "text-pink-400 font-semibold": activeId == href.slice(1),
  })}
>
  {text}
</Link>


        );
      })}
    </div>
  );
}
