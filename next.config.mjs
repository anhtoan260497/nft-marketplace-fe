/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com',],
        minimumCacheTTL: 1500000,
      },
};

export default nextConfig;
