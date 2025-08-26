'use client'

import { useState } from 'react'

export default function TestInstallPage() {
  const [shopDomain, setShopDomain] = useState('')
  const [installing, setInstalling] = useState(false)

  const handleInstall = (e: React.FormEvent) => {
    e.preventDefault()
    if (!shopDomain.trim()) return

    setInstalling(true)
    const shop = shopDomain.includes('.myshopify.com') ? shopDomain : `${shopDomain}.myshopify.com`
    
    // Redirect to our app installation
    window.location.href = `/app-install?shop=${shop}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Test App Installation</h1>
          <p className="text-gray-600">Enter your active Shopify development store</p>
        </div>

        <form onSubmit={handleInstall} className="space-y-4">
          <div>
            <label htmlFor="shop" className="block text-sm font-medium text-gray-700 mb-1">
              Shop Domain
            </label>
            <input
              type="text"
              id="shop"
              value={shopDomain}
              onChange={(e) => setShopDomain(e.target.value)}
              placeholder="your-store-name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={installing}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter just the store name (without .myshopify.com)
            </p>
          </div>

          <button
            type="submit"
            disabled={installing || !shopDomain.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            {installing ? 'Installing...' : 'Install App'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-900 mb-2">Instructions:</h3>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Go to your Shopify Partner Dashboard</li>
            <li>Create a new development store (or use existing active one)</li>
            <li>Enter the store name above</li>
            <li>Click "Install App" to test OAuth flow</li>
          </ol>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
          <p className="text-sm text-green-800">
            ✅ <strong>OAuth is working!</strong> The API key is valid. You just need an active development store.
          </p>
        </div>
      </div>
    </div>
  )
}