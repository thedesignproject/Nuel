/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Add domains here if you need to load images from external sources
    // domains: ['example.com'],
    remotePatterns: [
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   pathname: '/images/**',
      // },
    ],
  },

  // Experimental features (uncomment if needed)
  // experimental: {
  //   serverActions: true,
  // },
};

module.exports = nextConfig;
