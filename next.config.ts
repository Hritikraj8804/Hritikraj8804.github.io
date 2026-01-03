import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Uncomment and adjust if deploying to a subdirectory (e.g., username.github.io/portfolio)
  // basePath: '/portfolio',
  // assetPrefix: '/portfolio',
};

export default nextConfig;
