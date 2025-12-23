import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { HelpCircle, MessageSquare, BookOpen, Headphones } from 'lucide-react'

export default function SupportPage() {
  return (
    <DashboardLayout>
      <Head><title>Support | AI Business Platform</title></Head>
      <PageWrapper>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-gray-600">Get help and support resources</p>
            </div>
          </div>
          <div className="card">
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Support Center</h3>
              <p className="text-gray-600 mt-2">Access help documentation and contact support</p>
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
