import { getPageRoutes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getBackendForSlug } from "@/lib/markdown";
import { ArticleView } from "@/components/article-view";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const { slug = [] } = await props.params;
  const res = await getBackendForSlug(slug.join("/"));
  if (!res) notFound();
  return <ArticleView category="backend" slug={slug} res={res} />;
}

export async function generateMetadata(props: PageProps) {
  const { slug = [] } = await props.params;
  const res = await getBackendForSlug(slug.join("/"));
  if (!res) return null;
  const { frontmatter } = res;
  return { title: frontmatter.title, description: frontmatter.description };
}

export function generateStaticParams() {
  return getPageRoutes("backend").map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
