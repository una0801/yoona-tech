import { describe, it, expect } from "vitest";
import fs from "fs";
import { getDocsTocs, getContentPath } from "@/lib/content-path";
import { getPreviousNext } from "@/lib/nav-server";

describe("카테고리 포함 경로로 파일 판별", () => {
  it("섹션 slug가 다른 카테고리와 겹쳐도 해당 카테고리 파일의 TOC", async () => {
    // architecture는 cs·aws 둘 다 있는 섹션 slug
    expect((await getDocsTocs("aws/architecture/cdn")).length).toBeGreaterThan(0);
  });

  it("새 카테고리 kubernetes 문서 조회", async () => {
    expect(fs.existsSync(getContentPath("kubernetes/workload/cronjob")!)).toBe(true);
  });

  it("카테고리 없는 경로는 null", () => {
    expect(getContentPath("architecture/cdn")).toBeNull();
  });
});

describe("getPreviousNext", () => {
  it("섹션 경계를 넘어 카테고리 순서대로", () => {
    const { prev, next } = getPreviousNext("/cs/db/index");
    expect(prev?.href).toBe("/cs/db/transactions");
    expect(next?.href).toBe("/cs/db/nosql");
  });

  it("소분류 소개 글도 순서에 포함", () => {
    const r = getPreviousNext("/cs/advanced-algo/graph-advanced");
    expect(r.next?.href.startsWith("/cs/advanced-algo/")).toBe(true);
  });
});
