import { useState } from 'react'
import Sidebar from './Sidebar'
import MobileSidebar from './MobileSidebar'
import ModernHeader from './ModernHeader'

export default function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Modern Header */}
        <ModernHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
