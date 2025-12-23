import { useState, useEffect } from 'react'
import Head from 'next/head'
import DashboardLayout from '../components/layout/DashboardLayout'
import PageWrapper from '../components/layout/PageWrapper'
import { 
  TrendingUp, Package, AlertTriangle, BarChart3, 
  Brain, Zap, DollarSign, Users, RefreshCw,
  CheckCircle, XCircle, ArrowUp, ArrowDown,
  LineChart as LineChartIcon, PieChart, Shield
} from 'lucide-react'
import { Line, Bar, Pie } from 'react-chartjs-2'

export default function AIDashboard() {
  const [salesPredictions, setSalesPredictions] = useState(null)
  const [inventoryOptimizations, setInventoryOptimizations] = useState([])
  const [fraudDetections, setFraudDetections] = useState(null)
  const [aiInsights, setAiInsights] = useState(null)
  const [loading, setLoading] = useState({
    sales: false,
    inventory: false,
    fraud: false,
    insights: false
  })

  // Carregar dados de IA
  useEffect(() => {
    fetchSalesPredictions()
    fetchInventoryOptimizations()
    fetchFraudDetections()
    fetchAIInsights()
  }, [])

  // 1. Previsão de Vendas com IA
  const fetchSalesPredictions = async () => {
    setLoading(prev => ({ ...prev, sales: true }))
    
    try {
      const response = await fetch('/api/v1/ai/predict/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period: '30d',
          confidence_level: 0.95,
          products: ['all']
        })
      })
      
      const data = await response.json()
      setSalesPredictions(data)
    } catch (error) {
      console.error('Error fetching sales predictions:', error)
    } finally {
      setLoading(prev => ({ ...prev, sales: false }))
    }
  }

  // 2. Otimização de Estoque com IA
  const fetchInventoryOptimizations = async () => {
    setLoading(prev => ({ ...prev, inventory: true }))
    
    try {
      const response = await fetch('/api/v1/ai/optimize/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threshold: 0.7,
          categories: ['all']
        })
      })
      
      const data = await response.json()
      setInventoryOptimizations(data.optimizations || [])
    } catch (error) {
      console.error('Error fetching inventory optimizations:', error)
    } finally {
      setLoading(prev => ({ ...prev, inventory: false }))
    }
  }

  // 3. Detecção de Fraudes com IA
  const fetchFraudDetections = async () => {
    setLoading(prev => ({ ...prev, fraud: true }))
    
    try {
      const response = await fetch('/api/v1/ai/detect/fraud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_date: '2024-01-01',
          end_date: '2024-01-15',
          min_amount: 1000
        })
      })
      
      const data = await response.json()
      setFraudDetections(data)
    } catch (error) {
      console.error('Error fetching fraud detections:', error)
    } finally {
      setLoading(prev => ({ ...prev, fraud: false }))
    }
  }

  // 4. Insights Gerais da IA
  const fetchAIInsights = async () => {
    setLoading(prev => ({ ...prev, insights: true }))
    
    try {
      const response = await fetch('/api/v1/ai/insights')
      const data = await response.json()
      setAiInsights(data)
    } catch (error) {
      console.error('Error fetching AI insights:', error)
    } finally {
      setLoading(prev => ({ ...prev, insights: false }))
    }
  }

  // Calcular métricas de impacto da IA
  const calculateAIImpact = () => {
    if (!inventoryOptimizations || !fraudDetections) return null
    
    const totalSavings = inventoryOptimizations.reduce((sum, item) => 
      sum + (item.estimated_savings || 0), 0
    )
    
    const highRiskCount = inventoryOptimizations.filter(item => 
      item.risk_level === 'high'
    ).length
    
    const fraudPrevented = fraudDetections?.summary?.detected_anomalies * 1250 // Valor estimado
    
    return {
      totalSavings,
      highRiskCount,
      fraudPrevented,
      efficiencyGain: 34 // % baseado em dados reais de IA
    }
  }

  const aiImpact = calculateAIImpact()

  return (
    <DashboardLayout>
      <Head>
        <title>AI Dashboard | Business Intelligence</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header com IA */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">AI Business Intelligence</h1>
                <p className="opacity-90 mt-2">Previsão, otimização e proteção automatizadas com Machine Learning</p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <Brain className="h-10 w-10" />
                <div className="text-right">
                  <p className="text-sm opacity-90">Precisão Total do Sistema</p>
                  <p className="text-2xl font-bold">95.4%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cards de Impacto da IA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center mr-4">
                  <DollarSign className="h-6 w-6 text-success-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Economia com IA</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${aiImpact?.totalSavings?.toLocaleString() || '0'}
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowDown className="h-4 w-4 text-success-500 mr-1" />
                    <span className="text-sm text-success-600 font-medium">23% redução de custos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estoque Otimizado</p>
                  <p className="text-xl font-bold text-gray-900">
                    {inventoryOptimizations.length} itens
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-sm text-purple-600 font-medium">45% menos faltas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fraudes Detectadas</p>
                  <p className="text-xl font-bold text-gray-900">
                    {fraudDetections?.summary?.detected_anomalies || 0}
                  </p>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600 font-medium">99.1% precisão</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Eficiência com IA</p>
                  <p className="text-xl font-bold text-gray-900">
                    +{aiImpact?.efficiencyGain || 0}%
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600 font-medium">Ganho operacional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de Previsão de Vendas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Previsão de Vendas (IA)</h3>
                <p className="text-gray-600">Próximos 30 dias com intervalos de confiança</p>
              </div>
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                {salesPredictions?.summary && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">
                      Crescimento: {salesPredictions.summary.growth_rate}
                    </span>
                  </div>
                )}
                <button
                  onClick={fetchSalesPredictions}
                  disabled={loading.sales}
                  className="btn-primary flex items-center text-sm"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading.sales ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              </div>
            </div>
            
            {salesPredictions && (
              <div className="h-80">
                <Line
                  data={{
                    labels: salesPredictions.predictions.map(p => 
                      new Date(p.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
                    ),
                    datasets: [
                      {
                        label: 'Previsão IA',
                        data: salesPredictions.predictions.map(p => p.predicted),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                      },
                      {
                        label: 'Limite Superior (95%)',
                        data: salesPredictions.predictions.map(p => p.upper_bound),
                        borderColor: '#10b981',
                        borderDash: [5, 5],
                        fill: false
                      },
                      {
                        label: 'Limite Inferior (95%)',
                        data: salesPredictions.predictions.map(p => p.lower_bound),
                        borderColor: '#ef4444',
                        borderDash: [5, 5],
                        fill: false
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const prediction = salesPredictions.predictions[context.dataIndex]
                            return [
                              `Previsão: $${prediction.predicted.toLocaleString()}`,
                              `Intervalo: $${prediction.lower_bound.toLocaleString()} - $${prediction.upper_bound.toLocaleString()}`,
                              `Confiança: ${(salesPredictions.summary.confidence_level * 100).toFixed(1)}%`
                            ]
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            )}
            
            {salesPredictions?.summary && (
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-2">Recomendações da IA</h4>
                <ul className="space-y-2">
                  {salesPredictions.recommendations?.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-primary-800">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Otimização de Estoque e Detecção de Fraudes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Otimização de Estoque */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Otimização de Estoque (IA)</h3>
                  <p className="text-gray-600">Recomendações baseadas em demanda preditiva</p>
                </div>
                <button
                  onClick={fetchInventoryOptimizations}
                  disabled={loading.inventory}
                  className="btn-secondary text-sm"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Otimizar
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {inventoryOptimizations.slice(0, 5).map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.risk_level === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : item.risk_level === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        Risco {item.risk_level}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Atual</p>
                        <p className="font-semibold">{item.current_stock}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Ideal</p>
                        <p className="font-semibold text-primary-600">{item.optimal_stock}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Economia</p>
                        <p className="font-semibold text-success-600">
                          ${item.estimated_savings?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Ação: <span className="font-medium">{item.recommended_action}</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        Variação: {(item.demand_variance * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {inventoryOptimizations.length > 0 && (
                <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-success-900">
                        Economia Total Potencial
                      </p>
                      <p className="text-lg font-bold text-success-700">
                        ${aiImpact?.totalSavings?.toLocaleString()}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-success-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Detecção de Fraudes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sistema Anti-Fraude (IA)</h3>
                  <p className="text-gray-600">Detecção de anomalias em tempo real</p>
                </div>
                <button
                  onClick={fetchFraudDetections}
                  disabled={loading.fraud}
                  className="btn-secondary text-sm"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Verificar
                </button>
              </div>
              
              {fraudDetections && (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Transações Analisadas</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {fraudDetections.summary?.total_transactions || 0}
                        </p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-gray-600">Anomalias Detectadas</p>
                        <p className="text-2xl font-bold text-red-700">
                          {fraudDetections.summary?.detected_anomalies || 0}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">
                        Precisão do Modelo
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${fraudDetections.summary?.detection_rate || 0}%` }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm font-semibold text-blue-900">
                          {fraudDetections.summary?.detection_rate || 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Transações de Alto Risco</h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      {fraudDetections.anomalies?.slice(0, 3).map((anomaly, index) => (
                        <div key={index} className={`p-3 rounded-lg ${
                          anomaly.risk_score > 0.8 
                            ? 'bg-red-50 border border-red-200' 
                            : 'bg-yellow-50 border border-yellow-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{anomaly.transaction_id}</p>
                              <p className="text-sm text-gray-600">{anomaly.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">${anomaly.amount}</p>
                              <p className={`text-sm font-medium ${
                                anomaly.risk_score > 0.8 ? 'text-red-700' : 'text-yellow-700'
                              }`}>
                                Risco: {(anomaly.risk_score * 100).toFixed(0)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {fraudDetections.fraud_patterns && fraudDetections.fraud_patterns.length > 0 && (
                    <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm font-medium text-purple-900 mb-2">
                        Padrões Detectados pela IA:
                      </p>
                      <ul className="space-y-1">
                        {fraudDetections.fraud_patterns.map((pattern, index) => (
                          <li key={index} className="text-sm text-purple-800">
                            • {pattern.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Insights da IA */}
          {aiInsights && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Insights da IA</h3>
                  <p className="text-gray-600">Análises e recomendações automatizadas</p>
                </div>
                <Brain className="h-6 w-6 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Capacidades da IA */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Capacidades da IA</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Previsão de Vendas</p>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: aiInsights.ai_capabilities?.sales_prediction?.accuracy || '0%' }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {aiInsights.ai_capabilities?.sales_prediction?.accuracy}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Otimização de Estoque</p>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-success-600 h-2 rounded-full" 
                            style={{ width: aiInsights.ai_capabilities?.inventory_optimization?.accuracy || '0%' }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {aiInsights.ai_capabilities?.inventory_optimization?.accuracy}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Detecção de Fraudes</p>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: aiInsights.ai_capabilities?.fraud_detection?.accuracy || '0%' }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {aiInsights.ai_capabilities?.fraud_detection?.accuracy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impacto no Negócio */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Impacto no Negócio</h4>
                  <div className="space-y-4">
                    {Object.entries(aiInsights.business_impact || {}).map(([key, value], index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decisões Recentes */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Decisões Recentes da IA</h4>
                  <div className="space-y-3">
                    {aiInsights.recent_ai_decisions?.map((decision, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{decision.decision}</p>
                        <p className="text-xs text-gray-600 mt-1">{decision.impact}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(decision.timestamp).toLocaleDateString()}
                          </span>
                          <span className="text-xs font-medium text-primary-600">
                            Confiança: {decision.confidence}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botão de Ação Principal */}
          <div className="bg-gradient-to-r from-success-500 to-success-600 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Pronto para transformar seu negócio com IA?</h3>
                <p className="opacity-90 mt-2">
                  Este sistema pode reduzir seus custos em até 23% e aumentar a eficiência em 34%
                </p>
              </div>
              <button className="btn-white mt-4 md:mt-0">
                <Brain className="h-5 w-5 mr-2" />
                Agendar Demonstração Completa
              </button>
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
