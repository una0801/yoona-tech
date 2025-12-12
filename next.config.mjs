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
  // turbopack 사용 시
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
