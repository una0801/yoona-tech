import Link from "next/link";

const LABELS: Record<string, { label: string; emoji: string }> = {
  ai: { label: "AI", emoji: "🤖" },
  backend: { label: "Backend", emoji: "⚙️" },
  code: { label: "Code", emoji: "💻" },
  cs: { label: "CS", emoji: "📐" },
  devops: { label: "DevOps", emoji: "🚀" },
};

export function CategoryCard({ category, count, href }: { category: string; count: number; href: string }) {
  const meta = LABELS[category] ?? { label: category, emoji: "📄" };
  return (
    <Link
      href={href}
      className="una-card-link flex flex-col gap-2 p-5 hover:scale-105"
    >
      <span className="text-3xl">{meta.emoji}</span>
      <span className="font-bold text-lg una-heading">{meta.label}</span>
      <span className="text-sm una-accent">{count} posts</span>
    </Link>
  );
}
