import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [process.cwd()],
  },
};

export default nextConfig;
