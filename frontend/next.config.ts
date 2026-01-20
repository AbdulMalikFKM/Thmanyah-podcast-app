import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mzstatic.com", // This allows all iTunes/Apple artwork domains
      },
    ],
  },
};

export default nextConfig;
