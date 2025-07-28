import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bytebank/ui", "@bytebank/utils"],

  basePath: "/auth",
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
