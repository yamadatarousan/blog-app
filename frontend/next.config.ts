/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: 'out',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-image-domain.com', // 例: s3.amazonaws.com
      },
    ],
  },
};