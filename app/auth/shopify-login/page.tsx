'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, ArrowRight, ShoppingBag } from 'lucide-react'

export default function ShopifyLoginPage() {
  const [shop, setShop] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleShopifyLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!shop) {
      setError('Please enter your shop domain')
      return
    }

    setLoading(true)
    setError('')
    
    // Ensure shop has .myshopify.com domain
    const shopDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
    
    // Redirect to Shopify OAuth flow
    window.location.href = `/api/auth/shopify?shop=${shopDomain}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Super Admin Login</CardTitle>
          <CardDescription>
            Login as a Shopify store owner to access your marketplace dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleShopifyLogin} className="space-y-4">
            <div>
              <label htmlFor="shop" className="block text-sm font-medium text-gray-700 mb-1">
                Your Shopify Store Domain
              </label>
              <input
                type="text"
                name="shop"
                id="shop"
                value={shop}
                onChange={(e) => setShop(e.target.value)}
                placeholder="your-store.myshopify.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Connecting...' : 'Login with Shopify'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Not a store owner?</p>
              <Link 
                href="/auth/login"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Login as Admin or Sub-user →
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Super Admin Access:</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Full marketplace control and settings</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Manage all vendors and commissions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Access to revenue analytics</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Create admin and sub-users</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}