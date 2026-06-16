// lib/srs.ts
// SM-2 간격 반복 알고리즘 (Anki 클래식). 순수 함수 — 알고리즘 교체 가능하게 격리.
const DAY_MS = 86400000;

// 카드에서 SRS 계산에 필요한 부분만 (Card의 부분집합)
export interface SrsState {
  ease: number;
  intervalDays: number;
  repetitions: number;
}

export interface ScheduleResult extends SrsState {
  dueAt: number;
}

export function schedule(state: SrsState, grade: number, now: number): ScheduleResult {
  let ease = state.ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (ease < 1.3) ease = 1.3;

  let repetitions: number;
  let intervalDays: number;

  if (grade < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions = state.repetitions + 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(state.intervalDays * ease);
  }

  return { ease, intervalDays, repetitions, dueAt: now + intervalDays * DAY_MS };
}
