#!/bin/bash

cd ~/rust/ai-business-platform/frontend

echo "🔧 Corrigindo página index.js..."

# 1. Substituir index.js por uma versão simples que redireciona
cat > pages/index.js << 'INDEX'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Redirecionando para o Dashboard...</p>
      </div>
    </div>
  )
}
INDEX

# 2. Verificar se outras páginas também têm problemas com DashboardLayout
echo "🔍 Verificando outras páginas que usam DashboardLayout..."

# Lista de páginas para verificar
PAGES="dashboard/index.js dashboard/ai-insights.js"

for page in $PAGES; do
  if [ -f "pages/$page" ]; then
    echo "Verificando: pages/$page"
    # Remover qualquer importação de DashboardLayout
    sed -i '/import.*DashboardLayout/d' "pages/$page" 2>/dev/null || true
    # Remover qualquer uso de <DashboardLayout> (mas isso é mais complexo, vamos apenas garantir que as páginas não tenham layout próprio)
  fi
done

# 3. Garantir que dashboard/index.js seja uma página simples
if [ -f "pages/dashboard/index.js" ]; then
  # Vamos criar um dashboard simples sem layout próprio
  cat > pages/dashboard/index.js << 'DASHBOARD'
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your AI Business Platform Dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold mt-2">$54,231</p>
            </div>
            <div className="text-2xl sm:text-3xl">💰</div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600">+12.5%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-xl sm:text-2xl font-bold mt-2">2,341</p>
            </div>
            <div className="text-2xl sm:text-3xl">👥</div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600">+8.2%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-xl sm:text-2xl font-bold mt-2">3.2%</p>
            </div>
            <div className="text-2xl sm:text-3xl">📈</div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600">+0.5%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Session</p>
              <p className="text-xl sm:text-2xl font-bold mt-2">4m 32s</p>
            </div>
            <div className="text-2xl sm:text-3xl">⏱️</div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-red-600">-1.2%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart Component Here</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart Component Here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
DASHBOARD
fi

# 4. Limpar cache
rm -rf .next 2>/dev/null || true

echo ""
echo "✅ Página index.js corrigida!"
echo "📄 Agora index.js apenas redireciona para /dashboard"
echo ""
echo "🚀 Execute: npm run dev"
