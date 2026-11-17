"use client";

import { CommandIcon, FileIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useMemo, useState } from "react";
import Anchor from "./anchor";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export type SearchDoc = {
  title: string;
  description?: string;
  href: string;
  type: string;
};

// variant "hero": 홈 큰 검색창. 같은 화면에 상단바 검색이 있어서 ⌘K는 상단바만 받음
export default function Search({
  index = [],
  variant = "nav",
}: {
  index?: SearchDoc[];
  variant?: "nav" | "hero";
}) {
  const [searchedInput, setSearchedInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (variant === "hero") return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [variant]);

  // 실제 mdx 색인(title/description) 기반 검색 → 존재하는 페이지만, 404 없음
  const filteredResults = useMemo(() => {
    const q = searchedInput.trim().toLowerCase();
    if (!q) return [];
    return index.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        (doc.description?.toLowerCase().includes(q) ?? false)
    );
  }, [searchedInput, index]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setSearchedInput("");
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          {variant === "hero" ? (
            <button
              type="button"
              className="flex h-12 w-full items-center gap-3 rounded-xl border-[1.5px] border-primary/25 bg-background px-4 text-left text-[15px] text-muted-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SearchIcon className="h-[18px] w-[18px]" aria-hidden />
              <span className="flex-1 truncate">문서 검색 (예: 인덱스, Kafka, VPC)</span>
              <kbd className="hidden rounded-md border px-1.5 py-0.5 text-xs sm:inline">⌘K</kbd>
            </button>
          ) : (
          <div className="relative flex-1 max-w-md cursor-pointer">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 dark:text-stone-400" />
            <Input
              className="md:w-full rounded-md dark:bg-background/95 bg-background border h-9 pl-10 pr-0 sm:pr-7 text-sm shadow-sm overflow-ellipsis"
              placeholder="문서 검색"
              type="search"
            />
            <div className="sm:flex hidden absolute top-1/2 -translate-y-1/2 right-2 text-xs font-medium font-mono items-center gap-0.5 dark:bg-stone-900 bg-stone-200/65 p-1 rounded-sm">
              <CommandIcon className="w-3 h-3" />
              <span>k</span>
            </div>
          </div>
          )}
        </DialogTrigger>
        <DialogContent className="p-0 max-w-[650px] sm:top-[38%] top-[45%] !rounded-md">
          <DialogTitle className="sr-only">문서 검색</DialogTitle>
          <DialogHeader>
            <input
              value={searchedInput}
              onChange={(e) => setSearchedInput(e.target.value)}
              placeholder="검색어를 입력하세요"
              autoFocus
              className="h-14 px-6 bg-transparent border-b text-[14px] outline-none"
            />
          </DialogHeader>
          {filteredResults.length == 0 && searchedInput && (
            <p className="text-muted-foreground mx-auto mt-2 text-sm">
              No results found for{" "}
              <span className="text-primary">{`"${searchedInput}"`}</span>
            </p>
          )}
          <ScrollArea className="max-h-[400px] overflow-y-auto">
            <div className="flex flex-col items-start overflow-y-auto sm:px-2 px-1 pb-4">
              {filteredResults.map((item) => {
                const level = (item.href.split("/").slice(1).length -
                  1) as keyof typeof paddingMap;
                const paddingClass = paddingMap[level];

                return (
                  <DialogClose key={item.href} asChild>
                    <Anchor
                      className={cn(
                        "dark:hover:bg-stone-900 hover:bg-stone-100 w-full px-3 rounded-sm text-sm flex items-center gap-2.5",
                        paddingClass
                      )}
                      href={item.href}
                    >
                      <div
                        className={cn(
                          "flex items-center w-fit h-full py-3 gap-1.5 px-2",
                          level > 1 && "border-l pl-4"
                        )}
                      >
                        <FileIcon className="h-[1.1rem] w-[1.1rem] mr-1" />{" "}
                        {item.title}
                      </div>
                    </Anchor>
                  </DialogClose>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const paddingMap = {
  1: "pl-2",
  2: "pl-4",
  3: "pl-10",
  // Add more levels if needed
} as const;
