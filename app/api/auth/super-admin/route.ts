import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { shop } = await request.json()
    
    if (!shop) {
      return NextResponse.json({ error: 'Shop parameter is required' }, { status: 400 })
    }

    // Import at runtime to avoid build issues
    const { getDatabase, users } = await import('@/lib/db/client')
    const db = getDatabase()
    
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Check if Super Admin exists for this shop
    const existingUser = await db.query.users.findFirst({
      where: (users: any, { and, eq }: any) => and(
        eq(users.shopifyStoreId, shop),
        eq(users.role, 'super_admin')
      ),
    })

    if (existingUser) {
      return NextResponse.json({ 
        exists: true, 
        message: 'Super Admin found. Redirecting to Shopify OAuth...',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role
        }
      })
    } else {
      return NextResponse.json({ 
        exists: false, 
        message: 'No Super Admin found for this store. Please install the app first.',
        installUrl: `/install?shop=${shop}`
      })
    }

  } catch (error) {
    console.error('Super Admin check error:', error)
    return NextResponse.json({ error: 'Authentication check failed' }, { status: 500 })
  }
}