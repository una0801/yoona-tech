// 카테고리별 [[...slug]] 페이지 공통: 빈 slug → 전체 목록, 그 외 → 문서
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { getPageRoutes } from "@/lib/routes-config";
import { categoryLabel } from "@/lib/nav";
import { docFileExists } from "@/lib/nav-server";
import { ArticleView } from "@/components/article-view";
import { CategoryIndex } from "@/components/category-index";

type PageProps = { params: Promise<{ slug?: string[] }> };

export function docsRoute(category: string) {
  async function Page(props: PageProps) {
    const { slug = [] } = await props.params;
    if (slug.length === 0) return <CategoryIndex category={category} />;
    const res = await getDocsForSlug([category, ...slug].join("/"));
    if (!res) notFound();
    return <ArticleView category={category} slug={slug} res={res} />;
  }

  async function generateMetadata(props: PageProps) {
    const { slug = [] } = await props.params;
    if (slug.length === 0) return { title: `${categoryLabel(category)} 문서 목록` };
    const res = await getDocsForSlug([category, ...slug].join("/"));
    if (!res) return null;
    return { title: res.frontmatter.title, description: res.frontmatter.description };
  }

  function generateStaticParams() {
    return [
      { slug: [] as string[] },
      ...getPageRoutes(category)
        .filter((item) => docFileExists(`/${category}${item.href}`))
        .map((item) => ({ slug: item.href.split("/").slice(1) })),
    ];
  }

  return { Page, generateMetadata, generateStaticParams };
}
