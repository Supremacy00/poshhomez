/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

require('dotenv').config();

module.exports = nextConfig
