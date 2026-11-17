import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { promises as fs } from "fs";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import { getRoutes, type EachRoute, ROUTES } from "./routes-config";
import { getContentPath } from "./content-path";
export { getDocsTocs } from "./content-path";

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
import { KeyPoint, Stats, Stat, Timeline, TimelineItem, ProsCons, Pros, Cons } from "@/components/markdown/blocks";
import { Layers, Layer } from "@/components/markdown/layers";

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
  KeyPoint,
  Stats,
  Stat,
  Timeline,
  TimelineItem,
  ProsCons,
  Pros,
  Cons,
  Layers,
  Layer,
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

export async function getDocsForSlug(slug: string) {
  const contentPath = getContentPath(slug);
  if (!contentPath) return undefined;
  try {
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.log(err);
  }
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