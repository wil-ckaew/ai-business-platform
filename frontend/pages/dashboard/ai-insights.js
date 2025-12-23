// frontend/pages/dashboard/ai-insights.js
import { useState, useEffect } from 'react';
import { 
  TrendingUp, Package, AlertTriangle, 
  BarChart3, Brain, Zap,
  Download, RefreshCw, Filter
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

export default function AIInsightsPage() {
  const [predictions, setPredictions] = useState(null);
  const [optimizations, setOptimizations] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState({});

  // 1. PREVISÃO DE VENDAS COM IA
  const fetchSalesPredictions = async () => {
    setLoading(prev => ({...prev, sales: true}));
    
    const response = await fetch('/api/v1/predict/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        period: '30d',
        confidence_level: 0.95,
        products: ['all']
      })
    });
    
    const data = await response.json();
    setPredictions(data);
    setLoading(prev => ({...prev, sales: false}));
  };

  // 2. OTIMIZAÇÃO DE ESTOQUE
  const optimizeInventory = async () => {
    setLoading(prev => ({...prev, inventory: true}));
    
    const response = await fetch('/api/v1/optimize/inventory', {
      method: 'POST'
    });
    
    const data = await response.json();
    setOptimizations(data.optimizations);
    setLoading(prev => ({...prev, inventory: false}));
  };

  // 3. DETECÇÃO DE ANOMALIAS
  const detectAnomalies = async () => {
    setLoading(prev => ({...prev, anomalies: true}));
    
    const response = await fetch('/api/v1/audit/transactions', {
      method: 'POST'
    });
    
    const data = await response.json();
    setAnomalies(data.anomalies);
    setLoading(prev => ({...prev, anomalies: false}));
  };

  useEffect(() => {
    fetchSalesPredictions();
    optimizeInventory();
    detectAnomalies();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER COM IA */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
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

      {/* GRÁFICO DE PREVISÃO */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Previsão de Vendas (IA)</h3>
            <p className="text-gray-600">Próximos 30 dias com intervalo de confiança</p>
          </div>
          <button
            onClick={fetchSalesPredictions}
            disabled={loading.sales}
            className="btn-primary"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading.sales ? 'animate-spin' : ''}`} />
            Atualizar Previsões
          </button>
        </div>
        
        {predictions && (
          <div className="h-96">
            <Line
              data={{
                labels: predictions.predictions.map(p => new Date(p.ds).toLocaleDateString()),
                datasets: [
                  {
                    label: 'Previsão IA',
                    data: predictions.predictions.map(p => p.yhat),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true
                  },
                  {
                    label: 'Limite Superior (95%)',
                    data: predictions.predictions.map(p => p.yhat_upper),
                    borderColor: '#10b981',
                    borderDash: [5, 5],
                    fill: false
                  },
                  {
                    label: 'Limite Inferior (95%)',
                    data: predictions.predictions.map(p => p.yhat_lower),
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
                    mode: 'index',
                    intersect: false
                  }
                }
              }}
            />
          </div>
        )}
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
                    <span className="font-semibold text-primary-600">
                      Ideal: {item.optimal_stock}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success-600">
                    +${item.estimated_savings.toFixed(2)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.risk_level === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : item.risk_level === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    Risco {item.risk_level}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={optimizeInventory}
            disabled={loading.inventory}
            className="btn-secondary w-full mt-4"
          >
            <Zap className="h-4 w-4 mr-2" />
            Executar Otimização Completa
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
            className="btn-secondary w-full mt-4"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading.anomalies ? 'animate-spin' : ''}`} />
            Verificar Novas Ameaças
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
          <button className="btn-primary">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <BarChart3 className="h-8 w-8 text-primary-600 mb-2" />
            <h4 className="font-semibold">Análise de Sazonalidade</h4>
            <p className="text-sm text-gray-600 mt-1">
              Padrões identificados: +3 esta semana
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <Package className="h-8 w-8 text-success-600 mb-2" />
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
  );
}