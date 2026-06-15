import { ReactNode } from "react";
import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { Typography } from "@/components/typography";
import PrintButton from "@/components/print-button";
import { RelatedPosts } from "@/components/related-posts";
import { TagBadge } from "@/components/tag-badge";
import { AiAssistant } from "@/components/ai-assistant";
import { getAllPosts, getRelatedPosts } from "@/lib/posts";

type Frontmatter = { title: string; description?: string };

// 글 상세 5개 카테고리 라우트가 공유하는 뷰. category/slug만 다르고 나머지는 동일
export async function ArticleView({
  category,
  slug,
  res,
}: {
  category: string;
  slug: string[];
  res: { content: ReactNode; frontmatter: Frontmatter };
}) {
  const pathName = slug.join("/");
  const href = `/${category}/${pathName}`;
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
            <p className="-mt-2 text-sm una-accent">{meta.readingTime} min read</p>
          )}
          {meta && meta.tags.length > 0 && (
            <div className="not-prose mt-3 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>
          )}
          <div>{res.content}</div>
          {meta && <AiAssistant href={href} title={res.frontmatter.title} />}
          <RelatedPosts posts={related} />
          <Pagination pathname={href} />
        </Typography>
      </div>
      <Toc path={pathName} />
      <PrintButton />
    </div>
  );
}
