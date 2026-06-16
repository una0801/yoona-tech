import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { promises as fs } from "fs";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import { getRoutes, getPageRoutes,type EachRoute,ROUTES } from "./routes-config";

// import { page_routes, ROUTES } from "./routes-config";
import { visit } from "unist-util-visit";
import matter from "gray-matter";
import Mermaid from "@/components/mermaid";

// custom components imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pre from "@/components/markdown/pre";
import Note from "@/components/markdown/note";
import { Stepper, StepperItem, Step } from "@/components/markdown/stepper";
import Image from "@/components/markdown/image";
import Link from "@/components/markdown/link";
import Outlet from "@/components/markdown/outlet";
import { Cards, Card } from "@/components/markdown/cards";
import { Compare, CompareCol } from "@/components/markdown/compare";

type RouteType = keyof typeof ROUTES;
// add custom components
const components = {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  pre: Pre,
  Note,
  Stepper,
  StepperItem,
  step: StepperItem, // <step>은 StepperItem으로 매핑
  step2: Step, // <step2>는 Step으로 매핑
  Step2: Step, // Step2도 Step 컴포넌트로 매핑
  img: Image,
  a: Link,
  Outlet,
  Mermaid,
  Cards,
  Card,
  Compare,
  CompareCol,
};

// can be used for other pages like blogs, Guides etc
async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preProcess,
          rehypeCodeTitles,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postProcess,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
}

// logic for docs

export type BaseMdxFrontmatter = {
  title: string;
  description: string;
};

function getContentPath(slug: string) {
  const availableTypes = Object.keys(ROUTES); // ["cs", "backend", "frontend", "devops", "ai", ...]
  const type = availableTypes.find((t) => slug.startsWith(`${t}/`)) ?? "cs"; // 기본값 "cs"


  return path.join(process.cwd(), `/contents/${type}/`, `${slug.replace(`${type}/`, "")}/index.mdx`);
}

// export async function getDocsForSlug(slug: string) {
//   try {
//     const contentPath = getDocsContentPath(slug);
//     const rawMdx = await fs.readFile(contentPath, "utf-8");
//     return await parseMdx<BaseMdxFrontmatter>(rawMdx);
//   } catch (err) {
//     console.log(err);
//   }
// }
export async function getDocsForSlug(slug: string) {
  try {
    const contentPath = getContentPath(slug);
    console.log("slug",slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
}

export async function getBackendForSlug(slug: string) {
  try { 
    const contentPath = getBackendContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
}

export async function getCodeForSlug(slug: string) {
  try { 
    const contentPath = getCodeContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
}

export async function getdevopsForSlug(slug: string) {
  try { 
    const contentPath = getdevopsContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
}

export async function getAiForSlug(slug: string) {
  try { 
    const contentPath = getAiContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
}

export async function getDocsTocs(slug: string | string[]) {
  // ✅ `ROUTES`의 키 값들을 가져와서 지원하는 라우트 유형 리스트 만들기
  const availableTypes = Object.keys(ROUTES) as (keyof typeof ROUTES)[];

  // ✅ `slug`가 배열 형태인지 확인 후 문자열로 변환
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
  // console.log("slug path: ", slugPath);

  // console.log("🚀 Available Types:", availableTypes);
  // console.log("📂 Received Slug Path:", slugPath);

  // ✅ `slugPath`의 첫 번째 요소를 기반으로 자동 감지  
  // let detectedType: keyof typeof ROUTES | undefined = availableTypes.includes(slugPath.split("/")[0])
  // ? (slugPath.split("/")[0] as keyof typeof ROUTES)
  // : undefined;

  // console.log("🔍 Detected Type (Step 1):", detectedType);

  // ✅ `type`을 감지하지 못한 경우, `ROUTES`에서 `slugPath`를 포함하는 타입을 찾음

  const detectedType = availableTypes.find((t) =>
    ROUTES[t].some((route) => slugPath.startsWith(route.href.replace(/^\//, "")))
  );
  

  // console.log("✅ Final Detected Type:", detectedType);

  
  const type: keyof typeof ROUTES = detectedType ?? "cs"; 
  // console.log("type: ",type);

  // ✅ `slug`에서 `type/`을 제거하여 경로 설정
  const relativeSlug = slugPath.startsWith(`${type}/`) ? slugPath.replace(`${type}/`, "") : slugPath;

  // ✅ `ROUTES[type]`을 사용하여 동적 파일 경로 설정
  const contentPath = path.join(process.cwd(), `/contents/${type}/`, `${relativeSlug}/index.mdx`);

  try {

    const rawMdx = await fs.readFile(contentPath, "utf-8");

    // ✅ 파일에서 헤딩(제목) 추출 (이전 로직 유지)
    const headingsRegex = /^(#{2,4})\s(.+)$/gm;
    let match;
    const extractedHeadings = [];
    while ((match = headingsRegex.exec(rawMdx)) !== null) {
      const headingLevel = match[1].length;
      const headingText = match[2].trim();
      const slug = sluggify(headingText);

      extractedHeadings.push({
        level: headingLevel,
        text: headingText,
        href: `#${slug}`,
      });
    }
    return extractedHeadings;
  } catch (err) {
    console.error(`❌ Error reading file: ${contentPath}`, err);
    return [];
  }
}

export function getPreviousNext(path: string) {
  const availableTypes = Object.keys(ROUTES) as RouteType[];
  const type = availableTypes.find((t) => path.startsWith(`/${t}`)) ?? "cs";

  const selectedRoutes: EachRoute[] = getPageRoutes(type) ?? [];

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  // 섹션 프리픽스를 제거한 경로로 비교
  const pathWithoutSection = cleanPath.replace(`/${type}`, "");
  let index = selectedRoutes.findIndex(({ href }) => href === pathWithoutSection);

  if (index === -1) return { prev: null, next: null };

  // ✅ `noLink: true`이거나 최상위 경로인 항목 제외
  const filteredRoutes = selectedRoutes.filter(
    (route) =>
      !route.noLink && 
      !ROUTES[type].some((topLevelRoute) => topLevelRoute.href === route.href)
  );

  index = filteredRoutes.findIndex(({ href }) => href === pathWithoutSection);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? filteredRoutes[index - 1] : null,
    next: index < filteredRoutes.length - 1 ? filteredRoutes[index + 1] : null,
  };
}

function sluggify(text: string) {
  return text
    .normalize("NFC") // ⚠️ 한글을 NFC 형식으로 변환 (이게 핵심)
    .replace(/[\p{Emoji_Presentation}]/gu, "") // 이모지 제거
    .replace(/[`~!@#$%^&*()_+=[\]{};:'"\\|,.<>/?]/g, "") // 특수문자 제거
    .trim()
    .replace(/\s+/g, "-") // 공백 → 하이픈
    .toLowerCase();
}


// function getDocsContentPath(slug: string) {
//   return path.join(process.cwd(), "/contents/cs/", `${slug}/index.mdx`);
// }

function getBackendContentPath(slug: string) {
  return path.join(process.cwd(), "/contents/backend/", `${slug}/index.mdx`);
}

function getCodeContentPath(slug: string) {
  return path.join(process.cwd(), "/contents/code/", `${slug}/index.mdx`);
}


function getdevopsContentPath(slug: string) {
  return path.join(process.cwd(), "/contents/devops/", `${slug}/index.mdx`);
}

function getAiContentPath(slug: string) {
  return path.join(process.cwd(), "/contents/ai/", `${slug}/index.mdx`);
}

function justGetFrontmatterFromMD<Frontmatter>(rawMd: string): Frontmatter {
  return matter(rawMd).data as Frontmatter;
}

export async function getAllChilds(pathString: string) {
  const availableTypes = Object.keys(ROUTES) as RouteType[];
  const type = availableTypes.find((t) => pathString.startsWith(`/${t}`)) ?? "cs";

  const selectedRoutes = (getRoutes(type) as EachRoute[]) ?? [];

  const items = pathString.split("/").filter((it) => it !== "");
  let page_routes_copy: EachRoute[] = selectedRoutes;

  for (const it of items) {
    const found = page_routes_copy.find((innerIt) => innerIt.href === `/${it}`);
    if (!found) break;
    page_routes_copy = found.items ?? [];
  }
  // console.log("🔍 getAllChilds Output:", page_routes_copy); 
  // ✅ `noLink: true` 항목을 필터링해서 `/dsa` 제거
  const filteredRoutes = page_routes_copy
    .filter((route) => !route.noLink)
    .map((route) => ({
      ...route,
      description: route.description || "", // ✅ `description` 속성이 없으면 빈 문자열로 설정
      items: route.items ? route.items.filter((sub) => !sub.noLink) : undefined, // ✅ 하위 항목도 필터링
    }));

  return filteredRoutes;
}

// for copying the code in pre
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") return;
      node.raw = codeEl.children?.[0].value;
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postProcess = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      node.properties["raw"] = node.raw;
    }
  });
};

export type Author = {
  avatar?: string;
  handle: string;
  username: string;
  handleUrl: string;
};

export type BlogMdxFrontmatter = BaseMdxFrontmatter & {
  date: string;
  authors: Author[];
  cover: string;
};

export async function getAllBlogStaticPaths() {
  try {
    const blogFolder = path.join(process.cwd(), "/contents/blogs/");
    const res = await fs.readdir(blogFolder);
    return res.map((file) => file.split(".")[0]);
  } catch (err) {
    console.log(err);
  }
}
export async function getAllBlogs() {
  const blogFolder = path.join(process.cwd(), "/contents/blogs/");
  const files = await fs.readdir(blogFolder);
  const uncheckedRes = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith(".mdx")) return undefined;
      const filepath = path.join(process.cwd(), `/contents/blogs/${file}`);
      const rawMdx = await fs.readFile(filepath, "utf-8");
      return {
        ...justGetFrontmatterFromMD<BlogMdxFrontmatter>(rawMdx),
        slug: file.split(".")[0],
      };
    }),
  );
  return uncheckedRes.filter((it) => !!it) as (BlogMdxFrontmatter & {
    slug: string;
  })[];
}

export async function getBlogForSlug(slug: string) {
  const blogFile = path.join(process.cwd(), "/contents/blogs/", `${slug}.mdx`);
  try {
    const rawMdx = await fs.readFile(blogFile, "utf-8");
    return await parseMdx<BlogMdxFrontmatter>(rawMdx);
  } catch {
    return undefined;
  }
}