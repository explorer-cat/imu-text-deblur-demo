import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages. NEXT_BASE_PATH is set by the deploy
  // workflow to "/<repo-name>"; local dev serves at "/" as before.
  output: "export",
  basePath: process.env.NEXT_BASE_PATH ?? "",
  images: { unoptimized: true },
};

export default nextConfig;
