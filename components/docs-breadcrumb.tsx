import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { ROUTES } from "../lib/routes-config";

const availableTypes = Object.keys(ROUTES) as (keyof typeof ROUTES)[];

  export default function DocsBreadcrumb({ paths }: { paths: string[] }) {
  if (!paths.length) return null;
  const slugPath = paths.join("/");

  let detectedType: keyof typeof ROUTES | undefined = availableTypes.find((t) =>
    ROUTES[t].some((route) => slugPath.startsWith(route.href.replace(/^\//, "")))
  );

  detectedType = detectedType ?? "cs"; // ✅ 기본값 "cs" 설정

  return (
    <div className="pb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>{toTitleCase(detectedType)}</BreadcrumbLink> 
          </BreadcrumbItem>
          {paths.slice(1).map((path, index) => ( // ✅ 첫 번째 요소 제외하고 렌더링
            <Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index < paths.length - 2 ? (
                  <BreadcrumbLink>{toTitleCase(path)}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{toTitleCase(path)}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// ✅ 첫 글자만 대문자로 변환하는 함수
function toTitleCase(input: string): string {
  // "CS" 예외 처리
  if (input.toLowerCase() === "cs") {
    return "CS";
  }

  // 첫 글자만 대문자로 변환
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

// function toTitleCase(input: string): string {
//   const words = input.split("-");
//   const capitalizedWords = words.map(
//     (word) => word.charAt(0).toUpperCase() + word.slice(1)
//   );
//   return capitalizedWords.join(" ");
// }
