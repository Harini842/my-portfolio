import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This allows the build to continue even if there are type errors
    ignoreBuildErrors: true,
  },
  // If you also want to ignore ESLint warnings during build:
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;