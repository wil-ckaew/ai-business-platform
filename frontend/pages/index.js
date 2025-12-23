import { useState, useEffect } from 'react'
import Head from 'next/head'
import DashboardLayout from '../components/layout/DashboardLayout'
import StatsGrid from '../components/charts/StatsGrid'
import SalesChart from '../components/charts/SalesChart'
import RecentSalesTable from '../components/charts/RecentSalesTable'
import PredictionCard from '../components/charts/PredictionCard'
import { Activity, TrendingUp, Users, DollarSign, Download, Filter, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    activeUsers: 0,
    growthRate: 0,
  })

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    setLoading(true)
    setTimeout(() => {
      setStats({
        totalRevenue: 45231.89,
        totalSales: 2345,
        activeUsers: 578,
        growthRate: 12.5,
      })
      setLoading(false)
      setRefreshing(false)
    }, 800)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    toast.loading('Refreshing dashboard data...')
    setTimeout(() => {
      loadDashboardData()
      toast.success('Dashboard data refreshed!')
    }, 1000)
  }

  const handleExportDashboard = () => {
    toast.loading('Preparing dashboard export...')
    
    const exportData = [
      ['Dashboard Metrics Export', '', ''],
      ['Generated', new Date().toLocaleString(), ''],
      ['', '', ''],
      ['Metric', 'Value', 'Change'],
      ['Total Revenue', `$${stats.totalRevenue.toLocaleString()}`, '+12.5%'],
      ['Total Sales', stats.totalSales.toLocaleString(), '+8.2%'],
      ['Active Users', stats.activeUsers.toLocaleString(), '+5.7%'],
      ['Growth Rate', `${stats.growthRate}%`, '+2.4%'],
      ['', '', ''],
      ['AI Predictions', 'Next Quarter', '+15.2%'],
      ['Customer Satisfaction', 'Current', '94.2%'],
      ['Monthly Growth', 'Target', '10.0%']
    ]
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + exportData.map(row => row.join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `dashboard_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Dashboard exported successfully!')
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | AI Business Platform</title>
      </Head>

      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your business overview for today</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button 
              onClick={handleExportDashboard}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Dashboard
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sales Trend</h2>
                <p className="text-gray-600 text-sm">Monthly revenue vs sales</p>
              </div>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
              </select>
            </div>
            <div className="h-64 sm:h-72">
              <SalesChart />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">AI Predictions</h2>
                <p className="text-gray-600 text-sm">Revenue forecasts with 85% accuracy</p>
              </div>
              <span className="px-3 py-1 bg-success-100 text-success-800 text-sm font-medium rounded-full">
                85% Accuracy
              </span>
            </div>
            <PredictionCard />
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Sales</h2>
                <p className="text-gray-600 text-sm">Latest transactions and orders</p>
              </div>
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                View all sales →
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <RecentSalesTable />
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm">Active Products</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">42</p>
                <p className="text-primary-100 text-sm mt-2">+5 this month</p>
              </div>
              <Activity className="h-10 w-10 sm:h-12 sm:w-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-success-500 to-success-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-100 text-sm">Customer Satisfaction</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">94.2%</p>
                <p className="text-success-100 text-sm mt-2">+2.4% from last month</p>
              </div>
              <Users className="h-10 w-10 sm:h-12 sm:w-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-warning-500 to-warning-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-100 text-sm">Monthly Growth</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">+{stats.growthRate}%</p>
                <p className="text-warning-100 text-sm mt-2">Exceeding target by 7%</p>
              </div>
              <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 opacity-80" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => toast.success('Invoice creation started')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <DollarSign className="h-5 w-5 text-primary-600" />
              </div>
              <p className="font-medium text-gray-900">Create Invoice</p>
              <p className="text-sm text-gray-500 mt-1">Generate new invoice</p>
            </button>
            
            <button 
              onClick={() => toast.success('Customer form opened')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="h-10 w-10 bg-success-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="h-5 w-5 text-success-600" />
              </div>
              <p className="font-medium text-gray-900">Add Customer</p>
              <p className="text-sm text-gray-500 mt-1">Register new client</p>
            </button>
            
            <button 
              onClick={() => toast.success('Report generation started')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="h-10 w-10 bg-warning-100 rounded-lg flex items-center justify-center mb-3">
                <Activity className="h-5 w-5 text-warning-600" />
              </div>
              <p className="font-medium text-gray-900">Run Report</p>
              <p className="text-sm text-gray-500 mt-1">Generate analytics</p>
            </button>
            
            <button 
              onClick={() => toast.success('AI analysis initiated')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="h-10 w-10 bg-secondary-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="h-5 w-5 text-secondary-600" />
              </div>
              <p className="font-medium text-gray-900">AI Analysis</p>
              <p className="text-sm text-gray-500 mt-1">Get predictions</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
