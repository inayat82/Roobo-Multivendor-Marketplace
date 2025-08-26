import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop } = req.query

  if (!shop || typeof shop !== 'string') {
    return res.status(400).json({ error: 'Shop parameter is required' })
  }

  // Validate shop domain
  const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
  
  try {
    const apiKey = process.env.SHOPIFY_API_KEY
    const scopes = process.env.SHOPIFY_SCOPES || 'read_shop'
    const redirectUri = `${process.env.APP_URL}/api/auth/callback`
    const state = crypto.randomBytes(16).toString('hex')
    
    if (!apiKey) {
      throw new Error('SHOPIFY_API_KEY not configured')
    }

    // Build Shopify OAuth URL
    const authUrl = new URL(`https://${shopDomain}/admin/oauth/authorize`)
    authUrl.searchParams.set('client_id', apiKey)
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('state', state)

    console.log('Redirecting to Shopify OAuth:', authUrl.toString())
    return res.redirect(authUrl.toString())
  } catch (error) {
    console.error('Shopify auth error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(500).json({ error: 'Authentication failed', details: errorMessage })
  }
}