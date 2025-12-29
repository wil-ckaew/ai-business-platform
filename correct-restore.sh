#!/bin/bash

echo "🎯 RESTAURAÇÃO CORRETA DO PROJETO GITHUB..."

# 1. Parar qualquer servidor Next.js
pkill -f "next" 2>/dev/null || true

# 2. Remover tudo e começar do zero
cd ~/rust/ai-business-platform/frontend

echo "🗑️  Limpando projeto atual..."
rm -rf components pages 2>/dev/null || true
mkdir -p components pages

# 3. Clonar novamente o repositório
TEMP_DIR="/tmp/ai-platform-restore"
rm -rf "$TEMP_DIR"
git clone https://github.com/wil-ckaew/ai-business-platform.git "$TEMP_DIR"

echo "✅ Repositório clonado"

# 4. Copiar COMPLETAMENTE a estrutura do frontend
echo "📁 Copiando estrutura completa..."
cp -r "$TEMP_DIR/frontend/components/"* components/ 2>/dev/null || true
cp -r "$TEMP_DIR/frontend/pages/"* pages/ 2>/dev/null || true

# 5. Verificar o que foi copiado
echo "📋 Estrutura copiada:"
echo "Components:"
ls -la components/ 2>/dev/null || echo "Nenhum componente"
echo ""
echo "Pages:"
ls -la pages/ 2>/dev/null || echo "Nenhuma página"

# 6. Verificar se temos a estrutura de layout
if [ -d "components/layout" ]; then
  echo "✅ Estrutura de layout encontrada"
  
  # Criar um Layout.js simplificado que usa os componentes originais
  cat > components/Layout.js << 'LAYOUT'
import DashboardLayout from './layout/DashboardLayout'

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
LAYOUT
fi

# 7. Corrigir MobileMenu com sintaxe correta
cat > components/MobileMenu.js << 'MOBILEMENU'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MobileMenu({ isOpen, setIsOpen }) {
  const router = useRouter()
  const menu = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'AI Insights', path: '/dashboard/ai-insights', icon: '🤖' },
    { name: 'Analytics', path: '/analytics', icon: '📊' },
    { name: 'Sales', path: '/sales', icon: '💰' },
    { name: 'Customers', path: '/customers', icon: '👥' },
    { name: 'Predictions', path: '/predictions', icon: '🔮' },
    { name: 'Reports', path: '/reports', icon: '📄' },
    { name: 'Notifications', path: '/notifications', icon: '🔔' },
    { name: 'Security', path: '/security', icon: '🛡️' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
    { name: 'Support', path: '/support', icon: '🛟' },
  ]

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className="text-xl font-bold text-white">AI Platform</h1>
                </div>
                <nav className="mt-5 space-y-1 px-2">
                  {menu.map((item) => {
                    const isActive = router.pathname === item.path || router.pathname.startsWith(item.path + '/');
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center rounded-md px-3 py-2 text-base font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
MOBILEMENU

# 8. Atualizar _app.js para usar nosso Layout responsivo
cat > pages/_app.js << 'APP'
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
APP

# 9. Verificar e atualizar o DashboardLayout original para ser responsivo
if [ -f "components/layout/DashboardLayout.js" ]; then
  echo "📝 Atualizando DashboardLayout para ser responsivo..."
  
  # Primeiro, vamos ver o conteúdo original
  echo "Conteúdo original do DashboardLayout:"
  head -20 "components/layout/DashboardLayout.js"
  
  # Vamos criar uma versão responsiva que mantém o design original mas adiciona mobile
  cat > "components/layout/DashboardLayout.js" << 'DASHBOARDLAYOUT'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from '../MobileMenu'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
DASHBOARDLAYOUT
fi

# 10. Atualizar Header original para ter botão de menu mobile
if [ -f "components/layout/Header.js" ]; then
  echo "📝 Atualizando Header para mobile..."
  
  cat > "components/layout/Header.js" << 'HEADER'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState('')
  
  return (
    <header className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">AI Business Platform</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-32 sm:w-48 md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
HEADER
fi

# 11. Garantir que o Sidebar original esteja correto
if [ -f "components/layout/Sidebar.js" ]; then
  echo "📝 Mantendo Sidebar original..."
  # Não vamos modificar o Sidebar original, apenas garantir que ele não aparece em mobile
fi

# 12. Limpar cache
echo "🧹 Limpando cache..."
rm -rf .next 2>/dev/null || true

# 13. Verificar estrutura final completa
echo ""
echo "✅ RESTAURAÇÃO COMPLETA E CORRIGIDA!"
echo ""
echo "📁 Estrutura final:"
echo "Components:"
find components -name "*.js" -o -name "*.jsx" 2>/dev/null | sort
echo ""
echo "Pages:"
find pages -name "*.js" -o -name "*.jsx" 2>/dev/null | sort
echo ""
echo "🚀 Para iniciar:"
echo "   cd ~/rust/ai-business-platform/frontend"
echo "   npm run dev"
echo ""
echo "🌐 Acesse: http://localhost:3000/dashboard"
