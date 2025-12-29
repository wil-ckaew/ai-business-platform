import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'AI Dashboard', href: '/ai-dashboard', icon: '🤖' },
    { name: 'Analytics', href: '/analytics', icon: '📈' },
    { name: 'Sales', href: '/sales', icon: '💰' },
    { name: 'Customers', href: '/customers', icon: '👥' },
    { name: 'Predictions', href: '/predictions', icon: '🔮' },
    { name: 'Reports', href: '/reports', icon: '📋' },
    { name: 'Notifications', href: '/notifications', icon: '🔔' },
    { name: 'Security', href: '/security', icon: '🔒' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
    { name: 'Support', href: '/support', icon: '❓' },
  ]

  return (
    <>
      {/* Mobile sidebar button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
      >
        ☰
      </button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-800">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">AI Platform</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white text-xl">×</button>
            </div>
            <nav className="p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center p-3 mb-1 rounded-lg ${
                    router.pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-gray-800">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">AI Business</h1>
            <p className="text-sm text-gray-400">Intelligent Platform</p>
          </div>
          <nav className="flex-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-3 mb-1 rounded-lg ${
                  router.pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
                {router.pathname === item.href && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-400"></div>
                )}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              <div>
                <p className="text-sm text-white">John Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
