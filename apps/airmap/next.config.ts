import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  experimental: {
    /**
     * @see https://github.com/vercel/next.js/pull/22867
     */
    externalDir: true,
  },
  output: "export",
};

export default nextConfig;
