/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@shopify/shopify-api']
  },
  images: {
    domains: ['cdn.shopify.com']
  }
}

module.exports = nextConfig