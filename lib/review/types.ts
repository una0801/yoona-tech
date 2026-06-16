// lib/review/types.ts
// 복습 카드 — 브라우저에 저장할 객체 모양 (서버 없음)
export type CardSource = "quiz_wrong" | "manual" | "ai";

export interface Card {
  id: string;
  front: string; // 질문/앞면
  back: string; // 답/뒷면
  source: CardSource;
  category: string; // backend | cs | devops | ai | code
  tags: string[];
  docSlug: string | null; // 출처 문서 경로
  createdAt: number; // ms epoch
  // --- SM-2 상태 ---
  ease: number; // 기본 2.5
  intervalDays: number; // 기본 0
  repetitions: number; // 기본 0
  dueAt: number; // 다음 복습 예정 (ms epoch) — "오늘 복습" 조회 기준
}

// 복습 기록 — 스트릭·집계 원천
export interface Review {
  id: string;
  cardId: string;
  grade: number; // 0~5
  reviewedAt: number; // ms epoch
}

// 카드 생성 입력 (id·SRS 상태·createdAt은 저장소가 채움)
export interface NewCardInput {
  front: string;
  back: string;
  source: CardSource;
  category: string;
  tags?: string[];
  docSlug?: string | null;
}

// 퀴즈 오답 1건 (app/quiz/page.tsx의 Question 형태에서 추림)
export interface QuizWrong {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  sourceHref: string; // /backend/kafka/install
  anchor?: string;
}

// recordReview 반환
export interface ReviewResult {
  nextDueAt: number;
  intervalDays: number;
}

// 최근 7일 한 칸
export interface DayCount {
  dayOffset: number; // 오늘=0, 어제=-1 ...
  count: number;
}

// 대시보드 요약
export interface OverviewStats {
  dueCount: number; // 오늘 복습할 카드 수
  totalCards: number;
  streak: number; // 연속 복습일
  last7: DayCount[]; // 최근 7일 복습량 (과거→오늘 순, 길이 7)
}

// 백업 데이터
export interface BackupData {
  cards: Card[];
  reviews: Review[];
}

// UI가 의존하는 유일한 추상화. 메서드는 미래 FastAPI 엔드포인트와 1:1.
export interface ReviewRepository {
  addCard(input: NewCardInput, now?: number): Promise<Card>; // POST /cards
  addCardsFromQuiz(wrong: QuizWrong[], now?: number): Promise<Card[]>; // POST /cards/from-quiz
  getDueCards(now?: number): Promise<Card[]>; // GET /reviews/due
  recordReview(cardId: string, grade: number, now?: number): Promise<ReviewResult>; // POST /reviews
  getOverview(now?: number): Promise<OverviewStats>; // GET /stats/overview
  listCards(): Promise<Card[]>; // GET /cards (관리용 전체 목록)
  deleteCard(id: string): Promise<void>; // DELETE /cards/{id}
  exportAll(): Promise<BackupData>; // 백업 내보내기
  importAll(data: BackupData): Promise<void>; // 백업 복원
}
