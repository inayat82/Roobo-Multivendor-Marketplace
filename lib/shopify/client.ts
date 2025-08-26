// Simple runtime-only Shopify configuration
// This file only creates the Shopify instance when actually needed, not during build

let shopifyInstance: any = null

export function getShopifyClient() {
  if (!shopifyInstance && process.env.SHOPIFY_API_KEY && process.env.SHOPIFY_API_SECRET) {
    // Lazy load the Shopify API only when needed
    const { shopifyApi, ApiVersion } = require('@shopify/shopify-api')
    require('@shopify/shopify-api/adapters/node')
    
    shopifyInstance = shopifyApi({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      scopes: ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_customers'],
      hostName: process.env.APP_URL?.replace('https://', '') || 'localhost:3000',
      hostScheme: process.env.NODE_ENV === 'production' ? 'https' : 'http',
      apiVersion: ApiVersion.July24,
      isEmbeddedApp: false,
    })
  }
  return shopifyInstance
}