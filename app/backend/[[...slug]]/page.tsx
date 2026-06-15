import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { getPageRoutes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getBackendForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import PrintButton from "@/components/print-button";
import { getAllPosts, getRelatedPosts } from "@/lib/posts";
import { RelatedPosts } from "@/components/related-posts";
type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const params = await props.params;
  // console.log("params: ", params);
  const {
    slug = []
  } = params;

  const pathName = slug.join("/");
  const res = await getBackendForSlug(pathName);

  if (!res) notFound();

  const href = `/backend/${pathName}`;
  const all = await getAllPosts();
  const meta = all.find((p) => p.href === href);
  const related = await getRelatedPosts(href, 3);
  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <DocsBreadcrumb paths={slug} />
        <Typography>
          <h1 className="text-3xl !-mt-0.5">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px]">
            {res.frontmatter.description}
          </p>
          {meta && (
            <p className="-mt-2 text-sm text-pink-400">{meta.readingTime} min read</p>
          )}
          <div>{res.content}</div>
          <RelatedPosts posts={related} />
          <Pagination pathname={pathName} />
        </Typography>
      </div>
      <Toc path={pathName} />
      <PrintButton />
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const {
    slug = []
  } = params;

  const pathName = slug.join("/");
  const res = await getBackendForSlug(pathName);
  if (!res) return null;
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

// export function generateStaticParams() {
//   console.log("Using page_routes from:", page_routes);
//   return page_routes.map((item) => ({
//     slug: item.href.split("/").slice(1),
//   }));
// }
export function generateStaticParams() {
  const csRoutes = getPageRoutes("backend"); // 

  return csRoutes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}