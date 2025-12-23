import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { Search, Filter, Download, Plus, TrendingUp, TrendingDown, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function SalesPage() {
  const [sales, setSales] = useState([
    { id: 1, customer: 'TechCorp Inc.', product: 'Enterprise Plan', amount: 4999.99, date: '2024-01-15', status: 'completed', growth: '+12%' },
    { id: 2, customer: 'Startup XYZ', product: 'Business Suite', amount: 899.99, date: '2024-01-14', status: 'pending', growth: '+8%' },
    { id: 3, customer: 'Global Solutions', product: 'Premium License', amount: 249.99, date: '2024-01-13', status: 'completed', growth: '+15%' },
    { id: 4, customer: 'Innovate Labs', product: 'Pro Tools', amount: 1499.99, date: '2024-01-12', status: 'completed', growth: '+5%' },
    { id: 5, customer: 'Digital Media', product: 'Basic Plan', amount: 99.99, date: '2024-01-11', status: 'failed', growth: '-3%' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState('30')
  const [showFilters, setShowFilters] = useState(false)
  const [isCreatingSale, setIsCreatingSale] = useState(false)
  const [newSale, setNewSale] = useState({
    customer: '',
    product: '',
    amount: '',
    paymentMethod: 'credit_card'
  })

  const stats = {
    total: 45231.89,
    monthlyGrowth: 12.5,
    activeDeals: 24,
    conversionRate: 34.2
  }

  // Função para exportar dados
  const handleExport = () => {
    toast.success('Exporting sales data...')
    
    // Simular exportação
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Customer,Product,Amount,Date,Status,Growth\n"
      + sales.map(sale => 
          `${sale.id},"${sale.customer}","${sale.product}",${sale.amount},${sale.date},${sale.status},${sale.growth}`
        ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `sales_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Função para aplicar filtros
  const handleApplyFilters = () => {
    toast.success('Filters applied')
    setShowFilters(false)
  }

  // Função para limpar filtros
  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setTimeFilter('30')
    toast.success('Filters cleared')
  }

  // Função para criar nova venda
  const handleCreateSale = () => {
    if (!newSale.customer || !newSale.product || !newSale.amount) {
      toast.error('Please fill all required fields')
      return
    }

    const newSaleObj = {
      id: sales.length + 1,
      customer: newSale.customer,
      product: newSale.product,
      amount: parseFloat(newSale.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      growth: '+0%'
    }

    setSales([newSaleObj, ...sales])
    setNewSale({ customer: '', product: '', amount: '', paymentMethod: 'credit_card' })
    setIsCreatingSale(false)
    
    toast.success('Sale created successfully!')
  }

  // Filtrar vendas
  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.product.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <Head>
        <title>Sales | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sales Management</h1>
              <p className="text-gray-600">Track, analyze and manage all your sales</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExport}
                className="btn-secondary flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button 
                onClick={() => setIsCreatingSale(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Sale
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.total.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-success-600 font-medium">+{stats.monthlyGrowth}%</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
                </div>
                <div className="p-3 bg-success-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Active Deals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeDeals}</p>
                </div>
                <div className="p-3 bg-warning-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-warning-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                </div>
                <div className="p-3 bg-secondary-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sales, customers, products..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select 
                  className="input-field"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select 
                  className="input-field"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last quarter</option>
                  <option value="365">This year</option>
                </select>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'More Filters'}
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Advanced Filters</h3>
                  <button 
                    onClick={handleClearFilters}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      placeholder="10000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select className="input-field">
                      <option value="all">All Methods</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleApplyFilters}
                    className="btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sales Table */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sales Records</h3>
                <p className="text-gray-600">Showing {filteredSales.length} of {sales.length} sales</p>
              </div>
              <div className="text-sm text-gray-500">
                Updated just now
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                            {sale.customer.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{sale.customer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{sale.product}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">${sale.amount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{sale.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sale.status === 'completed' ? 'bg-success-100 text-success-800' :
                          sale.status === 'pending' ? 'bg-warning-100 text-warning-800' :
                          'bg-danger-100 text-danger-800'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {sale.growth.startsWith('+') ? (
                            <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-danger-500 mr-1" />
                          )}
                          <span className={sale.growth.startsWith('+') ? 'text-success-600' : 'text-danger-600'}>
                            {sale.growth}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => toast.success(`Viewing sale ${sale.id}`)}
                            className="text-primary-600 hover:text-primary-800 text-sm"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => toast.success(`Editing sale ${sale.id}`)}
                            className="text-gray-600 hover:text-gray-800 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => {
                              setSales(sales.filter(s => s.id !== sale.id))
                              toast.success('Sale deleted')
                            }}
                            className="text-danger-600 hover:text-danger-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal para criar nova venda */}
        {isCreatingSale && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Sale</h3>
                <button 
                  onClick={() => setIsCreatingSale(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter customer name"
                    value={newSale.customer}
                    onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter product name"
                    value={newSale.product}
                    onChange={(e) => setNewSale({...newSale, product: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="0.00"
                    value={newSale.amount}
                    onChange={(e) => setNewSale({...newSale, amount: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select 
                    className="input-field"
                    value={newSale.paymentMethod}
                    onChange={(e) => setNewSale({...newSale, paymentMethod: e.target.value})}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setIsCreatingSale(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateSale}
                  className="btn-primary"
                >
                  Create Sale
                </button>
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  )
}
