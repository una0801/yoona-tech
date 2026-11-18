export function StatsBar({ posts, categories }: { posts: number; categories: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>
        문서 <span className="font-semibold text-foreground">{posts}</span>개
      </span>
      <span aria-hidden>·</span>
      <span>
        카테고리 <span className="font-semibold text-foreground">{categories}</span>개
      </span>
    </div>
  );
}
