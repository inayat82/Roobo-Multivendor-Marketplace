import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  console.log('Shopify auth request:', request.url)
  
  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')

  if (!shop) {
    console.error('No shop parameter provided')
    return NextResponse.json({ error: 'Shop parameter is required' }, { status: 400 })
  }

  // Validate shop domain
  const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
  console.log('Processing auth for shop:', shopDomain)
  
  try {
    const apiKey = process.env.SHOPIFY_API_KEY
    const scopes = 'read_products,write_products,read_orders,write_orders,read_customers'
    const redirectUri = `${process.env.APP_URL}/api/auth/shopify/callback`
    const state = crypto.randomBytes(16).toString('hex')
    
    if (!apiKey) {
      throw new Error('SHOPIFY_API_KEY not configured')
    }

    // Build Shopify OAuth URL manually
    const authUrl = new URL(`https://${shopDomain}/admin/oauth/authorize`)
    authUrl.searchParams.set('client_id', apiKey)
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('state', state)

    console.log('Auth URL generated:', authUrl.toString())
    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error('Shopify auth error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Authentication failed', details: errorMessage }, { status: 500 })
  }
}