"use client";

// import { ROUTES } from "@/lib/routes-config";

import { getRoutes, type EachRoute,ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";


export default function DocsMenu({ isSheet = false }) {
  const pathname = usePathname();

  const availableTypes = Object.keys(ROUTES) as Array<keyof typeof ROUTES>;
  const type = (availableTypes.find((t) => pathname.startsWith(`/${t}`)) ?? "cs") as keyof typeof ROUTES;

  const routes: EachRoute[] = (getRoutes(type) as EachRoute[]) ?? [];
  console.log("🔍 DocsMenu routes:", routes);

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
      {routes.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/${type}${item.href}`, // ✅ 동적으로 `/cs/`, `/backend/`, `/frontend/` 등 자동 적용
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}

// export default function DocsMenu({ isSheet = false }) {
//   const pathname = usePathname();

//   const availableTypes = Object.keys(ROUTES) as Array<keyof typeof ROUTES>;
//   const type = (availableTypes.find((t) => pathname.startsWith(`/${t}`)) ?? "cs") as keyof typeof ROUTES;

//   const routes: EachRoute[] = (getRoutes(type) as EachRoute[]) ?? [];

//   return (
//     <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
//       {routes.length > 0 ? ( // ✅ routes가 비어있지 않을 때만 렌더링
//         routes.map((item, index) => (
//           <SubLink key={item.title + index} {...item} />
//         ))
//       ) : (
//         <p className="text-gray-500">메뉴가 없습니다.</p> // ✅ 메뉴가 없을 경우 대체 UI 추가 (선택 사항)
//       )}
//     </div>
//   );
// }

