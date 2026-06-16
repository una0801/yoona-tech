import Link from "next/link";
import { Binary, Server, Cloud, Sparkles, Code2, FileText, type LucideIcon } from "lucide-react";

type Meta = { label: string; Icon: LucideIcon; chip: string; hover: string };

const META: Record<string, Meta> = {
  cs: {
    label: "CS", Icon: Binary,
    chip: "bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
    hover: "group-hover:border-sky-300 dark:group-hover:border-sky-800",
  },
  backend: {
    label: "Backend", Icon: Server,
    chip: "bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
    hover: "group-hover:border-violet-300 dark:group-hover:border-violet-800",
  },
  devops: {
    label: "DevOps", Icon: Cloud,
    chip: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-300",
    hover: "group-hover:border-cyan-300 dark:group-hover:border-cyan-800",
  },
  ai: {
    label: "AI", Icon: Sparkles,
    chip: "bg-pink-100 text-pink-600 dark:bg-pink-950/50 dark:text-pink-300",
    hover: "group-hover:border-pink-300 dark:group-hover:border-pink-800",
  },
  code: {
    label: "Code", Icon: Code2,
    chip: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
    hover: "group-hover:border-emerald-300 dark:group-hover:border-emerald-800",
  },
};

const FALLBACK: Meta = {
  label: "Docs", Icon: FileText,
  chip: "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
  hover: "",
};

export function CategoryCard({ category, count, href }: { category: string; count: number; href: string }) {
  const meta = META[category] ?? { ...FALLBACK, label: category };
  const { Icon } = meta;
  return (
    <Link
      href={href}
      className={`una-card-link group flex flex-col gap-3 p-5 ${meta.hover}`}
    >
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${meta.chip}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold tracking-tight">{meta.label}</span>
        <span className="text-sm text-muted-foreground">{count} docs</span>
      </div>
    </Link>
  );
}
