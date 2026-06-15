export function StatsBar({ posts, categories }: { posts: number; categories: number }) {
  return (
    <div className="flex items-center justify-center gap-3 una-accent font-semibold text-sm sm:text-base">
      <span>{posts} posts</span>
      <span className="opacity-60">·</span>
      <span>{categories} categories</span>
    </div>
  );
}
