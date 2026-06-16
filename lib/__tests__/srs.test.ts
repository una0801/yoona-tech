// lib/__tests__/srs.test.ts
import { describe, it, expect } from "vitest";
import { schedule, type SrsState } from "@/lib/srs";

const DAY = 86400000;
const fresh: SrsState = { ease: 2.5, intervalDays: 0, repetitions: 0 };

describe("schedule (SM-2)", () => {
  it("신규 카드에 grade 5 → reps 1, interval 1일, ease 2.6", () => {
    const r = schedule(fresh, 5, 0);
    expect(r.repetitions).toBe(1);
    expect(r.intervalDays).toBe(1);
    expect(r.ease).toBeCloseTo(2.6, 5);
    expect(r.dueAt).toBe(DAY);
  });

  it("grade 4는 ease 유지(2.5)", () => {
    const r = schedule(fresh, 4, 0);
    expect(r.ease).toBeCloseTo(2.5, 5);
    expect(r.intervalDays).toBe(1);
  });

  it("두 번째 성공(reps 1→2) → interval 6일", () => {
    const after1 = schedule(fresh, 5, 0); // reps 1
    const r = schedule(after1, 5, 0); // reps 2
    expect(r.repetitions).toBe(2);
    expect(r.intervalDays).toBe(6);
  });

  it("세 번째 성공(reps 2→3) → interval = round(6 * ease)", () => {
    let s: SrsState = fresh;
    s = schedule(s, 5, 0); // reps1 int1
    s = schedule(s, 5, 0); // reps2 int6
    const r = schedule(s, 5, 0); // reps3
    expect(r.repetitions).toBe(3);
    // ease는 매 성공 +0.1 → 2.5→2.6→2.7→2.8, round(6*2.8)=17
    expect(r.intervalDays).toBe(17);
  });

  it("실패(grade 2) → reps 0, interval 1, ease 하락", () => {
    const seasoned: SrsState = { ease: 2.5, intervalDays: 16, repetitions: 3 };
    const r = schedule(seasoned, 2, 1000);
    expect(r.repetitions).toBe(0);
    expect(r.intervalDays).toBe(1);
    expect(r.ease).toBeLessThan(2.5);
    expect(r.dueAt).toBe(1000 + DAY);
  });

  it("ease 하한 1.3", () => {
    const low: SrsState = { ease: 1.3, intervalDays: 1, repetitions: 1 };
    const r = schedule(low, 0, 0);
    expect(r.ease).toBe(1.3);
  });
});
