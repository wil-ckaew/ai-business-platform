import {
  LayoutDashboard,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  Bell,
  Shield,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/', current: true },
  { name: 'Sales', icon: ShoppingCart, href: '/sales', current: false },
  { name: 'Analytics', icon: BarChart3, href: '/analytics', current: false },
  { name: 'Customers', icon: Users, href: '/customers', current: false },
  { name: 'Predictions', icon: TrendingUp, href: '/predictions', current: false },
  { name: 'Reports', icon: FileText, href: '/reports', current: false },
  { name: 'Notifications', icon: Bell, href: '/notifications', current: false },
  { name: 'Security', icon: Shield, href: '/security', current: false },
]

const secondaryNavigation = [
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help & Support', icon: HelpCircle, href: '/support' },
]

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile && isOpen) {
      const handleRouteChange = () => {
        onClose()
      }
      
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [isMobile, isOpen, onClose, router.events])

  const handleNavigation = (name, href) => {
    setActiveItem(name)
    router.push(href)
    if (isMobile) onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden" onClick={onClose} />
      )}

      <div className={`
        flex flex-col h-screen w-64 bg-white border-r border-gray-200 
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        {/* Header da Sidebar (mobile) */}
        <div className="lg:hidden flex items-center justify-between px-6 h-16 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Business</h1>
              <p className="text-xs text-gray-500">Intelligence Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Logo (desktop) */}
        <div className="hidden lg:flex items-center justify-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Business</h1>
              <p className="text-xs text-gray-500">Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Navigation */}
          <nav className="px-4 py-6 space-y-1 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.name || router.pathname === item.href
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.name, item.href)}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 border border-primary-100' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  {item.name}
                  {item.name === 'Notifications' && (
                    <span className="ml-auto bg-danger-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Secondary Navigation */}
          <div className="px-4 py-4 border-t border-gray-200">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.name
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.name, item.href)}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-2
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3 text-gray-400" />
                  {item.name}
                </button>
              )
            })}
            
            <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <LogOut className="h-5 w-5 mr-3 text-gray-400" />
              Sign out
            </button>
          </div>

          {/* Upgrade Banner */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white">Upgrade to Pro</h3>
              <p className="text-xs text-primary-100 mt-1">Get advanced features and insights</p>
              <button className="mt-3 w-full bg-white text-primary-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
