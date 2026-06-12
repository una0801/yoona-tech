import { describe, it, expect } from "vitest";
import { parseQuizResponse } from "@/lib/quiz-llm";
import { extractHeadings } from "@/lib/headings";

const HREF = "/cs/structures/array";

describe("parseQuizResponse", () => {
  it("코드펜스로 감싼 JSON 배열을 파싱", () => {
    const text = "```json\n[{\"question\":\"Q1\",\"options\":[\"a\",\"b\",\"c\",\"d\"],\"answerIndex\":1,\"explanation\":\"E\"}]\n```";
    const out = parseQuizResponse(text, HREF);
    expect(out).toHaveLength(1);
    expect(out[0].sourceHref).toBe(HREF);
    expect(out[0].answerIndex).toBe(1);
  });

  it("answerIndex 범위 초과 문제는 폐기", () => {
    const text = "[{\"question\":\"Q\",\"options\":[\"a\",\"b\"],\"answerIndex\":5,\"explanation\":\"E\"}]";
    expect(parseQuizResponse(text, HREF)).toHaveLength(0);
  });

  it("필드 누락 문제는 폐기", () => {
    const text = "[{\"question\":\"Q\",\"options\":[\"a\",\"b\",\"c\",\"d\"]}]";
    expect(parseQuizResponse(text, HREF)).toHaveLength(0);
  });

  it("옵션이 2개 미만이면 폐기", () => {
    const text = "[{\"question\":\"Q\",\"options\":[\"a\"],\"answerIndex\":0,\"explanation\":\"E\"}]";
    expect(parseQuizResponse(text, HREF)).toHaveLength(0);
  });

  it("JSON이 아니면 빈 배열", () => {
    expect(parseQuizResponse("문제를 만들 수 없습니다", HREF)).toHaveLength(0);
  });
});

describe("anchor 매핑", () => {
  const headings = [
    { text: "개념", slug: "개념" },
    { text: "특징", slug: "특징" },
  ];

  it("section이 헤딩과 일치하면 anchor 설정", () => {
    const text = '[{"question":"Q","options":["a","b"],"answerIndex":0,"explanation":"E","section":"개념"}]';
    expect(parseQuizResponse(text, "/x", headings)[0].anchor).toBe("개념");
  });

  it("section이 헤딩에 없으면 anchor 없음", () => {
    const text = '[{"question":"Q","options":["a","b"],"answerIndex":0,"explanation":"E","section":"없는제목"}]';
    expect(parseQuizResponse(text, "/x", headings)[0].anchor).toBeUndefined();
  });

  it("headings 미제공 시 anchor 없음(기존 호환)", () => {
    const text = '[{"question":"Q","options":["a","b"],"answerIndex":0,"explanation":"E","section":"개념"}]';
    expect(parseQuizResponse(text, "/x")[0].anchor).toBeUndefined();
  });
});

describe("extractHeadings", () => {
  it("코드펜스 무시하고 헤딩 추출", () => {
    const md = "## 개념\n```py\n# 주석\n```\n## 특징";
    expect(extractHeadings(md).map((h) => h.text)).toEqual(["개념", "특징"]);
  });
});
