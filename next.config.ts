import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fqa5cmbcgti1knug.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "m7zas4xswxdvpdt7.public.blob.vercel-storage.com",
      },
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
