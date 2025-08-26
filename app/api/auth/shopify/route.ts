import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('Shopify auth request:', request.url)
  
  // Import at runtime to avoid build issues
  const { getShopifyClient } = await import('@/lib/shopify/client')
  const shopify = getShopifyClient()
  
  if (!shopify) {
    console.error('Shopify client not initialized')
    return NextResponse.json({ error: 'Shopify configuration not available' }, { status: 500 })
  }

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
    const authRoute = await shopify.auth.begin({
      shop: shopDomain,
      callbackPath: '/api/auth/shopify/callback',
      isOnline: false,
      rawRequest: request,
      rawResponse: NextResponse,
    })

    console.log('Auth route generated:', authRoute)
    return NextResponse.redirect(authRoute)
  } catch (error) {
    console.error('Shopify auth error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Authentication failed', details: errorMessage }, { status: 500 })
  }
}