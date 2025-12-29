#!/bin/bash

cd ~/rust/ai-business-platform/frontend

echo "🔄 Restaurando projeto completo..."

# 1. Limpar estrutura atual
rm -rf components pages 2>/dev/null || true
mkdir -p components pages

# 2. Clonar projeto original
TEMP_DIR="/tmp/ai-platform-$(date +%s)"
git clone https://github.com/wil-ckaew/ai-business-platform.git "$TEMP_DIR"

# 3. Copiar estrutura original
cp -r "$TEMP_DIR/frontend/components/"* components/ 2>/dev/null || true
cp -r "$TEMP_DIR/frontend/pages/"* pages/ 2>/dev/null || true

# 4. Criar Layout responsivo
cat > components/Layout.js << 'LAYOUT'
import { useState } from 'react'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import MobileMenu from './MobileMenu'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileMenu isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
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
LAYOUT

# 5. Criar MobileMenu
cat > components/MobileMenu.js << 'MOBILEMENU'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
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

export default function MobileMenu({ isOpen, setIsOpen }) {
  const router = useRouter()

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
                  {navigation.map((item) => {
                    const current = router.pathname === item.href || router.pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center rounded-md px-3 py-2 text-base font-medium ${current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
MOBILEMENU

# 6. Atualizar Header para ter botão mobile
cat > components/layout/Header.js << 'HEADER'
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

# 7. Atualizar Sidebar
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
                    current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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

# 8. Atualizar _app.js
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

# 9. Garantir que todas as páginas tenham conteúdo básico
for page in analytics customers sales predictions notifications reports settings support security; do
  if [ -d "pages/$page" ] && [ ! -f "pages/$page/index.js" ]; then
    cat > "pages/$page/index.js" << CONTENT
export default function ${page^}() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">${page^}</h1>
      <p className="mt-2 text-gray-600">Welcome to the ${page} page.</p>
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <p>Content for ${page} will be displayed here.</p>
      </div>
    </div>
  )
}
CONTENT
  fi
done

# 10. Garantir que dashboard tenha conteúdo
if [ -d "pages/dashboard" ] && [ ! -f "pages/dashboard/index.js" ]; then
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

# 11. Garantir que ai-insights tenha conteúdo
if [ -d "pages/dashboard" ] && [ ! -f "pages/dashboard/ai-insights.js" ]; then
  cat > pages/dashboard/ai-insights.js << 'AIINSIGHTS'
export default function AIInsights() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
      <p className="mt-2 text-gray-600">AI-powered insights and predictions</p>
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="font-semibold">Predictive Analytics</h4>
            <p className="text-sm text-gray-600 mt-1">Forecast future trends</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold">Smart Recommendations</h4>
            <p className="text-sm text-gray-600 mt-1">Personalized suggestions</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold">Automated Reports</h4>
            <p className="text-sm text-gray-600 mt-1">Generate insights automatically</p>
          </div>
        </div>
      </div>
    </div>
  )
}
AIINSIGHTS
fi

# 12. Remover arquivos duplicados
rm -f pages/analytics.js pages/customers.js pages/sales.js pages/ai-dashboard.js 2>/dev/null || true

# 13. Limpar cache
rm -rf .next 2>/dev/null || true

echo "✅ Projeto restaurado e corrigido!"
echo ""
echo "🚀 Execute: npm run dev"
echo "🌐 Acesse: http://localhost:3000/dashboard"
