#!/bin/bash

echo "📥 Restaurando estrutura do GitHub original..."

# 1. Clonar o repositório em uma pasta temporária
TEMP_DIR="/tmp/ai-platform-original"
if [ -d "$TEMP_DIR" ]; then
  rm -rf "$TEMP_DIR"
fi

git clone https://github.com/wil-ckaew/ai-business-platform.git "$TEMP_DIR"

echo "✅ Repositório clonado"

# 2. Verificar a estrutura original
echo "📁 Estrutura original do GitHub:"
find "$TEMP_DIR" -name "*.js" -o -name "*.jsx" | grep -E "(pages|components)" | head -30

# 3. Backup do projeto atual
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r components pages "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ Backup criado em: $BACKUP_DIR"

# 4. Restaurar componentes do GitHub (apenas os essenciais)
echo "🔄 Restaurando componentes..."

# Copiar componentes do GitHub
cp -r "$TEMP_DIR/components/"* components/ 2>/dev/null || true

# 5. Restaurar páginas do GitHub mantendo nossa estrutura de responsividade
echo "🔄 Restaurando páginas..."

# Primeiro, limpar páginas antigas
rm -rf pages/* 2>/dev/null || true

# Copiar páginas do GitHub
cp -r "$TEMP_DIR/pages/"* pages/ 2>/dev/null || true

# 6. Verificar se há duplicações e corrigir
echo "🔍 Verificando duplicações..."

# Remover arquivos duplicados (se houver pastas e arquivos com mesmo nome)
for page in analytics customers sales predictions notifications reports settings support security; do
  if [ -f "pages/$page.js" ] && [ -d "pages/$page" ]; then
    echo "Removendo arquivo duplicado: pages/$page.js"
    rm -f "pages/$page.js"
  fi
done

# 7. Garantir que todas as páginas principais tenham index.js
for page in dashboard analytics customers sales predictions notifications reports settings support security; do
  if [ -d "pages/$page" ] && [ ! -f "pages/$page/index.js" ]; then
    # Se a pasta existe mas não tem index.js, criar um básico
    cat > "pages/$page/index.js" << CONTENT
export default function ${page^}() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">${page^}</h1>
        <p className="text-gray-600 mt-2">Welcome to the ${page} page</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <p>Content for ${page} will be displayed here</p>
      </div>
    </div>
  )
}
CONTENT
  fi
done

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

# 9. Garantir que o Layout.js seja responsivo
if [ -f "components/Layout.js" ]; then
  # Verificar se Layout já tem MobileMenu
  if ! grep -q "MobileMenu" "components/Layout.js"; then
    # Atualizar Layout para ser responsivo
    cat > components/Layout.js << 'LAYOUT'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from './MobileMenu'
import { useState } from 'react'

export default function Layout({ children }) {
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
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
LAYOUT
  fi
fi

# 10. Garantir que Sidebar tenha todas as páginas do menu original
if [ -f "components/Sidebar.js" ]; then
  # Atualizar Sidebar para incluir todas as páginas
  cat > components/Sidebar.js << 'SIDEBAR'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
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
    <div className="w-64 bg-gray-800 text-white min-h-screen hidden md:block">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">AI Platform</h1>
        <nav>
          {menu.map((item) => {
            const isActive = router.pathname === item.path || router.pathname.startsWith(\`\${item.path}/\`);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={\`flex items-center p-3 mb-1 rounded transition-colors duration-200 \${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}\`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
SIDEBAR
fi

# 11. Garantir que MobileMenu tenha o mesmo menu
if [ ! -f "components/MobileMenu.js" ]; then
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
                    const isActive = router.pathname === item.path || router.pathname.startsWith(\`\${item.path}/\`);
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={\`flex items-center rounded-md px-3 py-2 text-base font-medium \${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}\`}
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
fi

# 12. Atualizar Header para ser responsivo
cat > components/Header.js << 'HEADER'
import { useState, useEffect } from 'react'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState('')
  const router = useRouter()
  
  return (
    <header className="bg-white shadow">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden mr-3 -ml-2 p-2 rounded-md text-gray-400 hover:text-gray-500"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">AI Business Platform</h1>
              <p className="text-xs sm:text-sm text-gray-600">Welcome back</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-32 sm:w-48 md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <span className="sr-only">Notifications</span>
              <div className="relative">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
HEADER

# 13. Limpar cache
echo "🧹 Limpando cache..."
rm -rf .next 2>/dev/null || true

# 14. Verificar estrutura final
echo ""
echo "✅ RESTAURAÇÃO COMPLETA!"
echo ""
echo "📁 Estrutura final:"
find pages -name "*.js" -o -name "*.jsx" | sort
echo ""
echo "📋 Menu restaurado com:"
echo "   • Dashboard"
echo "   • AI Insights"
echo "   • Analytics"
echo "   • Sales"
echo "   • Customers"
echo "   • Predictions"
echo "   • Reports"
echo "   • Notifications"
echo "   • Security"
echo "   • Settings"
echo "   • Support"
echo ""
echo "🚀 Para iniciar:"
echo "   npm run dev"
echo ""
echo "📱 Responsivo mantido:"
echo "   • Menu mobile (botão hambúrguer)"
echo "   • Layout adaptativo"
echo "   • Sidebar apenas em desktop"
