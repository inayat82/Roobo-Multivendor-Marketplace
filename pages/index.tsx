import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [shop, setShop] = useState('')
  const [loading, setLoading] = useState(false)

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault()
    if (!shop.trim()) return
    
    setLoading(true)
    const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
    
    // Redirect to Shopify OAuth
    window.location.href = `/api/auth/shopify?shop=${shopDomain}`
  }

  return (
    <>
      <Head>
        <title>Shopify Connector</title>
        <meta name="description" content="Connect your Shopify store" />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7fafc',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '0.5rem' }}>
              🛍️ Shopify Connector
            </h1>
            <p style={{ color: '#718096' }}>
              Connect your Shopify store in seconds
            </p>
          </div>

          <form onSubmit={handleConnect}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                Your Shopify Store
              </label>
              <input
                type="text"
                value={shop}
                onChange={(e) => setShop(e.target.value)}
                placeholder="your-store.myshopify.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3182ce'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              />
              <p style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.25rem' }}>
                Enter your store domain (e.g., my-store or my-store.myshopify.com)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !shop.trim()}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: loading ? '#a0aec0' : '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#2c5282'
              }}
              onMouseOut={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#3182ce'
              }}
            >
              {loading ? 'Connecting...' : 'Connect Store →'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>
              What happens next?
            </h3>
            <ol style={{ fontSize: '0.75rem', color: '#4a5568', paddingLeft: '1rem' }}>
              <li>You'll be redirected to Shopify</li>
              <li>Click "Install app" to authorize</li>
              <li>You'll see "You are connected!" message</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}