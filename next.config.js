/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি যেকোনো HTTPS ডোমেইন থেকে ছবি লোড করার অনুমতি দেবে
      },
      {
        protocol: "http",
        hostname: "**", // এটি যেকোনো HTTP ডোমেইন থেকে ছবি লোড করার অনুমতি দেবে
      },
    ],
  },
};

export default nextConfig;
