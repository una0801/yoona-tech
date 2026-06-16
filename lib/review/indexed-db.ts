// lib/review/indexed-db.ts
import { openDB, type IDBPDatabase } from "idb";
import { schedule } from "@/lib/srs";
import type {
  BackupData, Card, NewCardInput, OverviewStats, QuizWrong,
  Review, ReviewRepository, ReviewResult, DayCount,
} from "./types";

const DB_VERSION = 1;
const DAY_MS = 86400000;
const dayIndex = (ts: number) => Math.floor(ts / DAY_MS);

// 환경에 crypto.randomUUID 없을 때 대비
function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function makeCard(input: NewCardInput, now: number): Card {
  return {
    id: uuid(),
    front: input.front,
    back: input.back,
    source: input.source,
    category: input.category,
    tags: input.tags ?? [],
    docSlug: input.docSlug ?? null,
    createdAt: now,
    ease: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueAt: now, // 신규 카드는 즉시 복습 대상
  };
}

export class IndexedDbRepository implements ReviewRepository {
  private dbPromise: Promise<IDBPDatabase>;

  constructor(dbName = "yoona-review") {
    this.dbPromise = openDB(dbName, DB_VERSION, {
      upgrade(db) {
        const cards = db.createObjectStore("cards", { keyPath: "id" });
        cards.createIndex("dueAt", "dueAt");
        cards.createIndex("category", "category");
        const reviews = db.createObjectStore("reviews", { keyPath: "id" });
        reviews.createIndex("reviewedAt", "reviewedAt");
      },
    });
  }

  async addCard(input: NewCardInput, now = Date.now()): Promise<Card> {
    const db = await this.dbPromise;
    const card = makeCard(input, now);
    await db.put("cards", card);
    return card;
  }

  async addCardsFromQuiz(wrong: QuizWrong[], now = Date.now()): Promise<Card[]> {
    const db = await this.dbPromise;
    const tx = db.transaction("cards", "readwrite");
    const cards = wrong.map((w) =>
      makeCard(
        {
          front: w.question,
          back: `${w.options[w.answerIndex]}\n\n${w.explanation}`,
          source: "quiz_wrong",
          category: w.sourceHref.split("/").filter(Boolean)[0] ?? "etc",
          docSlug: w.sourceHref,
        },
        now
      )
    );
    await Promise.all(cards.map((c) => tx.store.put(c)));
    await tx.done;
    return cards;
  }

  async getDueCards(now = Date.now()): Promise<Card[]> {
    const db = await this.dbPromise;
    const due = await db.getAllFromIndex("cards", "dueAt", IDBKeyRange.upperBound(now));
    return due as Card[]; // dueAt 인덱스 → 오름차순 정렬됨
  }

  async recordReview(cardId: string, grade: number, now = Date.now()): Promise<ReviewResult> {
    const db = await this.dbPromise;
    const card = (await db.get("cards", cardId)) as Card | undefined;
    if (!card) throw new Error(`card not found: ${cardId}`);

    const next = schedule(card, grade, now);
    const updated: Card = { ...card, ease: next.ease, intervalDays: next.intervalDays, repetitions: next.repetitions, dueAt: next.dueAt };
    const review: Review = { id: uuid(), cardId, grade, reviewedAt: now };

    const tx = db.transaction(["cards", "reviews"], "readwrite");
    await tx.objectStore("cards").put(updated);
    await tx.objectStore("reviews").put(review);
    await tx.done;

    return { nextDueAt: next.dueAt, intervalDays: next.intervalDays };
  }

  async getOverview(now = Date.now()): Promise<OverviewStats> {
    const db = await this.dbPromise;
    const totalCards = await db.count("cards");
    const dueCount = (await this.getDueCards(now)).length;
    const reviews = (await db.getAll("reviews")) as Review[];

    const reviewedDays = new Set(reviews.map((r) => dayIndex(r.reviewedAt)));
    let cursor = dayIndex(now);
    if (!reviewedDays.has(cursor)) cursor -= 1; // 오늘 아직 안 했으면 어제부터
    let streak = 0;
    while (reviewedDays.has(cursor)) {
      streak += 1;
      cursor -= 1;
    }

    const today = dayIndex(now);
    const last7: DayCount[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = today - i;
      const count = reviews.filter((r) => dayIndex(r.reviewedAt) === d).length;
      last7.push({ dayOffset: i === 0 ? 0 : -i, count });
    }

    return { dueCount, totalCards, streak, last7 };
  }

  async listCards(): Promise<Card[]> {
    const db = await this.dbPromise;
    return (await db.getAll("cards")) as Card[];
  }

  async deleteCard(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete("cards", id);
  }

  async exportAll(): Promise<BackupData> {
    const db = await this.dbPromise;
    const cards = (await db.getAll("cards")) as Card[];
    const reviews = (await db.getAll("reviews")) as Review[];
    return { cards, reviews };
  }

  async importAll(data: BackupData): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(["cards", "reviews"], "readwrite");
    await Promise.all([
      ...data.cards.map((c) => tx.objectStore("cards").put(c)),
      ...data.reviews.map((r) => tx.objectStore("reviews").put(r)),
    ]);
    await tx.done;
  }
}
