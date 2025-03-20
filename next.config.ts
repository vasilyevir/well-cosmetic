import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.satom.ru",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
  },
};

export default nextConfig;
