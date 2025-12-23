import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react'

export default function StatsGrid({ stats }) {
  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      title: 'Total Sales',
      value: stats.totalSales.toLocaleString(),
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: '+5.7%',
      icon: Users,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
    },
    {
      title: 'Growth Rate',
      value: `${stats.growthRate}%`,
      change: '+2.4%',
      icon: TrendingUp,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-success-600 text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">from last month</span>
                </div>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
