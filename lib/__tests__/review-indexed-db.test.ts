// lib/__tests__/review-indexed-db.test.ts
import { describe, it, expect } from "vitest";
import "fake-indexeddb/auto"; // 전역 indexedDB 주입
import { IndexedDbRepository } from "@/lib/review/indexed-db";
import type { NewCardInput, QuizWrong } from "@/lib/review/types";

const DAY = 86400000;

// 테스트마다 고유 DB 이름으로 격리
let dbSeq = 0;
function newRepo() {
  return new IndexedDbRepository(`test-db-${++dbSeq}`);
}

const manual: NewCardInput = {
  front: "Q", back: "A", source: "manual", category: "backend",
};

describe("IndexedDbRepository", () => {
  it("addCard → 신규 카드는 즉시 due(dueAt<=now), 기본 SRS 상태", async () => {
    const repo = newRepo();
    const card = await repo.addCard(manual, 1000);
    expect(card.id).toBeTruthy();
    expect(card.ease).toBe(2.5);
    expect(card.repetitions).toBe(0);
    expect(card.dueAt).toBe(1000);
    expect(card.tags).toEqual([]);
    expect(card.docSlug).toBeNull();
  });

  it("getDueCards → dueAt<=now 만 반환", async () => {
    const repo = newRepo();
    await repo.addCard(manual, 1000); // due at 1000
    const due = await repo.getDueCards(1000);
    expect(due).toHaveLength(1);
    const dueEarlier = await repo.getDueCards(999);
    expect(dueEarlier).toHaveLength(0);
  });

  it("recordReview → 성공 시 dueAt 미래로 이동, reviews 적치", async () => {
    const repo = newRepo();
    const card = await repo.addCard(manual, 0);
    const res = await repo.recordReview(card.id, 5, 0);
    expect(res.intervalDays).toBe(1);
    expect(res.nextDueAt).toBe(DAY);
    const due = await repo.getDueCards(0);
    expect(due).toHaveLength(0);
  });

  it("recordReview → 없는 카드면 throw", async () => {
    const repo = newRepo();
    await expect(repo.recordReview("nope", 5, 0)).rejects.toThrow();
  });

  it("addCardsFromQuiz → 오답들을 quiz_wrong 카드로 변환(category=경로 첫 세그먼트)", async () => {
    const repo = newRepo();
    const wrong: QuizWrong[] = [{
      question: "스택은?", options: ["FIFO", "LIFO"], answerIndex: 1,
      explanation: "LIFO다", sourceHref: "/cs/structures/stack", anchor: "기능",
    }];
    const cards = await repo.addCardsFromQuiz(wrong, 0);
    expect(cards).toHaveLength(1);
    expect(cards[0].source).toBe("quiz_wrong");
    expect(cards[0].category).toBe("cs");
    expect(cards[0].front).toBe("스택은?");
    expect(cards[0].back).toContain("LIFO");
    expect(cards[0].docSlug).toBe("/cs/structures/stack");
  });

  it("getOverview → dueCount/totalCards/streak/last7 집계", async () => {
    const repo = newRepo();
    const c1 = await repo.addCard(manual, 0);
    await repo.addCard({ ...manual, front: "Q2" }, 0);
    const now = 10 * DAY + 5000;
    await repo.recordReview(c1.id, 5, now);
    const ov = await repo.getOverview(now);
    expect(ov.totalCards).toBe(2);
    expect(ov.streak).toBe(1);
    expect(ov.last7).toHaveLength(7);
    expect(ov.last7[6].dayOffset).toBe(0); // 마지막이 오늘
    expect(ov.last7[6].count).toBe(1);
  });

  it("exportAll/importAll → 라운드트립 보존", async () => {
    const repo = newRepo();
    const c = await repo.addCard(manual, 0);
    await repo.recordReview(c.id, 5, 0);
    const dump = await repo.exportAll();
    expect(dump.cards.length).toBe(1);
    expect(dump.reviews.length).toBe(1);

    const repo2 = newRepo();
    await repo2.importAll(dump);
    const ov = await repo2.getOverview(0);
    expect(ov.totalCards).toBe(1);
  });

  it("listCards/deleteCard → 목록 조회 후 삭제하면 빠짐", async () => {
    const repo = newRepo();
    const a = await repo.addCard(manual, 0);
    await repo.addCard({ ...manual, front: "Q2" }, 0);
    expect(await repo.listCards()).toHaveLength(2);

    await repo.deleteCard(a.id);
    const remaining = await repo.listCards();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].front).toBe("Q2");
  });
});
