/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.annihil.us",
      },
    ],
  },
};

module.exports = nextConfig;
