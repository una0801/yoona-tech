export function StatsBar({ posts, categories }: { posts: number; categories: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span><span className="font-semibold text-foreground">{posts}</span> docs</span>
      <span className="opacity-50">·</span>
      <span><span className="font-semibold text-foreground">{categories}</span> categories</span>
    </div>
  );
}
