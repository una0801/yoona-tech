import { describe, it, expect } from "vitest";
import { buildNavTree, findDocLocation, categoryOfPath, categoryLabel, cardCategoryLabel } from "@/lib/nav";
import type { EachRoute } from "@/lib/routes-config";

const ROUTES: Record<string, EachRoute[]> = {
  cs: [
    {
      title: "기초",
      href: "/basic",
      noLink: true,
      items: [
        { title: "A", href: "/a" },
        { title: "Missing", href: "/missing" },
      ],
    },
    {
      title: "고급",
      href: "/adv",
      noLink: true,
      intro: "/overview",
      items: [
        { title: "그래프", href: "", noLink: true, intro: "/graph", items: [{ title: "X", href: "/x" }] },
        { title: "문자열", href: "", noLink: true, intro: "/string", items: [{ title: "Y", href: "/y" }] },
      ],
    },
    { title: "빈 섹션", href: "/empty", noLink: true, items: [{ title: "Z", href: "/z" }] },
  ],
};

const FILES = new Set(["/cs/basic/a", "/cs/adv/x", "/cs/adv/y", "/cs/adv/graph", "/cs/adv/overview"]);
const exists = (href: string) => FILES.has(href);

describe("buildNavTree", () => {
  const tree = buildNavTree(ROUTES, exists);

  it("파일 없는 문서와 문서 0개 섹션 제외", () => {
    expect(tree.cs.map((s) => s.title)).toEqual(["기초", "고급"]);
    expect(tree.cs[0].count).toBe(1);
    expect(tree.cs[0].groups[0].docs).toEqual([{ title: "A", href: "/cs/basic/a" }]);
  });

  it("href 빈 소분류는 URL에 안 붙음", () => {
    expect(tree.cs[1].groups.map((g) => g.docs[0].href)).toEqual(["/cs/adv/x", "/cs/adv/y"]);
    expect(tree.cs[1].count).toBe(2);
  });

  it("소개 글은 파일 있을 때만 introHref", () => {
    expect(tree.cs[1].introHref).toBe("/cs/adv/overview");
    expect(tree.cs[1].groups[0]).toMatchObject({ label: "그래프", introHref: "/cs/adv/graph" });
    expect(tree.cs[1].groups[1].introHref).toBeUndefined();
  });

  it("섹션 바로 아래 문서는 라벨 없는 그룹", () => {
    expect(tree.cs[0].groups[0].label).toBe("");
  });
});

describe("findDocLocation", () => {
  const tree = buildNavTree(ROUTES, exists);

  it("문서와 소개 글 모두 섹션 위치 반환", () => {
    expect(findDocLocation(tree, "/cs/adv/y")).toEqual({ category: "cs", sectionIndex: 1 });
    expect(findDocLocation(tree, "/cs/adv/graph")).toEqual({ category: "cs", sectionIndex: 1 });
    expect(findDocLocation(tree, "/cs/adv/overview")).toEqual({ category: "cs", sectionIndex: 1 });
  });

  it("없는 href는 null", () => {
    expect(findDocLocation(tree, "/cs/nope")).toBeNull();
  });
});

describe("categoryOfPath", () => {
  it("첫 조각이 카테고리면 반환", () => {
    expect(categoryOfPath("/cs/structures/array")).toBe("cs");
    expect(categoryOfPath("/cs")).toBe("cs");
    expect(categoryOfPath("/quiz")).toBeNull();
  });
});

describe("categoryLabel", () => {
  it("표시 이름, 없으면 대문자", () => {
    expect(categoryLabel("cs")).toBe("CS");
    expect(categoryLabel("kubernetes")).toBe("Kubernetes");
    expect(categoryLabel("aws")).toBe("AWS");
    expect(categoryLabel("zzz")).toBe("ZZZ");
  });
});

describe("cardCategoryLabel", () => {
  it("개편 전 devops 카드는 문서 경로로 AWS/Kubernetes 구분", () => {
    expect(cardCategoryLabel("devops", "/devops/aws/iam/sts")).toBe("AWS");
    expect(cardCategoryLabel("devops", "/aws/iam/sts")).toBe("AWS");
    expect(cardCategoryLabel("devops", "/devops/kubernetes/workload/pod")).toBe("Kubernetes");
    expect(cardCategoryLabel("devops", null)).toBe("Kubernetes");
  });

  it("현재 카테고리는 표시 이름 그대로", () => {
    expect(cardCategoryLabel("cs", "/cs/db/index")).toBe("CS");
  });
});
