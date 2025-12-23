import { Bell, Search, Menu, User } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header({ onMenuClick }) {
  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex@business.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  })
  
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`
      sticky top-0 z-40 bg-white border-b border-gray-200
      ${isScrolled ? 'shadow-sm' : ''}
    `}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Search (desktop) */}
            <div className="hidden lg:block ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search analytics, reports, predictions..."
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search button for mobile */}
            <button className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-danger-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 focus:outline-none group">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
