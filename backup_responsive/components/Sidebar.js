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
