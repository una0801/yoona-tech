import { EachRoute } from "@/lib/routes-config";
import Anchor from "./anchor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
}: EachRoute & { level: number; isSheet: boolean }) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 현재 경로와 정확히 일치하는 경우만 펼침
    if (path === href) {
      setIsOpen(true);
    } else {
      // 현재 경로가 해당 메뉴의 직접적인 하위 경로인지 확인
      if (href !== "/" && path.startsWith(href + "/")) {
        const remainingPath = path.slice(href.length + 1);
        // 하위 경로가 한 단계만 있는지 확인 (예: /overview/roadmap -> roadmap)
        if (!remainingPath.includes("/")) {
          setIsOpen(true);
        }
      }
    }
  }, [href, path]);

  const Comp = (
    <Anchor
      activeClassName="text-primary dark:font-medium font-semibold"
      href={href}
    >
      {title}
    </Anchor>
  );

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4
      className={cn(
        "sm:text-sm",
        level === 0
          ? "font-bold text-primary text-[15px] tracking-tight" // 최상위 섹션: 분홍 굵게 + 살짝 크게
          : "font-semibold text-stone-700 dark:text-stone-300" // 하위 그룹: 중성색 세미볼드
      )}
    >
      {title}
    </h4>
  );

  if (!items) {
    return <div className="flex flex-col">{titleOrLink}</div>;
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full pr-5">
          <div className="flex items-center justify-between cursor-pointer w-full">
            {titleOrLink}
            <span>
              {!isOpen ? (
                <ChevronRight className="h-[0.9rem] w-[0.9rem]" />
              ) : (
                <ChevronDown className="h-[0.9rem] w-[0.9rem]" />
              )}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className={cn(
              "flex flex-col items-start sm:text-sm dark:text-stone-300/85 text-stone-800 ml-0.5 mt-2.5 gap-3",
              level > 0 && "pl-4 border-l ml-1.5"
            )}
          >
            {items?.map((innerLink) => {
              const modifiedItems = {
                ...innerLink,
                href: `${href + innerLink.href}`,
                level: level + 1,
                isSheet,
              };
              return <SubLink key={modifiedItems.href} {...modifiedItems} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
