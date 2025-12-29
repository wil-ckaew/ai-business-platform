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
