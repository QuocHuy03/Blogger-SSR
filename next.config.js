/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mangoads.vn', 'ui-avatars.com'],
  },
  env: {
    MONGODB_URI:
      "mongodb+srv://qhuydev:1Qu3suVc1hEEdi6d@cluster0.dek5hts.mongodb.net/blogger-ssr?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
