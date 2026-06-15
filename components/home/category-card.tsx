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
      className="flex flex-col gap-2 rounded-2xl border-2 border-pink-100 bg-white/70 p-5 shadow-sm transition-all hover:scale-105 hover:border-pink-300 hover:shadow-md"
    >
      <span className="text-3xl">{meta.emoji}</span>
      <span className="font-bold text-pink-600 text-lg">{meta.label}</span>
      <span className="text-sm text-pink-400">{count} posts</span>
    </Link>
  );
}
