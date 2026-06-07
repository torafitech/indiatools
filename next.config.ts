import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["jspdf", "@anthropic-ai/sdk"],
  },
  async redirects() {
    return [
      {
        source: "/fssai-nutrition-label",
        destination: "/nutrition-label-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
