import { getPageRoutes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getCodeForSlug } from "@/lib/markdown";
import { ArticleView } from "@/components/article-view";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const { slug = [] } = await props.params;
  const res = await getCodeForSlug(slug.join("/"));
  if (!res) notFound();
  return <ArticleView category="code" slug={slug} res={res} />;
}

export async function generateMetadata(props: PageProps) {
  const { slug = [] } = await props.params;
  const res = await getCodeForSlug(slug.join("/"));
  if (!res) return null;
  const { frontmatter } = res;
  return { title: frontmatter.title, description: frontmatter.description };
}

export function generateStaticParams() {
  return getPageRoutes("code").map((item) => ({
    slug: item.href.split("/").slice(1), // 다른 카테고리와 동일 (category 중복 제거)
  }));
}
