export function StatsBar({ posts, categories }: { posts: number; categories: number }) {
  return (
    <div className="flex items-center justify-center gap-3 text-pink-500 font-semibold text-sm sm:text-base">
      <span>{posts} posts</span>
      <span className="text-pink-300">·</span>
      <span>{categories} categories</span>
    </div>
  );
}
