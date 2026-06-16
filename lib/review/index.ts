// lib/review/index.ts
import { IndexedDbRepository } from "./indexed-db";
import type { ReviewRepository } from "./types";

// 미래 백엔드 승격: env.NEXT_PUBLIC_API_URL 있으면 HttpRepository 반환하도록 이 함수만 교체.
function createRepository(): ReviewRepository {
  return new IndexedDbRepository();
}

let _repo: ReviewRepository | null = null;

// 브라우저에서만 호출 (IndexedDB는 클라이언트 전용)
export function getReviewRepo(): ReviewRepository {
  if (!_repo) _repo = createRepository();
  return _repo;
}

export type { Card, Review, NewCardInput, QuizWrong, OverviewStats, BackupData } from "./types";
