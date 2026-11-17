import { describe, it, expect } from "vitest";
import { isQuizEligible } from "@/lib/quiz-eligibility";

describe("isQuizEligible", () => {
  it("개념 문서는 포함", () => {
    expect(isQuizEligible({ href: "/backend/kafka/basic", quizFlag: undefined })).toBe(true);
    expect(isQuizEligible({ href: "/cs/structures/array", quizFlag: undefined })).toBe(true);
  });

  it("install/hands-on/test/setup 키워드 경로는 제외", () => {
    expect(isQuizEligible({ href: "/backend/kafka/install", quizFlag: undefined })).toBe(false);
    expect(isQuizEligible({ href: "/kubernetes/hands-on/dashboard", quizFlag: undefined })).toBe(false);
    expect(isQuizEligible({ href: "/ai/setup/environment", quizFlag: undefined })).toBe(false);
    expect(isQuizEligible({ href: "/backend/kafka/test/introduction", quizFlag: undefined })).toBe(false);
  });

  it("컴포넌트 데모 경로는 제외", () => {
    expect(isQuizEligible({ href: "/backend/components/tabs", quizFlag: undefined })).toBe(false);
    expect(isQuizEligible({ href: "/code/note/stepper", quizFlag: undefined })).toBe(false);
  });

  it("code 코딩테스트 풀이(problems)는 제외", () => {
    expect(isQuizEligible({ href: "/code/problems/ants", quizFlag: undefined })).toBe(false);
    expect(isQuizEligible({ href: "/code/problems/1018-chess", quizFlag: undefined })).toBe(false);
  });

  it("code/fundamentals 개념은 포함", () => {
    expect(isQuizEligible({ href: "/code/python/mathematical", quizFlag: undefined })).toBe(true);
  });

  it("frontmatter quiz:false 는 강제 제외", () => {
    expect(isQuizEligible({ href: "/cs/structures/array", quizFlag: false })).toBe(false);
  });

  it("frontmatter quiz:true 는 블록리스트보다 우선해 포함", () => {
    expect(isQuizEligible({ href: "/backend/kafka/install", quizFlag: true })).toBe(true);
  });

  it("접두어 붙은 설치 문서와 마이그레이션 실습은 제외", () => {
    expect(isQuizEligible({ href: "/backend/messaging/kafka-install", quizFlag: undefined })).toBe(false);
    expect(isQuizEligible({ href: "/kubernetes/migration/deploy-nginx", quizFlag: undefined })).toBe(false);
  });

  it("problems 안이라도 frontmatter quiz: true면 포함", () => {
    expect(isQuizEligible({ href: "/code/problems/patterns", quizFlag: true })).toBe(true);
  });
});
