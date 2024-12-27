/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    IRON_SESSION_SECRET: process.env.IRON_SESSION_SECRET,
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
  },
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
  experimental: {
    //appDir: true,
  },
};

// module.exports = withTM(nextConfig);
module.exports = nextConfig;
