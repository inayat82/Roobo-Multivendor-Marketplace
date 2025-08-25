'use client'

import { useState } from 'react'

// Mock commission data with proper types
interface CommissionRate {
  id: number
  vendorName: string
  category: string
  currentRate: number
  previousRate: number
  effectiveDate: string
  lastUpdated: string
}

const mockCommissionRates: CommissionRate[] = [
  {
    id: 1,
    vendorName: 'Tech Gadgets Store',
    category: 'Electronics',
    currentRate: 10.0,
    previousRate: 8.0,
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    vendorName: 'Fashion Boutique',
    category: 'Clothing',
    currentRate: 12.0,
    previousRate: 12.0,
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-01-10'
  },
  {
    id: 3,
    vendorName: 'Global Default',
    category: 'All Categories',
    currentRate: 8.0,
    previousRate: 6.0,
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-01-08'
  }
]

export default function CommissionManagement() {
  const [commissionRates, setCommissionRates] = useState(mockCommissionRates)
  const [showModal, setShowModal] = useState(false)
  const [editingRate, setEditingRate] = useState<CommissionRate | null>(null)
  const [newRate, setNewRate] = useState({
    vendorName: '',
    category: '',
    rate: '',
    effectiveDate: ''
  })

  const handleSaveRate = () => {
    if (editingRate) {
      // Update existing rate
      setCommissionRates(commissionRates.map(rate => 
        rate.id === editingRate.id 
          ? { ...rate, currentRate: parseFloat(newRate.rate), lastUpdated: new Date().toISOString().split('T')[0] }
          : rate
      ))
    } else {
      // Add new rate
      const newRateObj = {
        id: commissionRates.length + 1,
        vendorName: newRate.vendorName,
        category: newRate.category,
        currentRate: parseFloat(newRate.rate),
        previousRate: 0,
        effectiveDate: newRate.effectiveDate,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      setCommissionRates([...commissionRates, newRateObj])
    }
    
    setShowModal(false)
    setEditingRate(null)
    setNewRate({ vendorName: '', category: '', rate: '', effectiveDate: '' })
  }

  const handleEditRate = (rate) => {
    setEditingRate(rate)
    setNewRate({
      vendorName: rate.vendorName,
      category: rate.category,
      rate: rate.currentRate.toString(),
      effectiveDate: rate.effectiveDate
    })
    setShowModal(true)
  }

  const handleBulkUpdate = () => {
    // Placeholder for bulk update functionality
    alert('Bulk update functionality - coming soon!')
  }

  const calculateTotalRevenue = () => {
    // Mock calculation - in real app, this would come from database
    return 15750.00
  }

  const calculateTotalCommissions = () => {
    // Mock calculation
    return 1260.00
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Commission Management</h1>
              <p className="text-gray-600 mt-1">Set and manage commission rates for vendors</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleBulkUpdate}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Bulk Update
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Commission Rate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">${calculateTotalRevenue().toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Commissions</p>
                <p className="text-2xl font-semibold text-gray-900">${calculateTotalCommissions().toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500 rounded-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Commission Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(commissionRates.reduce((sum, rate) => sum + rate.currentRate, 0) / commissionRates.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Rates</p>
                <p className="text-2xl font-semibold text-gray-900">{commissionRates.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Calculator */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Commission Calculator</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sale Amount</label>
                <input 
                  type="number" 
                  placeholder="100.00"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select rate...</option>
                  {commissionRates.map(rate => (
                    <option key={rate.id} value={rate.currentRate}>
                      {rate.vendorName} - {rate.currentRate}%
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commission Amount</label>
                <input 
                  type="text" 
                  value="$0.00"
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Rates Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Commission Rates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor/Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Effective Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commissionRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{rate.vendorName}</div>
                        <div className="text-sm text-gray-500">{rate.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-green-600">
                          {rate.currentRate}%
                        </span>
                        {rate.currentRate > rate.previousRate && (
                          <svg className="w-4 h-4 text-green-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                        )}
                        {rate.currentRate < rate.previousRate && (
                          <svg className="w-4 h-4 text-red-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rate.previousRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rate.effectiveDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rate.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEditRate(rate)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Commission Rate */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingRate ? 'Edit Commission Rate' : 'Add Commission Rate'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor/Category Name
                  </label>
                  <input
                    type="text"
                    value={newRate.vendorName}
                    onChange={(e) => setNewRate({...newRate, vendorName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter vendor or category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newRate.category}
                    onChange={(e) => setNewRate({...newRate, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Electronics, Clothing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRate.rate}
                    onChange={(e) => setNewRate({...newRate, rate: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    value={newRate.effectiveDate}
                    onChange={(e) => setNewRate({...newRate, effectiveDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setEditingRate(null)
                    setNewRate({ vendorName: '', category: '', rate: '', effectiveDate: '' })
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingRate ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}