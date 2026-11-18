import { readFileSync } from "node:fs";

// 목차 구조 개편(2026-11-17) 전 URL → 새 URL (scripts/nav-migration/migrate.py 생성)
const legacyRedirects = JSON.parse(readFileSync(new URL("./lib/redirects.json", import.meta.url), "utf-8"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  // turbopack 사용 시
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
