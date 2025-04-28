import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 型エラーを無視
  },  
  eslint: {
    ignoreDuringBuilds: true, // ビルド時にESLintエラーを無視
  },
};

module.exports = nextConfig;
