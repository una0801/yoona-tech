import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type PageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({ tag: encodeURIComponent(t.tag) }));
}

export async function generateMetadata(props: PageProps) {
  const { tag } = await props.params;
  const decoded = decodeURIComponent(tag);
  return { title: `#${decoded}`, description: `${decoded} 태그 글 목록` };
}

export default async function TagDetailPage(props: PageProps) {
  const { tag } = await props.params;
  const decoded = decodeURIComponent(tag);
  const posts = await getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-8 text-3xl font-extrabold text-pink-600">#{decoded}</h1>
      <div className="flex flex-col gap-3">
        {posts.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="rounded-xl border-2 border-pink-100 bg-white/70 p-4 transition-colors hover:border-pink-300"
          >
            <span className="text-xs font-semibold uppercase text-fuchsia-400">{p.category}</span>
            <p className="font-bold text-pink-700">{p.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
