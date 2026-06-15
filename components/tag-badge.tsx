import Link from "next/link";
import { tagColorClass } from "@/lib/tag-color";

export function TagBadge({ tag, count }: { tag: string; count?: number }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium shadow-sm ring-1 ring-white/60 transition-transform hover:scale-105 ${tagColorClass(tag)}`}
    >
      <span>#{tag}</span>
      {count != null && <span className="opacity-60">{count}</span>}
    </Link>
  );
}
