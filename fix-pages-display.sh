#!/bin/bash

echo "🔍 Verificando por que as páginas não estão sendo exibidas..."

cd ~/rust/ai-business-platform/frontend

# 1. Primeiro, verificar a estrutura atual
echo "📁 Estrutura atual de páginas:"
find pages -name "*.js" -o -name "*.jsx" | sort

# 2. Verificar se as páginas têm conteúdo
echo ""
echo "📄 Verificando conteúdo das páginas principais:"

# Verificar dashboard
if [ -f "pages/dashboard/index.js" ]; then
  echo "✅ pages/dashboard/index.js existe"
  echo "   Primeiras linhas:"
  head -20 "pages/dashboard/index.js"
else
  echo "❌ pages/dashboard/index.js NÃO existe"
fi

echo ""

# 3. Verificar se o _app.js está correto
echo "📄 Verificando _app.js:"
cat pages/_app.js

echo ""

# 4. Verificar se o DashboardLayout está passando children
echo "📄 Verificando DashboardLayout.js:"
cat components/layout/DashboardLayout.js

echo ""

# 5. Criar uma página de teste simples para verificar
cat > pages/test-page.js << 'TEST'
export default function TestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">TEST PAGE - Se você vê isso, funciona!</h1>
      <p className="mt-4">Esta é uma página de teste para verificar se o roteamento está funcionando.</p>
      <div className="mt-4 p-4 bg-blue-100 rounded">
        <p>Se esta página aparecer, o problema está no conteúdo das outras páginas.</p>
      </div>
    </div>
  )
}
TEST

echo ""

# 6. Criar uma versão SIMPLES do dashboard para teste
cat > pages/dashboard/index-simple.js << 'DASHBOARD'
export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600">DASHBOARD SIMPLES - FUNCIONA!</h1>
      <p className="mt-4 text-lg">Se você vê esta página, o dashboard está funcionando.</p>
      <div className="mt-6 p-4 bg-yellow-100 rounded">
        <h2 className="font-bold">Informações:</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>Página: Dashboard</li>
          <li>Data: $(date)</li>
          <li>Status: ✅ Funcionando</li>
        </ul>
      </div>
    </div>
  )
}
DASHBOARD

# 7. Verificar se temos um index.js no dashboard
if [ ! -f "pages/dashboard/index.js" ]; then
  echo "⚠️  Criando pages/dashboard/index.js básico..."
  cp pages/dashboard/index-simple.js pages/dashboard/index.js
fi

# 8. Criar páginas básicas para teste
for page in analytics customers sales predictions notifications reports settings support security; do
  if [ -d "pages/$page" ] && [ ! -f "pages/$page/index.js" ]; then
    cat > "pages/$page/index.js" << CONTENT
export default function ${page^}() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">${page^} Page</h1>
      <p className="mt-4">Conteúdo da página ${page}.</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Esta é uma página básica para teste.</p>
        <p className="mt-2 text-sm">Se você vê isso, a navegação para ${page} está funcionando.</p>
      </div>
    </div>
  )
}
CONTENT
    echo "✅ Criada página básica para $page"
  fi
done

# 9. Atualizar o DashboardLayout para garantir que está renderizando children
cat > components/layout/DashboardLayout.js << 'DASHBOARDLAYOUT'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from '../MobileMenu'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  console.log('DashboardLayout renderizado, children:', children ? 'tem conteúdo' : 'vazio')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <MobileMenu isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="md:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Render children - se não houver, mostra mensagem */}
            {children ? children : (
              <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-red-600">⚠️ ERRO: Nenhum conteúdo para exibir</h2>
                <p className="mt-2">O componente da página não está retornando conteúdo.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
DASHBOARDLAYOUT

# 10. Atualizar Sidebar para ter navegação correta
cat > components/layout/Sidebar.js << 'SIDEBAR'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'AI Insights', href: '/dashboard/ai-insights', icon: '🤖' },
  { name: 'Analytics', href: '/analytics', icon: '📊' },
  { name: 'Sales', href: '/sales', icon: '💰' },
  { name: 'Customers', href: '/customers', icon: '👥' },
  { name: 'Predictions', href: '/predictions', icon: '🔮' },
  { name: 'Reports', href: '/reports', icon: '📄' },
  { name: 'Notifications', href: '/notifications', icon: '🔔' },
  { name: 'Security', href: '/security', icon: '🛡️' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
  { name: 'Support', href: '/support', icon: '🛟' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const router = useRouter()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-gray-800 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-white">AI Platform</h1>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const current = router.pathname === item.href || router.pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
SIDEBAR

# 11. Limpar cache
echo "🧹 Limpando cache..."
rm -rf .next 2>/dev/null || true

echo ""
echo "✅ CORREÇÕES APLICADAS!"
echo ""
echo "🎯 O que foi feito:"
echo "   1. ✅ Verificada estrutura de páginas"
echo "   2. ✅ Criadas páginas básicas de teste"
echo "   3. ✅ DashboardLayout atualizado para mostrar children"
echo "   4. ✅ Sidebar atualizado com navegação correta"
echo "   5. ✅ Cache limpo"
echo ""
echo "🚀 TESTE ESTES PASSOS:"
echo ""
echo "1. Acesse http://localhost:3000/test-page"
echo "   - Se mostrar 'TEST PAGE', o roteamento básico funciona"
echo ""
echo "2. Acesse http://localhost:3000/dashboard"
echo "   - Se mostrar 'DASHBOARD SIMPLES', o dashboard funciona"
echo ""
echo "3. Clique nos links do menu"
echo "   - Cada página deve mostrar seu conteúdo básico"
echo ""
echo "4. Verifique o console do navegador (F12)"
echo "   - Deve mostrar 'DashboardLayout renderizado, children: tem conteúdo'"
echo ""
echo "🔧 Se ainda não funcionar, execute:"
echo "   cd ~/rust/ai-business-platform/frontend"
echo "   rm -rf .next"
echo "   npm run dev"
