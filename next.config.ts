import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["files.edgestore.dev", "images.unsplash.com"],
  },
};

export default nextConfig;
