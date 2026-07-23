import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emit a self-contained server bundle so the Docker image can run the app
  // without the full node_modules tree.
  output: "standalone",
};

export default nextConfig;
