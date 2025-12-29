#!/bin/bash

echo "🔧 Corrigindo todos os problemas..."

# 1. Primeiro, verificar a estrutura atual
echo "📁 Estrutura atual:"
find pages -type f -name "*.js" -o -name "*.jsx" | sort

# 2. Criar o componente MobileMenu que está faltando
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
    { name: 'AI Dashboard', path: '/ai-dashboard', icon: '🤖' },
    { name: 'Analytics', path: '/analytics', icon: '📊' },
    { name: 'Sales', path: '/sales', icon: '💰' },
    { name: 'Customers', path: '/customers', icon: '👥' },
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
                  {menu.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={\`
                        flex items-center rounded-md px-3 py-2 text-base font-medium
                        \${router.pathname === item.path
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      \`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
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

echo "✅ MobileMenu.js criado"

# 3. Remover páginas duplicadas - manteremos apenas os arquivos simples
echo "🗑️ Removendo páginas duplicadas..."

# Remover pastas que causam duplicação
rm -rf pages/analytics pages/customers pages/sales 2>/dev/null || true

echo "✅ Páginas duplicadas removidas"

# 4. Verificar se temos todas as dependências instaladas
echo "📦 Verificando dependências..."
if ! npm list @headlessui/react > /dev/null 2>&1; then
  echo "Instalando @headlessui/react..."
  npm install @headlessui/react
fi

if ! npm list @heroicons/react > /dev/null 2>&1; then
  echo "Instalando @heroicons/react..."
  npm install @heroicons/react
fi

# 5. Verificar se o Layout.js está correto (já deve estar, mas vamos garantir)
if [ ! -f components/Layout.js ]; then
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

# 6. Verificar se o Header.js está correto
if [ ! -f components/Header.js ]; then
  cat > components/Header.js << 'HEADER'
import { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState('')
  
  return (
    <header className="bg-white shadow">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden mr-3 -ml-2 p-2 rounded-md text-gray-400"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard</h1>
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
fi

# 7. Limpar cache do Next.js
echo "🧹 Limpando cache do Next.js..."
rm -rf .next 2>/dev/null || true

echo ""
echo "✅ Todos os problemas corrigidos!"
echo ""
echo "📋 Resumo das correções:"
echo "1. ✅ Componente MobileMenu criado"
echo "2. ✅ Páginas duplicadas removidas"
echo "3. ✅ Dependências verificadas/instaladas"
echo "4. ✅ Cache limpo"
echo ""
echo "🚀 Reinicie o servidor:"
echo "   npm run dev"
echo ""
echo "🌐 Acesse: http://localhost:3000/dashboard"
