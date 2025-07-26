import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bytebank/ui"],

  basePath: "/dashboard",
};

export default nextConfig;
