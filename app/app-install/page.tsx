'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function AppInstallContent() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [installing, setInstalling] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (shop) {
      handleInstallation()
    } else {
      setError('Shop parameter is missing from the installation URL')
    }
  }, [shop])

  const handleInstallation = () => {
    if (!shop) {
      setError('Shop parameter is required for installation')
      return
    }

    console.log('Starting installation for shop:', shop)
    setInstalling(true)
    
    // Redirect to OAuth flow with your active store
    const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
    window.location.href = `/api/auth/shopify?shop=${shopDomain}`
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-red-600 text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Installation Error</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <a 
            href="https://marketplace.roobosoft.com/install"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Try Manual Installation
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Installing Roobo Marketplace</h1>
        <p className="text-gray-600 mb-4">
          Installing app for store: <strong>{shop}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Please wait while we redirect you to Shopify for authorization...
        </p>
      </div>
    </div>
  )
}

export default function AppInstallPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AppInstallContent />
    </Suspense>
  )
}