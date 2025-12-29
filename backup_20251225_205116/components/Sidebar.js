import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'AI Dashboard', path: '/ai-dashboard', icon: '🤖' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Sales', path: '/sales', icon: '💰' },
    { name: 'Customers', path: '/customers', icon: '👥' },
    { name: 'Predictions', path: '/predictions', icon: '🔮' },
    { name: 'Reports', path: '/reports', icon: '📋' },
    { name: 'Notifications', path: '/notifications', icon: '🔔' },
    { name: 'Security', path: '/security', icon: '🔒' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
    { name: 'Support', path: '/support', icon: '❓' },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen hidden md:block">
      <div className="p-6">
        {/* Logo e título */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold">AI Business Platform</h1>
          <p className="text-gray-400 text-sm mt-1">Intelligent Platform</p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={\`
                flex items-center p-3 rounded-lg transition-colors duration-200
                \${router.pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-800 text-gray-300'
                }
              \`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Perfil do usuário */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="ml-3">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-400">Administrator</p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
