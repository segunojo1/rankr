import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://pub-80fb4cff335e4792942ddea0eea76119.r2.dev/**')],
  },
};

export default nextConfig;
