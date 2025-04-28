import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ビルド時にESLintエラーを無視
  },
};

module.exports = nextConfig;
