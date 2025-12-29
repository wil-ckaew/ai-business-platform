import { useState, useEffect } from 'react'
import Head from 'next/head'
import DashboardLayout from '../components/layout/DashboardLayout'
import PageWrapper from '../components/layout/PageWrapper'
import { api } from '../lib/api'
import { 
  TrendingUp, Users, DollarSign, Package,
  Activity, ShoppingCart, CreditCard, Star,
  AlertCircle
} from 'lucide-react'

export default function HomePage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const data = await api.getDashboard()
      setDashboardData(data)
    } catch (err) {
      console.error('Erro ao carregar dashboard:', err)
      setError('Erro ao carregar dados do dashboard')
      
      // Dados de fallback
      setDashboardData({
        stats: {
          totalRevenue: 125430.50,
          totalSales: 2345,
          activeCustomers: 1567,
          conversionRate: 3.2,
          monthlyGrowth: 12.5,
          inventoryValue: 78900.75,
          pendingOrders: 45,
          customerSatisfaction: 4.5
        },
        recentSales: [
          { id: 1, customer: 'João Silva', amount: 1250.00, date: '2024-01-15', status: 'completed' },
          { id: 2, customer: 'Maria Santos', amount: 890.50, date: '2024-01-15', status: 'pending' },
          { id: 3, customer: 'Pedro Costa', amount: 2345.75, date: '2024-01-14', status: 'completed' },
          { id: 4, customer: 'Ana Oliveira', amount: 567.25, date: '2024-01-14', status: 'completed' },
          { id: 5, customer: 'Carlos Mendes', amount: 1234.00, date: '2024-01-13', status: 'shipped' },
        ],
        topProducts: [
          { id: 1, name: 'Produto A', sales: 245, revenue: 24500.00 },
          { id: 2, name: 'Produto B', sales: 189, revenue: 18900.00 },
          { id: 3, name: 'Produto C', sales: 156, revenue: 15600.00 },
          { id: 4, name: 'Produto D', sales: 134, revenue: 13400.00 },
          { id: 5, name: 'Produto E', sales: 98, revenue: 9800.00 },
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const stats = dashboardData?.stats || {}

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard - AI Business Platform</title>
      </Head>

      <PageWrapper>
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Visão geral do seu negócio em tempo real
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
              <div>
                <p className="text-yellow-700 dark:text-yellow-300">{error}</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  Mostrando dados de demonstração
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow dark:shadow-gray-700/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  ${stats.totalRevenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">
                +{stats.monthlyGrowth || 0}% este mês
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow dark:shadow-gray-700/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total de Vendas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.totalSales?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow dark:shadow-gray-700/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clientes Ativos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.activeCustomers?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow dark:shadow-gray-700/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.conversionRate || 0}%
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Activity className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vendas Recentes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-700/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vendas Recentes</h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Ver todas
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData?.recentSales?.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{sale.customer}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{sale.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${sale.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      sale.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {sale.status === 'completed' ? 'Concluído' : 
                       sale.status === 'pending' ? 'Pendente' : 'Enviado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Produtos Mais Vendidos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-700/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Produtos Mais Vendidos</h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Ver todos
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData?.topProducts?.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.sales} vendas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receita</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mais estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow dark:shadow-gray-700/20">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-4">
                <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Valor do Estoque</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  ${stats.inventoryValue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow dark:shadow-gray-700/20">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg mr-4">
                <CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pedidos Pendentes</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.pendingOrders || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow dark:shadow-gray-700/20">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-4">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Satisfação do Cliente</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.customerSatisfaction || 0}/5
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
