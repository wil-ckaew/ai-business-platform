#!/bin/bash

echo "🔄 Restaurando estrutura completa..."

# 1. Criar componentes básicos
mkdir -p components

# Layout
cat > components/Layout.js << 'LAYOUT'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
LAYOUT

# Sidebar simples
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
  ]
  
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen hidden md:block">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">AI Platform</h1>
        <nav>
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={\`flex items-center p-3 mb-1 rounded \${router.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'}\`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
SIDEBAR

# Header simples
cat > components/Header.js << 'HEADER'
import { useState } from 'react'

export default function Header() {
  const [search, setSearch] = useState('')
  
  return (
    <header className="bg-white shadow">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="p-2">🔔</button>
          </div>
        </div>
      </div>
    </header>
  )
}
HEADER

# 2. Configurar _app.js
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

# 3. Criar página index
cat > pages/index.js << 'INDEX'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  )
}
INDEX

echo "✅ Estrutura restaurada!"
echo "🚀 Execute: npm run dev"
