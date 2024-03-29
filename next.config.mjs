/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com','orange-historic-reptile-492.mypinata.cloud', 'ipfs.io'],
        minimumCacheTTL: 1500000,
      },
};

export default nextConfig;
