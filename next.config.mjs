/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com','orange-historic-reptile-492.mypinata.cloud'],
        minimumCacheTTL: 1500000,
      },
};

export default nextConfig;
