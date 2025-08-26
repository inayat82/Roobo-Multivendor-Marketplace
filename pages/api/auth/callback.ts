import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, shop, state } = req.query

  if (!code || !shop || typeof shop !== 'string') {
    return res.status(400).json({ error: 'Missing OAuth parameters' })
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
    
    // Redirect to success page with shop info
    return res.redirect(`/success?shop=${shop}`)

  } catch (error) {
    console.error('Shopify callback error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(500).json({ error: 'Callback failed', details: errorMessage })
  }
}