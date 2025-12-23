/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.dicebear.com'],
  },
  // Remova experimental.serverActions pois agora é padrão
}

module.exports = nextConfig
