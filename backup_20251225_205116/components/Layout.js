import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from './MobileMenu'
import { useState } from 'react'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu - only shown on mobile when sidebarOpen is true */}
      <MobileMenu isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Desktop sidebar - hidden on mobile, shown on desktop */}
      <Sidebar />
      
      {/* Main content */}
      <div className="md:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
