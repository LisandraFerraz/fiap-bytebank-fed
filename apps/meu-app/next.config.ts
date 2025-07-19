import type { NextConfig } from "next";
const { AUTH_MFE_URL } = process.env;

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
    ];
  },

  async rewrites() {
    return [
      {
        source: "/login",
        destination: `${AUTH_MFE_URL}/auth/login`,
      },
    ];
  },
};

export default nextConfig;
