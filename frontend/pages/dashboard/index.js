import { useState, useEffect } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { TrendingUp, Users, DollarSign, Package, BarChart3, Calendar, ArrowUp, ArrowDown, Activity, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from 'lucide-react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalRevenue: 125430,
      totalCustomers: 156,
      totalOrders: 892,
      inventoryValue: 84500
    },
    trends: {
      revenueChange: '+12.5%',
      customerChange: '+8.2%',
      orderChange: '+5.7%',
      inventoryChange: '-3.1%'
    }
  })

  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')

  // Revenue Chart Data
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 72000, 85000, 92000, 98000, 105000, 112000, 118000, 125000, 132000, 138000, 145000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // Sales by Category Data
  const categoryChartData = {
    labels: ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports', 'Other'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [45000, 32000, 28000, 15000, 12000, 8000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(156, 163, 175, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(239, 68, 68)',
          'rgb(156, 163, 175)'
        ],
        borderWidth: 1
      }
    ]
  }

  // Recent Activity
  const recentActivity = [
    { id: 1, action: 'New order placed', user: 'Sarah Miller', time: '5 minutes ago', amount: '$1,250', status: 'completed' },
    { id: 2, action: 'Customer registered', user: 'Michael Chen', time: '15 minutes ago', amount: '-', status: 'active' },
    { id: 3, action: 'Inventory updated', user: 'System', time: '30 minutes ago', amount: '45 items', status: 'info' },
    { id: 4, action: 'Payment processed', user: 'Emma Wilson', time: '2 hours ago', amount: '$890', status: 'completed' },
    { id: 5, action: 'Support ticket opened', user: 'David Brown', time: '4 hours ago', amount: 'Ticket #452', status: 'pending' }
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  const refreshDashboard = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Simulate data refresh
      setDashboardData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          totalRevenue: prev.overview.totalRevenue + Math.floor(Math.random() * 1000)
        }
      }))
    }, 1000)
  }

  useEffect(() => {
    refreshDashboard()
  }, [timeRange])

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-success-100 text-success-800'
      case 'active': return 'bg-primary-100 text-primary-800'
      case 'pending': return 'bg-warning-100 text-warning-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                className="input-field text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button 
                onClick={refreshDashboard}
                disabled={loading}
                className="btn-secondary flex items-center"
              >
                <Activity className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Revenue Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${dashboardData.overview.totalRevenue.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    {dashboardData.trends.revenueChange.startsWith('+') ? (
                      <ArrowUp className="h-4 w-4 text-success-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      dashboardData.trends.revenueChange.startsWith('+') ? 'text-success-600' : 'text-red-600'
                    }`}>
                      {dashboardData.trends.revenueChange}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>

            {/* Customers Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.overview.totalCustomers}</p>
                  <div className="flex items-center mt-1">
                    {dashboardData.trends.customerChange.startsWith('+') ? (
                      <ArrowUp className="h-4 w-4 text-success-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      dashboardData.trends.customerChange.startsWith('+') ? 'text-success-600' : 'text-red-600'
                    }`}>
                      {dashboardData.trends.customerChange}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.overview.totalOrders}</p>
                  <div className="flex items-center mt-1">
                    {dashboardData.trends.orderChange.startsWith('+') ? (
                      <ArrowUp className="h-4 w-4 text-success-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      dashboardData.trends.orderChange.startsWith('+') ? 'text-success-600' : 'text-red-600'
                    }`}>
                      {dashboardData.trends.orderChange}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Inventory Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inventory Value</p>
                  <p className="text-2xl font-bold text-gray-900">${dashboardData.overview.inventoryValue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    {dashboardData.trends.inventoryChange.startsWith('+') ? (
                      <ArrowUp className="h-4 w-4 text-success-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-success-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      dashboardData.trends.inventoryChange.startsWith('+') ? 'text-success-600' : 'text-success-600'
                    }`}>
                      {dashboardData.trends.inventoryChange}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                  <p className="text-gray-600">Monthly revenue growth</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-primary-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                </div>
              </div>
              <div className="h-80">
                <Line data={revenueChartData} options={chartOptions} />
              </div>
            </div>

            {/* Sales by Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
                  <p className="text-gray-600">Distribution across product categories</p>
                </div>
                <BarChart3 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="h-80">
                <Bar data={categoryChartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-gray-600">Latest actions in your platform</p>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      {activity.action.includes('order') && <DollarSign className="h-5 w-5 text-primary-600" />}
                      {activity.action.includes('Customer') && <Users className="h-5 w-5 text-success-600" />}
                      {activity.action.includes('Inventory') && <Package className="h-5 w-5 text-yellow-600" />}
                      {activity.action.includes('Payment') && <TrendingUpIcon className="h-5 w-5 text-purple-600" />}
                      {activity.action.includes('Support') && <Calendar className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        by {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.24%</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+0.5% this month</span>
                  </div>
                </div>
                <TrendingUpIcon className="h-8 w-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-success-500 to-success-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg. Order Value</p>
                  <p className="text-2xl font-bold">$142.50</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+$12.80 this month</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Customer Satisfaction</p>
                  <p className="text-2xl font-bold">4.8/5.0</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+0.2 this month</span>
                  </div>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
