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
        destination: `${process.env.NEXT_PUBLIC_AUTH_MFE_URL}/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
