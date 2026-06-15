export type PostMeta = {
  title: string;
  description?: string;
  href: string; // /backend/kafka/install
  category: string; // cs|backend|devops|ai|code
  date: Date;
  tags: string[];
  series?: string;
  readingTime: number; // 분
};

export function computeDate(frontmatterDate: unknown, mtime: Date): Date {
  if (typeof frontmatterDate === "string" || frontmatterDate instanceof Date) {
    const d = new Date(frontmatterDate as string);
    if (!isNaN(d.getTime())) return d;
  }
  return mtime;
}

export function parseTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t): t is string => typeof t === "string")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function sortByDateDesc(posts: PostMeta[]): PostMeta[] {
  return [...posts].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function aggregateTags(posts: PostMeta[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function rankRelated(target: PostMeta, all: PostMeta[], n: number): PostMeta[] {
  const scored = all
    .filter((p) => p.href !== target.href)
    .map((p) => {
      let score = 0;
      if (p.category === target.category) score += 2;
      const shared = p.tags.filter((t) => target.tags.includes(t)).length;
      score += shared * 1;
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.p.date.getTime() - a.p.date.getTime());
  return scored.slice(0, n).map((s) => s.p);
}
