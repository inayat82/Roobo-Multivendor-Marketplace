import { shopifyApi } from '@shopify/shopify-api'
import { restResources } from '@shopify/shopify-api/rest/admin/2024-07'

if (!process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_API_SECRET) {
  throw new Error('Shopify API credentials are required')
}

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_customers'],
  hostName: process.env.APP_URL?.replace('https://', '') || 'localhost:3000',
  hostScheme: process.env.NODE_ENV === 'production' ? 'https' : 'http',
  apiVersion: '2024-07',
  isEmbeddedApp: true,
  restResources,
})

export const SHOPIFY_CONFIG = {
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecret: process.env.SHOPIFY_API_SECRET,
  scopes: 'read_products,write_products,read_orders,write_orders,read_customers',
  hostName: process.env.APP_URL?.replace('https://', '') || 'localhost:3000'
}