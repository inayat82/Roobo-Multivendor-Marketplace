'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, ArrowRight, CheckCircle } from 'lucide-react'

function InstallContent() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [installing, setInstalling] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // If shop parameter exists, automatically start installation
    if (shop) {
      handleInstall()
    }
  }, [shop])

  const handleInstall = () => {
    if (!shop) {
      setError('Please enter your shop domain')
      return
    }

    setInstalling(true)
    
    // Ensure shop has .myshopify.com domain
    const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
    
    // Redirect to Shopify OAuth flow
    window.location.href = `/api/auth/shopify?shop=${shopDomain}`
  }

  const handleManualInstall = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const shopInput = formData.get('shop') as string
    
    if (!shopInput) {
      setError('Please enter your shop domain')
      return
    }

    setInstalling(true)
    const shopDomain = shopInput.includes('.myshopify.com') ? shopInput : `${shopInput}.myshopify.com`
    window.location.href = `/api/auth/shopify?shop=${shopDomain}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <Store className="w-8 h-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Install Roobo Marketplace</CardTitle>
          <CardDescription>
            Connect your Shopify store to start using the multivendor marketplace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {shop ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">
                    Installing for: {shop}
                  </p>
                </div>
              </div>
              
              {installing ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Redirecting to Shopify...</p>
                </div>
              ) : (
                <Button 
                  onClick={handleInstall}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={installing}
                >
                  Continue Installation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <form onSubmit={handleManualInstall} className="space-y-4">
              <div>
                <label htmlFor="shop" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Shopify Store
                </label>
                <input
                  type="text"
                  name="shop"
                  id="shop"
                  placeholder="your-store.myshopify.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter your store domain (e.g., your-store or your-store.myshopify.com)
                </p>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={installing}
              >
                {installing ? 'Installing...' : 'Install App'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">What happens next?</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>You&apos;ll be redirected to Shopify to authorize the app</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Review and accept the required permissions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>You&apos;ll be redirected back to your marketplace dashboard</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InstallPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <InstallContent />
    </Suspense>
  )
}