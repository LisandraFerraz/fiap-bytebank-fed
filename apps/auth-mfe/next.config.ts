import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
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

  async rewrites() {
    return [
      // api
      {
        source: "/nest/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
