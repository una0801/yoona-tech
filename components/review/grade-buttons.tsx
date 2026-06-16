// components/review/grade-buttons.tsx
"use client";

// SM-2 채점: 다시(0) / 어려움(3) / 보통(4) / 쉬움(5)
const GRADES = [
  { grade: 0, label: "다시", cls: "border-red-400 text-red-600 hover:bg-red-500/10" },
  { grade: 3, label: "어려움", cls: "border-amber-400 text-amber-600 hover:bg-amber-500/10" },
  { grade: 4, label: "보통", cls: "border-sky-400 text-sky-600 hover:bg-sky-500/10" },
  { grade: 5, label: "쉬움", cls: "border-green-400 text-green-600 hover:bg-green-500/10" },
] as const;

export function GradeButtons({ onGrade }: { onGrade: (grade: number) => void }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {GRADES.map((g) => (
        <button
          key={g.grade}
          onClick={() => onGrade(g.grade)}
          className={`rounded-md border py-3 text-sm font-semibold transition-colors ${g.cls}`}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}
