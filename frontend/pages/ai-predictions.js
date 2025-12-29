import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../components/layout/DashboardLayout'
import PageWrapper from '../components/layout/PageWrapper'
import { api } from '../lib/api'
import { 
  Brain, TrendingUp, Package, Shield, BarChart, 
  Zap, AlertCircle, CheckCircle, Sparkles, Cpu
} from 'lucide-react'

export default function AIPredictionsPage() {
  const [activeTab, setActiveTab] = useState('sales')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState({})
  const [error, setError] = useState('')

  // Dados de exemplo
  const [salesData, setSalesData] = useState({
    data: [100, 200, 300, 400, 500]
  })

  const [inventoryData, setInventoryData] = useState({
    inventory_levels: [50, 60, 70, 80, 90],
    demand_forecast: [60, 65, 75, 85, 95]
  })

  const [fraudData, setFraudData] = useState({
    transaction_amount: 1500,
    user_history: [100, 200, 300, 400, 500],
    location: 'BR'
  })

  // Funções para chamar a API de IA
  const handlePredictSales = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await api.predictSales(salesData)
      setResults({ ...results, sales: result })
    } catch (err) {
      setError('Erro na previsão de vendas: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOptimizeInventory = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await api.optimizeInventory(inventoryData)
      setResults({ ...results, inventory: result })
    } catch (err) {
      setError('Erro na otimização de estoque: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDetectFraud = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await api.detectFraud(fraudData)
      setResults({ ...results, fraud: result })
    } catch (err) {
      setError('Erro na detecção de fraude: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGetInsights = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await api.getInsights()
      setResults({ ...results, insights: result })
    } catch (err) {
      setError('Erro ao obter insights: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>AI Predictions | AI Business Platform</title>
      </Head>

      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-4">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Predictions</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Inteligência Artificial para otimizar seu negócio
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Sales Predictions</p>
                  <p className="text-2xl font-bold mt-2">94%</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-3">Accuracy rate</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Fraud Detection</p>
                  <p className="text-2xl font-bold mt-2">99.2%</p>
                </div>
                <Shield className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-3">Success rate</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Cost Savings</p>
                  <p className="text-2xl font-bold mt-2">23%</p>
                </div>
                <Package className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-3">Inventory optimization</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">AI Models</p>
                  <p className="text-2xl font-bold mt-2">4</p>
                </div>
                <Cpu className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-3">Active models</p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - AI Tools */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-700/20 p-6">
                <div className="flex items-center mb-6">
                  <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Tools</h2>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                  <nav className="flex space-x-8">
                    {[
                      { id: 'sales', label: 'Sales Prediction', icon: TrendingUp },
                      { id: 'inventory', label: 'Inventory Optimization', icon: Package },
                      { id: 'fraud', label: 'Fraud Detection', icon: Shield },
                      { id: 'insights', label: 'AI Insights', icon: BarChart },
                    ].map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                            activeTab === tab.id
                              ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-2" />
                          {tab.label}
                        </button>
                      )
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'sales' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Prediction</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Prevenda vendas futuras baseadas em dados históricos usando machine learning.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Dados Históricos de Vendas
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={salesData.data.join(', ')}
                          onChange={(e) => setSalesData({
                            ...salesData,
                            data: e.target.value.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
                          })}
                          placeholder="100, 200, 300, 400, 500"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Insira números separados por vírgula
                        </p>
                      </div>
                      
                      <button
                        onClick={handlePredictSales}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processando...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Prever Vendas
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inventory Optimization</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Otimize seus níveis de estoque para minimizar custos e maximizar vendas.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Níveis Atuais de Estoque
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={inventoryData.inventory_levels.join(', ')}
                          onChange={(e) => setInventoryData({
                            ...inventoryData,
                            inventory_levels: e.target.value.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
                          })}
                          placeholder="50, 60, 70, 80, 90"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Previsão de Demanda
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={inventoryData.demand_forecast.join(', ')}
                          onChange={(e) => setInventoryData({
                            ...inventoryData,
                            demand_forecast: e.target.value.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
                          })}
                          placeholder="60, 65, 75, 85, 95"
                        />
                      </div>
                      
                      <button
                        onClick={handleOptimizeInventory}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processando...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Otimizar Estoque
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'fraud' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fraud Detection</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Detecte transações fraudulentas em tempo real usando algoritmos de IA.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Valor da Transação ($)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={fraudData.transaction_amount}
                          onChange={(e) => setFraudData({
                            ...fraudData,
                            transaction_amount: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Histórico do Usuário
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={fraudData.user_history.join(', ')}
                          onChange={(e) => setFraudData({
                            ...fraudData,
                            user_history: e.target.value.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
                          })}
                          placeholder="100, 200, 300, 400, 500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Localização
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={fraudData.location}
                          onChange={(e) => setFraudData({
                            ...fraudData,
                            location: e.target.value
                          })}
                          placeholder="BR, US, etc."
                        />
                      </div>
                      
                      <button
                        onClick={handleDetectFraud}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 disabled:opacity-50 flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processando...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Detectar Fraude
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'insights' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Obtenha insights valiosos sobre seu negócio gerados por IA.
                    </p>
                    
                    <button
                      onClick={handleGetInsights}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processando...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Gerar Insights
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Results */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-700/20 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resultados da IA</h3>
                
                {loading && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Processando com IA...</p>
                  </div>
                )}

                {!loading && results.sales && activeTab === 'sales' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Previsão Concluída</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">IA analisou seus dados</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Próxima Previsão</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${results.sales.prediction?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Nível de Confiança</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${(results.sales.confidence || 0) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {((results.sales.confidence || 0) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}

                {!loading && results.inventory && activeTab === 'inventory' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center">
                        <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Otimização Concluída</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">IA otimizou seu estoque</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Quantidade Sugerida</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {results.inventory.suggested_order?.map((qty, idx) => (
                          <span key={idx} className="mr-2 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                            {qty.toFixed(0)}
                          </span>
                        ))}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Custo Estimado</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${results.inventory.estimated_cost?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                )}

                {!loading && results.fraud && activeTab === 'fraud' && (
                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg border ${
                      results.fraud.is_fraud 
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                        : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    }`}>
                      <div className="flex items-center">
                        {results.fraud.is_fraud ? (
                          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3" />
                        ) : (
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {results.fraud.is_fraud ? '⚠️ Fraude Detectada' : '✅ Transação Segura'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {results.fraud.is_fraud 
                              ? 'Transação suspeita detectada' 
                              : 'Transação dentro dos padrões normais'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Score de Risco</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            (results.fraud.risk_score || 0) > 0.7 
                              ? 'bg-red-600' 
                              : (results.fraud.risk_score || 0) > 0.4 
                              ? 'bg-yellow-600' 
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${(results.fraud.risk_score || 0) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {((results.fraud.risk_score || 0) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}

                {!loading && results.insights && activeTab === 'insights' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center">
                        <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Insights Gerados</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">IA analisou seus dados</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {results.insights.insights?.map((insight, index) => (
                        <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                          <h5 className="font-medium text-gray-900 dark:text-white">{insight.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{insight.description}</p>
                          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                            insight.impact === 'high' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : insight.impact === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            Impacto {insight.impact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!loading && !results[activeTab] && (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Execute uma análise de IA para ver os resultados aqui
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
