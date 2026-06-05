import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
