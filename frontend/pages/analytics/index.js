import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { BarChart3, PieChart, LineChart, TrendingUp, Users, DollarSign, ShoppingCart, Download, RefreshCw, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const metrics = [
    { label: 'Total Revenue', value: '$45,231', change: '+12.5%', icon: DollarSign, color: 'text-success-600', bgColor: 'bg-success-50' },
    { label: 'Total Sales', value: '2,345', change: '+8.2%', icon: ShoppingCart, color: 'text-primary-600', bgColor: 'bg-primary-50' },
    { label: 'Active Users', value: '578', change: '+5.7%', icon: Users, color: 'text-warning-600', bgColor: 'bg-warning-50' },
    { label: 'Growth Rate', value: '12.5%', change: '+2.4%', icon: TrendingUp, color: 'text-secondary-600', bgColor: 'bg-secondary-50' },
  ]

  const handleExport = () => {
    toast.loading('Exporting analytics data...')
    
    // Dados para exportação
    const exportData = [
      ['Analytics Dashboard Export', '', ''],
      ['Generated', new Date().toLocaleString(), ''],
      ['Time Range', timeRange === 'month' ? 'Last 30 days' : 
                    timeRange === 'week' ? 'Last 7 days' :
                    timeRange === 'quarter' ? 'Last quarter' : 'This year', ''],
      ['', '', ''],
      ['Metric', 'Value', 'Change'],
      ['Total Revenue', '$45,231', '+12.5%'],
      ['Total Sales', '2,345', '+8.2%'],
      ['Active Users', '578', '+5.7%'],
      ['Growth Rate', '12.5%', '+2.4%'],
      ['', '', ''],
      ['Revenue Trend', 'Upward', '15% monthly'],
      ['User Growth', 'Positive', '8% weekly'],
      ['Conversion Rate', '34.2%', 'Stable']
    ]
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + exportData.map(row => row.join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `analytics_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Analytics data exported successfully!')
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    toast.loading('Refreshing analytics data...')
    
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('Analytics data refreshed!')
    }, 1500)
  }

  const handleApplyFilters = () => {
    toast.success('Filters applied to analytics')
    setShowFilters(false)
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Analytics | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Advanced insights and data visualization</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="btn-secondary flex items-center disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button 
                onClick={handleExport}
                className="btn-primary flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Analytics
              </button>
            </div>
          </div>

          {/* Time Range and Filters */}
          <div className="card">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="input-field"
                >
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                  <option value="quarter">Last quarter</option>
                  <option value="year">This year</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Advanced Filters</h3>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Metric Type
                    </label>
                    <select className="input-field">
                      <option value="all">All Metrics</option>
                      <option value="revenue">Revenue Only</option>
                      <option value="users">User Metrics</option>
                      <option value="sales">Sales Metrics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chart Type
                    </label>
                    <select className="input-field">
                      <option value="all">All Charts</option>
                      <option value="line">Line Charts</option>
                      <option value="bar">Bar Charts</option>
                      <option value="pie">Pie Charts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Source
                    </label>
                    <select className="input-field">
                      <option value="all">All Sources</option>
                      <option value="sales">Sales Data</option>
                      <option value="users">User Data</option>
                      <option value="external">External APIs</option>
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

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.label} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-success-600 text-sm font-medium">
                          {metric.change}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">from last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                  <p className="text-gray-600">Monthly revenue performance</p>
                </div>
                <BarChart3 className="h-6 w-6 text-primary-600" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Chart visualization</div>
                  <div className="text-sm text-gray-500">Interactive chart would appear here</div>
                </div>
              </div>
            </div>

            {/* User Growth Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                  <p className="text-gray-600">New users acquisition</p>
                </div>
                <LineChart className="h-6 w-6 text-success-600" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Chart visualization</div>
                  <div className="text-sm text-gray-500">Interactive chart would appear here</div>
                </div>
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Market Distribution</h3>
                  <p className="text-gray-600">Product category distribution</p>
                </div>
                <PieChart className="h-6 w-6 text-warning-600" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Chart visualization</div>
                  <div className="text-sm text-gray-500">Interactive chart would appear here</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                  <p className="text-gray-600">Key performance indicators</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Customer Satisfaction', value: 94, color: 'bg-success-500' },
                  { label: 'Conversion Rate', value: 34, color: 'bg-primary-500' },
                  { label: 'Retention Rate', value: 88, color: 'bg-warning-500' },
                  { label: 'Growth Rate', value: 75, color: 'bg-secondary-500' },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{metric.label}</span>
                      <span className="font-medium text-gray-900">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${metric.color} rounded-full`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                <p className="text-gray-600">Actionable insights from AI analysis</p>
              </div>
              <div className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                AI Generated
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Revenue Prediction',
                  description: 'Expected 15% growth in Q2 based on current trends',
                  action: 'Review forecast',
                  color: 'border-l-4 border-success-500'
                },
                {
                  title: 'Customer Trend',
                  description: 'New user acquisition increased by 22% this month',
                  action: 'View details',
                  color: 'border-l-4 border-primary-500'
                },
                {
                  title: 'Market Opportunity',
                  description: 'Untapped potential in European market identified',
                  action: 'Explore market',
                  color: 'border-l-4 border-warning-500'
                },
              ].map((insight) => (
                <div key={insight.title} className={`bg-gray-50 p-4 rounded-lg ${insight.color}`}>
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-gray-600 text-sm mt-2">{insight.description}</p>
                  <button 
                    onClick={() => toast.success(`Action: ${insight.action}`)}
                    className="mt-4 text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    {insight.action} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
