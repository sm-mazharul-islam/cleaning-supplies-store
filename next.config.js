/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ds-cdn.dubaistore.com",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
