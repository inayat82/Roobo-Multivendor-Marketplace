import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  console.log('OAuth callback received:', request.url)
  
  // Import at runtime to avoid build issues
  const { getDatabase, users, vendors } = await import('@/lib/db/client')
  
  const db = getDatabase()
  
  if (!db) {
    console.error('Database not available')  
    return NextResponse.json({ error: 'Database not available' }, { status: 500 })
  }

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const shop = url.searchParams.get('shop')
  const state = url.searchParams.get('state')

  if (!code || !shop) {
    console.error('Missing OAuth parameters:', { code: !!code, shop })
    return NextResponse.json({ error: 'Missing OAuth parameters' }, { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for access token')
    }

    const tokenData = await tokenResponse.json()
    console.log('Access token received for shop:', shop)
    
    const { access_token, scope } = tokenData

    // Create or update user as Super Admin (store owner)
    const existingUser = await db.query.users.findFirst({
      where: (users: any, { and, eq }: any) => and(
        eq(users.shopifyStoreId, shop),
        eq(users.role, 'super_admin')
      ),
    })

    if (!existingUser) {
      // Create new super admin user
      const [newUser] = await db.insert(users).values({
        shopifyStoreId: shop,
        email: `admin@${shop}`,
        role: 'super_admin',
        status: 'active'
      }).returning()

      console.log('Created new Super Admin user:', newUser.id)

      // Create vendor record for the super admin
      await db.insert(vendors).values({
        userId: newUser.id,
        shopId: shop,
        status: 'active',
        approvedAt: new Date(),
        approvedBy: newUser.id
      })

      console.log('Created vendor record for Super Admin')
    } else {
      console.log('Existing Super Admin user found:', existingUser.id)
    }

    // Super Admin gets redirected to marketplace dashboard
    const dashboardUrl = `${process.env.APP_URL}/dashboard?shop=${shop}&installed=true`
    console.log('Redirecting to dashboard:', dashboardUrl)
    return NextResponse.redirect(dashboardUrl)

  } catch (error) {
    console.error('Shopify callback error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Callback failed', details: errorMessage }, { status: 500 })
  }
}