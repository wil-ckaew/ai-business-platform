import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { 
  TrendingUp, Package, AlertTriangle, 
  BarChart3, Brain, Zap,
  Download, RefreshCw, Filter
} from 'lucide-react'

export default function AIInsightsPage() {
  const [predictions, setPredictions] = useState(null)
  const [optimizations, setOptimizations] = useState([])
  const [anomalies, setAnomalies] = useState([])
  const [loading, setLoading] = useState({})

  // Dados mock para evitar chamadas de API
  useEffect(() => {
    // Mock predictions
    const mockPredictions = {
      predictions: Array.from({ length: 30 }, (_, i) => ({
        ds: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
        yhat: 10000 + Math.random() * 5000,
        yhat_upper: 12000 + Math.random() * 5000,
        yhat_lower: 8000 + Math.random() * 5000
      }))
    }
    
    // Mock optimizations
    const mockOptimizations = [
      { sku: 'SKU001', current_stock: 150, optimal_stock: 100, estimated_savings: 1250, risk_level: 'high' },
      { sku: 'SKU002', current_stock: 80, optimal_stock: 120, estimated_savings: 800, risk_level: 'medium' },
      { sku: 'SKU003', current_stock: 200, optimal_stock: 150, estimated_savings: 1500, risk_level: 'low' },
      { sku: 'SKU004', current_stock: 50, optimal_stock: 75, estimated_savings: 500, risk_level: 'medium' },
      { sku: 'SKU005', current_stock: 300, optimal_stock: 200, estimated_savings: 2000, risk_level: 'high' }
    ]
    
    // Mock anomalies
    const mockAnomalies = [
      { id: 'TX001', amount: '$1,250.00', location: 'Online', risk_score: 0.85, timestamp: new Date().toISOString() },
      { id: 'TX002', amount: '$890.50', location: 'Store A', risk_score: 0.72, timestamp: new Date().toISOString() },
      { id: 'TX003', amount: '$2,450.00', location: 'International', risk_score: 0.91, timestamp: new Date().toISOString() },
      { id: 'TX004', amount: '$350.75', location: 'Online', risk_score: 0.65, timestamp: new Date().toISOString() },
      { id: 'TX005', amount: '$1,780.00', location: 'Store B', risk_score: 0.78, timestamp: new Date().toISOString() }
    ]

    setPredictions(mockPredictions)
    setOptimizations(mockOptimizations)
    setAnomalies(mockAnomalies)
  }, [])

  const fetchSalesPredictions = () => {
    setLoading(prev => ({...prev, sales: true}))
    setTimeout(() => {
      const mockPredictions = {
        predictions: Array.from({ length: 30 }, (_, i) => ({
          ds: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
          yhat: 10000 + Math.random() * 5000,
          yhat_upper: 12000 + Math.random() * 5000,
          yhat_lower: 8000 + Math.random() * 5000
        }))
      }
      setPredictions(mockPredictions)
      setLoading(prev => ({...prev, sales: false}))
    }, 1000)
  }

  const optimizeInventory = () => {
    setLoading(prev => ({...prev, inventory: true}))
    setTimeout(() => {
      const mockOptimizations = [
        { sku: 'SKU001', current_stock: 150, optimal_stock: 100, estimated_savings: 1250, risk_level: 'high' },
        { sku: 'SKU002', current_stock: 80, optimal_stock: 120, estimated_savings: 800, risk_level: 'medium' },
        { sku: 'SKU003', current_stock: 200, optimal_stock: 150, estimated_savings: 1500, risk_level: 'low' }
      ]
      setOptimizations(mockOptimizations)
      setLoading(prev => ({...prev, inventory: false}))
    }, 1000)
  }

  const detectAnomalies = () => {
    setLoading(prev => ({...prev, anomalies: true}))
    setTimeout(() => {
      const mockAnomalies = [
        { id: 'TX001', amount: '$1,250.00', location: 'Online', risk_score: 0.85, timestamp: new Date().toISOString() },
        { id: 'TX002', amount: '$890.50', location: 'Store A', risk_score: 0.72, timestamp: new Date().toISOString() }
      ]
      setAnomalies(mockAnomalies)
      setLoading(prev => ({...prev, anomalies: false}))
    }, 1000)
  }

  // Função para obter cor do risco
  const getRiskColor = (riskLevel) => {
    if (riskLevel === 'high') return 'bg-red-100 text-red-800'
    if (riskLevel === 'medium') return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER COM IA */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Business Intelligence</h1>
              <p className="opacity-90">Análise preditiva e otimização automática</p>
            </div>
            <Brain className="h-12 w-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 mr-3" />
                <div>
                  <p className="text-sm">Precisão das Previsões</p>
                  <p className="text-2xl font-bold">94.7%</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="flex items-center">
                <Package className="h-8 w-8 mr-3" />
                <div>
                  <p className="text-sm">Estoque Otimizado</p>
                  <p className="text-2xl font-bold">$12,540/mês</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 mr-3" />
                <div>
                  <p className="text-sm">Fraudes Detectadas</p>
                  <p className="text-2xl font-bold">3 esta semana</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OTIMIZAÇÃO DE ESTOQUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Otimização de Estoque (IA)</h3>
            <div className="space-y-4">
              {optimizations.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.sku}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Atual: {item.current_stock}</span>
                      <span>→</span>
                      <span className="font-semibold text-blue-600">
                        Ideal: {item.optimal_stock}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      +${item.estimated_savings.toFixed(2)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(item.risk_level)}`}>
                      Risco {item.risk_level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={optimizeInventory}
              disabled={loading.inventory}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Zap className={`h-4 w-4 mr-2 ${loading.inventory ? 'animate-spin' : ''}`} />
              {loading.inventory ? 'Processando...' : 'Executar Otimização Completa'}
            </button>
          </div>

          {/* DETECÇÃO DE ANOMALIAS */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Sistema de Auditoria (IA)</h3>
            <div className="space-y-3">
              {anomalies.slice(0, 5).map((anomaly, index) => (
                <div key={index} className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      <div>
                        <p className="font-medium">Transação #{anomaly.id}</p>
                        <p className="text-sm text-gray-600">
                          {anomaly.amount} • {anomaly.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-bold">
                        Risco: {(anomaly.risk_score * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(anomaly.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={detectAnomalies}
              disabled={loading.anomalies}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading.anomalies ? 'animate-spin' : ''}`} />
              {loading.anomalies ? 'Verificando...' : 'Verificar Novas Ameaças'}
            </button>
          </div>
        </div>

        {/* RELATÓRIOS AUTOMÁTICOS */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Relatórios Automáticos (IA)</h3>
              <p className="text-gray-600">Análises geradas automaticamente</p>
            </div>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
              <h4 className="font-semibold">Análise de Sazonalidade</h4>
              <p className="text-sm text-gray-600 mt-1">
                Padrões identificados: +3 esta semana
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <Package className="h-8 w-8 text-green-600 mb-2" />
              <h4 className="font-semibold">Oportunidades de Estoque</h4>
              <p className="text-sm text-gray-600 mt-1">
                12 produtos com excesso, 8 com falta
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <Filter className="h-8 w-8 text-purple-600 mb-2" />
              <h4 className="font-semibold">Recomendações Personalizadas</h4>
              <p className="text-sm text-gray-600 mt-1">
                Baseado no seu histórico de vendas
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
