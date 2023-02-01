/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  }
}

module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ],
  },
}