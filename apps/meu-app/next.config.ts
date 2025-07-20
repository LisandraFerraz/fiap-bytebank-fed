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
};

export default nextConfig;
