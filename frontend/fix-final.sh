#!/bin/bash

echo "🔧 Corrigindo estrutura de páginas e MobileMenu..."

# 1. Remover os arquivos soltos que causam duplicação
echo "🗑️ Removendo arquivos duplicados..."
rm -f pages/analytics.js pages/customers.js pages/sales.js

# 2. Corrigir o MobileMenu.js (remover template string problemático)
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
                  {menu.map((item) => {
                    const isActive = router.pathname === item.path;
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

echo "✅ MobileMenu.js corrigido"

# 3. Verificar se as pastas têm arquivos index.js, se não, criar
if [ ! -f pages/analytics/index.js ]; then
  mkdir -p pages/analytics
  cat > pages/analytics/index.js << 'ANALYTICS'
export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Detailed analytics and reporting</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
        <p className="text-gray-600">Analytics content goes here...</p>
      </div>
    </div>
  )
}
ANALYTICS
fi

if [ ! -f pages/customers/index.js ]; then
  mkdir -p pages/customers
  cat > pages/customers/index.js << 'CUSTOMERS'
export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-2">Customer management and insights</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Overview</h3>
        <p className="text-gray-600">Customer content goes here...</p>
      </div>
    </div>
  )
}
CUSTOMERS
fi

if [ ! -f pages/sales/index.js ]; then
  mkdir -p pages/sales
  cat > pages/sales/index.js << 'SALES'
export default function Sales() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Sales</h1>
        <p className="text-gray-600 mt-2">Sales performance and metrics</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
        <p className="text-gray-600">Sales content goes here...</p>
      </div>
    </div>
  )
}
SALES
fi

# 4. Atualizar o menu no Sidebar e MobileMenu para apontar para as rotas corretas
#    (como agora usamos pastas, as rotas são as mesmas: /analytics, /customers, /sales)

# 5. Limpar cache do Next.js
echo "🧹 Limpando cache do Next.js..."
rm -rf .next 2>/dev/null || true

echo ""
echo "✅ Estrutura corrigida com sucesso!"
echo ""
echo "📋 Resumo:"
echo "   - Removidos arquivos soltos duplicados"
echo "   - MobileMenu corrigido"
echo "   - Pastas com index.js mantidas"
echo ""
echo "🚀 Reinicie o servidor: npm run dev"
