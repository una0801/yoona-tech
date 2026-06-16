// lib/review/backup.ts
import { getReviewRepo } from "./index";
import type { BackupData } from "./types";

// 현재 데이터를 JSON 파일로 다운로드
export async function downloadBackup(): Promise<void> {
  const data = await getReviewRepo().exportAll();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `yoona-review-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// 파일에서 복원
export async function restoreBackup(file: File): Promise<void> {
  const text = await file.text();
  const data = JSON.parse(text) as BackupData;
  if (!Array.isArray(data.cards) || !Array.isArray(data.reviews)) {
    throw new Error("백업 형식이 올바르지 않음");
  }
  await getReviewRepo().importAll(data);
}
