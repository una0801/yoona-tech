import { describe, it, expect } from "vitest";
import {
  computeDate,
  parseTags,
  sortByDateDesc,
  aggregateTags,
  rankRelated,
  type PostMeta,
} from "../posts-utils";

const mtime = new Date("2020-01-01T00:00:00Z");

function post(p: Partial<PostMeta>): PostMeta {
  return {
    title: "t",
    href: "/backend/a",
    category: "backend",
    date: new Date("2020-01-01"),
    tags: [],
    readingTime: 1,
    ...p,
  };
}

describe("computeDate", () => {
  it("frontmatter date 있으면 그 값 사용", () => {
    expect(computeDate("2023-05-10", mtime).toISOString().slice(0, 10)).toBe(
      "2023-05-10"
    );
  });
  it("frontmatter date 없으면 mtime fallback", () => {
    expect(computeDate(undefined, mtime).getTime()).toBe(mtime.getTime());
  });
  it("date가 잘못된 형식이면 mtime fallback", () => {
    expect(computeDate("not-a-date", mtime).getTime()).toBe(mtime.getTime());
  });
});

describe("parseTags", () => {
  it("배열이면 문자열만 추려 trim", () => {
    expect(parseTags([" a ", "b", 3 as unknown as string])).toEqual(["a", "b"]);
  });
  it("없으면 빈 배열", () => {
    expect(parseTags(undefined)).toEqual([]);
  });
});

describe("sortByDateDesc", () => {
  it("최신순 정렬", () => {
    const a = post({ href: "/x/1", date: new Date("2021-01-01") });
    const b = post({ href: "/x/2", date: new Date("2023-01-01") });
    expect(sortByDateDesc([a, b])[0].href).toBe("/x/2");
  });
});

describe("aggregateTags", () => {
  it("태그별 개수 집계, 개수 내림차순", () => {
    const posts = [
      post({ tags: ["go", "db"] }),
      post({ tags: ["go"] }),
    ];
    const result = aggregateTags(posts);
    expect(result[0]).toEqual({ tag: "go", count: 2 });
    expect(result).toContainEqual({ tag: "db", count: 1 });
  });
});

describe("rankRelated", () => {
  it("같은 카테고리 + 공유 태그 가중치로 상위 N, 자기 자신 제외", () => {
    const target = post({ href: "/backend/target", category: "backend", tags: ["go", "db"] });
    const sameCatSharedTag = post({ href: "/backend/x", category: "backend", tags: ["go"] });
    const sameCatNoTag = post({ href: "/backend/y", category: "backend", tags: [] });
    const otherCat = post({ href: "/ai/z", category: "ai", tags: ["go", "db"] });
    const all = [target, otherCat, sameCatNoTag, sameCatSharedTag];
    const result = rankRelated(target, all, 2);
    expect(result.map((p) => p.href)).not.toContain("/backend/target");
    expect(result[0].href).toBe("/backend/x");
    expect(result.length).toBe(2);
  });
});
