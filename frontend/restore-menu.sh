#!/bin/bash

echo "📋 Restaurando menu completo..."

# 1. Criar/atualizar as pastas das páginas que estavam no menu original
pages=("dashboard" "ai-dashboard" "analytics" "sales" "customers" "reports" "predictions" "notifications" "settings" "support" "security")

for page in "${pages[@]}"; do
  mkdir -p "pages/$page"
  if [ ! -f "pages/$page/index.js" ]; then
    cat > "pages/$page/index.js" << CONTENT
export default function ${page^}() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">${page^}</h1>
        <p className="text-gray-600 mt-2">Welcome to the ${page^} page.</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">${page^} Overview</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">${page^} content will be displayed here.</p>
        </div>
      </div>
    </div>
  )
}
CONTENT
  fi
done

# 2. Atualizar o Sidebar com o menu completo
cat > components/Sidebar.js << 'SIDEBAR'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()
  const menu = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'AI Dashboard', path: '/ai-dashboard', icon: '🤖' },
    { name: 'Analytics', path: '/analytics', icon: '📊' },
    { name: 'Sales', path: '/sales', icon: '💰' },
    { name: 'Customers', path: '/customers', icon: '👥' },
    { name: 'Reports', path: '/reports', icon: '📄' },
    { name: 'Predictions', path: '/predictions', icon: '🔮' },
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

# 3. Atualizar o MobileMenu com o mesmo menu
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
    { name: 'Reports', path: '/reports', icon: '📄' },
    { name: 'Predictions', path: '/predictions', icon: '🔮' },
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

# 4. Atualizar o Header para incluir todos os títulos
cat > components/Header.js << 'HEADER'
import { useState, useEffect } from 'react'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/ai-dashboard': 'AI Dashboard',
  '/analytics': 'Analytics',
  '/sales': 'Sales',
  '/customers': 'Customers',
  '/reports': 'Reports',
  '/predictions': 'Predictions',
  '/notifications': 'Notifications',
  '/security': 'Security',
  '/settings': 'Settings',
  '/support': 'Support',
}

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const [pageTitle, setPageTitle] = useState('Dashboard')

  useEffect(() => {
    const path = router.pathname
    // Encontrar o título correspondente à rota atual
    let title = 'Dashboard'
    for (const [key, value] of Object.entries(pageTitles)) {
      if (path === key || path.startsWith(key + '/')) {
        title = value
        break
      }
    }
    setPageTitle(title)
  }, [router.pathname])

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
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">{pageTitle}</h1>
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

echo "✅ Menu restaurado com todas as páginas!"
echo ""
echo "📋 Páginas criadas:"
for page in "${pages[@]}"; do
  echo "   - $page"
done
echo ""
echo "🚀 Reinicie o servidor: npm run dev"
