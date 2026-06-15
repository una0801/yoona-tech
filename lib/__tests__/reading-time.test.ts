import { describe, it, expect } from "vitest";
import { readingTime } from "../reading-time";

describe("readingTime", () => {
  it("빈 본문이면 최소 1분", () => {
    expect(readingTime("")).toBe(1);
  });

  it("한글 400자당 약 1분 (800자 → 2분)", () => {
    const body = "가".repeat(800);
    expect(readingTime(body)).toBe(2);
  });

  it("코드블록/마크다운 기호는 글자 수에서 제외", () => {
    const body = "```ts\n" + "x".repeat(4000) + "\n```\n" + "가".repeat(400);
    expect(readingTime(body)).toBe(1);
  });

  it("frontmatter 구분자나 공백만 있어도 최소 1분", () => {
    expect(readingTime("\n\n   \n")).toBe(1);
  });
});
