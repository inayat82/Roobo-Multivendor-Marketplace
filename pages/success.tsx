import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Success() {
  const router = useRouter()
  const { shop } = router.query
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Connected Successfully!</title>
        <meta name="description" content="Your Shopify store is now connected" />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0fff4',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          {/* Success Icon */}
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            🎉
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#22543d',
            marginBottom: '1rem'
          }}>
            You are Connected!
          </h1>

          <div style={{
            backgroundColor: '#c6f6d5',
            border: '2px solid #9ae6b4',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '1.25rem',
              color: '#22543d',
              margin: 0,
              fontWeight: '600'
            }}>
              ✅ Store: {shop}
            </p>
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: '#4a5568',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Your Shopify store has been successfully connected to our application. 
            You can now close this window or continue exploring.
          </p>

          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#22543d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a365d'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22543d'}
            >
              Connect Another Store
            </button>

            <button
              onClick={() => window.close()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#e2e8f0',
                color: '#4a5568',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#cbd5e0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            >
              Close Window
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#edf2f7',
            borderRadius: '6px'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#718096',
              margin: 0
            }}>
              🔐 Your connection is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  )
}