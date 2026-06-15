import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="mt-12 border-t pt-6">
      <h3 className="mb-4 font-bold text-pink-600">관련 글</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="rounded-xl border-2 border-pink-100 bg-white/70 p-3 text-sm transition-colors hover:border-pink-300"
          >
            <span className="text-xs uppercase text-fuchsia-400">{p.category}</span>
            <p className="font-semibold text-pink-700 line-clamp-2">{p.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
