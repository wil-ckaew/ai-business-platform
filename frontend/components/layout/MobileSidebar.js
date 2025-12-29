import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'
import {
  Home, TrendingUp, Users, Package,
  DollarSign, Settings, Shield, Bell,
  FileText, BarChart3, Headphones,
  Lock, Database, Cpu, Zap,
  UserCheck, Globe, X
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'AI Insights', href: '/dashboard/ai-insights', icon: BarChart3 },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Sales', href: '/sales', icon: DollarSign },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Predictions', href: '/predictions', icon: Globe },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Security', href: '/security', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Support', href: '/support', icon: Headphones },
  { name: 'Teste API Rust', href: '/api-test', icon: Headphones },
]

const adminNavigation = [
  { name: 'User Management', href: '/admin/users', icon: UserCheck },
  { name: 'System Logs', href: '/admin/logs', icon: Database },
  { name: 'Performance', href: '/admin/performance', icon: Cpu },
  { name: 'Permissions', href: '/admin/permissions', icon: Lock },
]

export default function MobileSidebar({ isOpen, onClose }) {
  const router = useRouter()
  const { user, isAdmin } = useAuth()

  const handleNavigation = (href) => {
    router.push(href)
    onClose()
  }

  const isActive = (href) => 
    router.pathname === href || router.pathname.startsWith(href + '/')

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full bg-gray-800 shadow-xl">
          <div className="flex items-center justify-between px-4 pt-5">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">AI Platform</h1>
            </div>
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* User Info */}
          <div className="px-4 mt-6 mb-4">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white text-sm">{user?.name || 'Admin User'}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-purple-900 text-purple-200' 
                      : 'bg-green-900 text-green-200'
                  }`}>
                    {user?.role === 'admin' ? (
                      <>
                        <Shield className="h-2.5 w-2.5 mr-1" />
                        Admin
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-2.5 w-2.5 mr-1" />
                        User
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const current = isActive(item.href)
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`${
                      current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-3 text-base font-medium rounded-md w-full text-left`}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </button>
                )
              })}

              {/* Admin Section */}
              {isAdmin && (
                <>
                  <div className="pt-6 pb-2">
                    <div className="px-2">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Administration
                      </div>
                    </div>
                  </div>

                  {adminNavigation.map((item) => {
                    const current = isActive(item.href)
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item.href)}
                        className={`${
                          current ? 'bg-purple-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } group flex items-center px-2 py-3 text-base font-medium rounded-md w-full text-left`}
                      >
                        <item.icon className="mr-4 h-6 w-6" />
                        {item.name}
                      </button>
                    )
                  })}
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
