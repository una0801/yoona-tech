import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { EachRoute, ROUTES } from "./routes-config";
import { getRoutes,getPageRoutes, type EachRoute} from "@/lib/routes-config";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function helperSearch(
  query: string,
  node: EachRoute,
  prefix: string,
  currenLevel: number,
  maxLevel?: number
) {
  const res: EachRoute[] = [];
  let parentHas = false;

  const nextLink = `${prefix}${node.href}`;
  if (!node.noLink && node.title.toLowerCase().includes(query.toLowerCase())) {
    res.push({ ...node, items: undefined, href: nextLink });
    parentHas = true;
  }
  const goNext = maxLevel ? currenLevel < maxLevel : true;
  if (goNext)
    node.items?.forEach((item) => {
      const innerRes = helperSearch(
        query,
        item,
        nextLink,
        currenLevel + 1,
        maxLevel
      );
      if (!!innerRes.length && !parentHas && !node.noLink) {
        res.push({ ...node, items: undefined, href: nextLink });
        parentHas = true;
      }
      res.push(...innerRes);
    });
  return res;
}

// ✅ `type`을 매개변수로 받아서 `/cs/`와 `/backend/`를 자동 구분
export function advanceSearch(query: string, type: string) {
  const selectedRoutes: EachRoute[] = getPageRoutes(type) ?? []; // ✅ `undefined` 방지

  return selectedRoutes
    .map((node: EachRoute) => // ✅ node의 타입을 명확히 지정
      helperSearch(query, node, "", 1, query.length === 0 ? 2 : undefined)
    )
    .flat();
}

// ✅ Search.tsx에서 `type`을 결정해 넘기도록 설정해야 함
// ✅ pathname.startsWith("/backend") ? "backend" : "cs" 방식으로 자동 감지

// 📅 Thursday, May 23, 2024
export function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

// 📅 May 23, 2024
export function formatDate2(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function stringToDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}