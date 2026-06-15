import { getAllTags } from "@/lib/posts";
import { TagBadge } from "@/components/tag-badge";

export const metadata = { title: "Tags", description: "전체 태그" };

export default async function TagsPage() {
  const tags = await getAllTags();
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-8 text-3xl font-extrabold text-pink-600">Tags</h1>
      {tags.length === 0 ? (
        <p className="text-muted-foreground">아직 태그가 없다. 글 frontmatter에 tags를 추가하면 여기 표시된다.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((t) => (
            <TagBadge key={t.tag} tag={t.tag} count={t.count} />
          ))}
        </div>
      )}
    </div>
  );
}
