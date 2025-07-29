import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  transpilePackages: ["@bytebank/ui", "@bytebank/utils"],

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/auth/trasactions",
        destination: "/trasactions",
        permanent: true,
      },
    ];
  },

  // Multi-zones config
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "http://localhost:3002/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
