import { useState, useEffect } from 'react'
import Head from 'next/head'
import DashboardLayout from '../components/layout/DashboardLayout'
import PageWrapper from '../components/layout/PageWrapper'
import { api } from '../lib/api'
import { CheckCircle, XCircle, RefreshCw, Server, AlertCircle } from 'lucide-react'

export default function ApiTestPage() {
  const [tests, setTests] = useState({})
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const results = {}

    try {
      // Teste de saúde
      const health = await api.getHealth()
      results.health = {
        success: true,
        message: 'API de saúde respondendo',
        data: health
      }
    } catch (err) {
      results.health = {
        success: false,
        message: 'Erro na API de saúde',
        error: err.message
      }
    }

    try {
      // Teste de dashboard
      const dashboard = await api.getDashboard()
      results.dashboard = {
        success: true,
        message: 'API de dashboard respondendo',
        data: dashboard
      }
    } catch (err) {
      results.dashboard = {
        success: false,
        message: 'Erro na API de dashboard',
        error: err.message
      }
    }

    try {
      // Teste de vendas
      const sales = await api.getSales()
      results.sales = {
        success: true,
        message: 'API de vendas respondendo',
        data: sales
      }
    } catch (err) {
      results.sales = {
        success: false,
        message: 'Erro na API de vendas',
        error: err.message
      }
    }

    try {
      // Teste de clientes
      const customers = await api.getCustomers()
      results.customers = {
        success: true,
        message: 'API de clientes respondendo',
        data: customers
      }
    } catch (err) {
      results.customers = {
        success: false,
        message: 'Erro na API de clientes',
        error: err.message
      }
    }

    try {
      // Teste de configurações
      const config = await api.getConfig()
      results.config = {
        success: true,
        message: 'API de configurações respondendo',
        data: config
      }
    } catch (err) {
      results.config = {
        success: false,
        message: 'Erro na API de configurações',
        error: err.message
      }
    }

    try {
      // Teste de insights de IA
      const insights = await api.getInsights()
      results.insights = {
        success: true,
        message: 'API de insights de IA respondendo',
        data: insights
      }
    } catch (err) {
      results.insights = {
        success: false,
        message: 'Erro na API de insights de IA',
        error: err.message
      }
    }

    try {
      // Teste de usuários
      const users = await api.getUsers()
      results.users = {
        success: true,
        message: 'API de usuários respondendo',
        data: users
      }
    } catch (err) {
      results.users = {
        success: false,
        message: 'Erro na API de usuários',
        error: err.message
      }
    }

    setTests(results)
    setLoading(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  return (
    <DashboardLayout>
      <Head>
        <title>API Test | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Server className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Teste de API</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Verifique a conexão com o backend Rust e teste todos os endpoints
              </p>
            </div>
          </div>

          {/* Info sobre o backend */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-300">Backend Rust funcionando!</h3>
                <p className="text-blue-800 dark:text-blue-400 text-sm mt-1">
                  O backend está rodando em <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">http://localhost:8080</code> e retornando dados em tempo real.
                  O frontend consome os dados através do proxy configurado no Next.js.
                </p>
                <div className="mt-4">
                  <button
                    onClick={runTests}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Testando...' : 'Executar Testes Novamente'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados dos testes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(tests).map(([key, test]) => (
              <div key={key} className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-700/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                    {key}
                  </h3>
                  {test.success ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                
                <p className={`text-sm mb-2 ${test.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {test.message}
                </p>

                {test.error && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Erro: {test.error}
                    </p>
                  </div>
                )}

                {test.data && (
                  <div className="mt-3">
                    <details>
                      <summary className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer">
                        Ver resposta completa
                      </summary>
                      <pre className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs overflow-auto">
                        {JSON.stringify(test.data, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(tests).length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Clique em "Executar Testes" para verificar a conexão com o backend
              </p>
            </div>
          )}
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
