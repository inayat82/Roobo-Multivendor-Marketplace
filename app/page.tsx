export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Roobo Multivendor Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your Shopify store into a powerful multivendor marketplace
          </p>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-green-600">Super Admin</h3>
                <p className="text-sm text-gray-600">Full marketplace control</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-blue-600">Vendor</h3>
                <p className="text-sm text-gray-600">Manage products & sales</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-purple-600">Sub-user</h3>
                <p className="text-sm text-gray-600">Assist vendor operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}