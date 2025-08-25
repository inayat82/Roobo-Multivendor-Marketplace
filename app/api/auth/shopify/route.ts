import { NextRequest, NextResponse } from 'next/server'
import { shopify } from '@/lib/shopify/config'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')

  if (!shop) {
    return NextResponse.json({ error: 'Shop parameter is required' }, { status: 400 })
  }

  // Validate shop domain
  const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
  
  try {
    const authRoute = await shopify.auth.begin({
      shop: shopDomain,
      callbackPath: '/api/auth/shopify/callback',
      isOnline: false,
      rawRequest: request,
      rawResponse: NextResponse,
    })

    return NextResponse.redirect(authRoute)
  } catch (error) {
    console.error('Shopify auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}