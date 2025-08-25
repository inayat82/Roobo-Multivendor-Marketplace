import { NextRequest, NextResponse } from 'next/server'
import { shopify } from '@/lib/shopify/config'
import { db, users, vendors } from '@/lib/db'

export async function GET(request: NextRequest) {
  if (!shopify || !db) {
    return NextResponse.json({ error: 'Services not available' }, { status: 500 })
  }

  try {
    const callback = await shopify.auth.callback({
      rawRequest: request,
      rawResponse: NextResponse,
    })

    const { session } = callback
    
    if (!session?.shop || !session?.accessToken) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
    }

    // Create or update user as Super Admin (store owner)
    const existingUser = await db.query.users.findFirst({
      where: (users, { and, eq }) => and(
        eq(users.shopifyStoreId, session.shop),
        eq(users.role, 'super_admin')
      ),
    })

    if (!existingUser) {
      // Create new super admin user
      const [newUser] = await db.insert(users).values({
        shopifyStoreId: session.shop,
        email: `admin@${session.shop}`,
        role: 'super_admin',
        status: 'active'
      }).returning()

      // Create vendor record for the super admin
      await db.insert(vendors).values({
        userId: newUser.id,
        shopId: session.shop,
        status: 'active',
        approvedAt: new Date(),
        approvedBy: newUser.id
      })
    }

    // Store session in your preferred session store
    // For now, redirect to the app
    const appUrl = `https://${session.shop}/admin/apps`
    return NextResponse.redirect(appUrl)

  } catch (error) {
    console.error('Shopify callback error:', error)
    return NextResponse.json({ error: 'Callback failed' }, { status: 500 })
  }
}