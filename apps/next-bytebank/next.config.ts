import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },

  // Multi-zones config
  async rewrites() {
    return [
      {
        source: "/dashboard/:path*",
        destination: "http://localhost:3002/dashboard/:path*",
      },
    ];
  },
  transpilePackages: ["@bytebank/ui"],
};

export default nextConfig;
