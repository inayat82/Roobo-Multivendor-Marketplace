import { shopifyApi, ApiVersion } from '@shopify/shopify-api'
import { restResources } from '@shopify/shopify-api/rest/admin/2024-07'

// Initialize Shopify API only if credentials are available (not during build time)
export const shopify = process.env.SHOPIFY_API_KEY && process.env.SHOPIFY_API_SECRET 
  ? shopifyApi({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      scopes: ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_customers'],
      hostName: process.env.APP_URL?.replace('https://', '') || 'localhost:3000',
      hostScheme: process.env.NODE_ENV === 'production' ? 'https' : 'http',
      apiVersion: ApiVersion.July24,
      isEmbeddedApp: true,
      restResources,
    })
  : null

export const SHOPIFY_CONFIG = {
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecret: process.env.SHOPIFY_API_SECRET,
  scopes: 'read_products,write_products,read_orders,write_orders,read_customers',
  hostName: process.env.APP_URL?.replace('https://', '') || 'localhost:3000'
}