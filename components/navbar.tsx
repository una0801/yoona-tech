import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
// import { page_routes } from "@/lib/routes-config";
import { getPageRoutes } from "@/lib/routes-config";
import { getSearchIndex } from "@/lib/search-index";
import { SheetClose } from "@/components/ui/sheet";


const csRoutes = getPageRoutes("cs");
const backendRoutes = getPageRoutes("backend");
const codeRoutes = getPageRoutes("code");
const devopsRoutes = getPageRoutes("devops");
const aiRoutes = getPageRoutes("ai");

type NavLink = {
  title: string;
  href: string;
  items?: { title: string; href: string }[];
};

export const NAVLINKS: NavLink[] = [
  {
    title: "CS",
    href: csRoutes.length > 0 ? `/cs${csRoutes[0].href}` : "/cs",  // ✅ 배열이 비어있는 경우 대비
  },
  {
    title: "Backend",
    href: backendRoutes.length > 0 ? `/backend${backendRoutes[0].href}` : "/backend",
  },
  {
    title: "DevOps",
    href: devopsRoutes.length > 0 ? `/devops${devopsRoutes[0].href}` : "/devops",
    },  //
  {
    title: "AI",
    href: aiRoutes.length > 0 ? `/ai${aiRoutes[0].href}` : "/ai",
  },
  {
    title: "Code",
    href: codeRoutes.length > 0 ? `/code${codeRoutes[0].href}` : "/code",  // ✅ Code에 대한 처리 수정 (현재 `page_routes`에 없는 경우 대비)
  },
  {
    title: "Quiz",
    href: "/quiz",
    items: [
      { title: "Quiz", href: "/quiz" },
      { title: "Review", href: "/review/dashboard" },
    ],
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

export async function Navbar() {
  const searchIndex = await getSearchIndex();
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search index={searchIndex} />
            <div className="flex ml-2.5 sm:ml-0">
              <Link
                href="https://github.com/una0801/yoona-tech"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="#"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <TwitterIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        src="/logo.png" // 또는 .svg
        alt="Unademy Logo"
        width={50}
        height={50}
        priority
      />
      <span className="text-lg font-bold font-code text-primary">Unademy</span>
    </Link>
  );
}
export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        // 자식 메뉴가 있으면 드롭다운(데스크탑) / 들여쓰기(모바일 시트)
        if (item.items && item.items.length > 0) {
          if (isSheet) {
            return (
              <div key={item.title} className="flex flex-col gap-2">
                <span className="font-semibold dark:text-stone-300/85 text-stone-800">
                  {item.title}
                </span>
                <div className="flex flex-col gap-2 pl-3">
                  {item.items.map((sub) => (
                    <SheetClose key={sub.href} asChild>
                      <Anchor
                        activeClassName="!text-primary dark:font-medium font-semibold"
                        absolute
                        className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800"
                        href={sub.href}
                      >
                        {sub.title}
                      </Anchor>
                    </SheetClose>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={item.title} className="relative group">
              <Anchor
                activeClassName="!text-primary dark:font-medium font-semibold"
                absolute
                className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800"
                href={item.href}
              >
                {item.title}
                <ChevronDown className="h-3.5 w-3.5" />
              </Anchor>
              <div className="invisible absolute left-0 top-full z-50 flex min-w-[140px] flex-col rounded-md border bg-background p-1 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                {item.items.map((sub) => (
                  <Anchor
                    key={sub.href}
                    activeClassName="!text-primary font-semibold"
                    absolute
                    className="rounded px-3 py-2 text-sm hover:bg-stone-100 dark:hover:bg-stone-800"
                    href={sub.href}
                  >
                    {sub.title}
                  </Anchor>
                ))}
              </div>
            </div>
          );
        }

        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary dark:font-medium font-semibold"
            absolute
            className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800"
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
