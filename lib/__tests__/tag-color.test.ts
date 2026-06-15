import { describe, it, expect } from "vitest";
import { tagColorClass } from "../tag-color";

describe("tagColorClass", () => {
  it("같은 태그는 항상 같은 색", () => {
    expect(tagColorClass("kubernetes")).toBe(tagColorClass("kubernetes"));
  });

  it("항상 유효한 색상 클래스 반환 (bg/text/border 포함)", () => {
    const cls = tagColorClass("fast-api");
    expect(cls).toMatch(/bg-/);
    expect(cls).toMatch(/text-/);
    expect(cls).toMatch(/border-/);
  });

  it("빈 문자열도 안전하게 처리", () => {
    expect(typeof tagColorClass("")).toBe("string");
    expect(tagColorClass("").length).toBeGreaterThan(0);
  });
});
