import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { 
  HelpCircle, MessageSquare, BookOpen, Headphones, 
  Mail, Phone, Globe, FileText, Video, Users,
  CheckCircle, Clock, AlertCircle, ExternalLink,
  ChevronRight, Search
} from 'lucide-react'

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('help')
  const [searchQuery, setSearchQuery] = useState('')
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  })

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    // Simular envio do ticket
    setTicketSubmitted(true)
    setTimeout(() => {
      setTicketSubmitted(false)
      setTicketForm({
        subject: '',
        category: 'technical',
        priority: 'medium',
        description: ''
      })
    }, 3000)
  }

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics and setup',
      articles: 12,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Billing & Payments',
      icon: FileText,
      description: 'Manage subscriptions and invoices',
      articles: 8,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Technical Issues',
      icon: HelpCircle,
      description: 'Troubleshoot technical problems',
      articles: 15,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'AI Features',
      icon: Users,
      description: 'Using AI tools and predictions',
      articles: 10,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'API & Integration',
      icon: Globe,
      description: 'Developer guides and APIs',
      articles: 6,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Video Tutorials',
      icon: Video,
      description: 'Step-by-step video guides',
      articles: 5,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ]

  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Security > Change Password. You\'ll receive an email with reset instructions.',
      category: 'account'
    },
    {
      question: 'How accurate are the AI predictions?',
      answer: 'Our AI models achieve 94-97% accuracy based on historical data. Accuracy may vary by industry.',
      category: 'ai'
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes, you can export data in CSV, Excel, or PDF format from any dashboard or report.',
      category: 'data'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, our mobile app is available on iOS and Android. Download from App Store or Google Play.',
      category: 'general'
    },
    {
      question: 'How do I upgrade my plan?',
      answer: 'Navigate to Billing > Plans and select your desired plan. Changes take effect immediately.',
      category: 'billing'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.',
      category: 'billing'
    }
  ]

  const supportTickets = [
    {
      id: 'TKT-001',
      subject: 'Cannot access sales dashboard',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'TKT-002',
      subject: 'API integration question',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-14',
      lastUpdate: '1 day ago'
    },
    {
      id: 'TKT-003',
      subject: 'Billing discrepancy',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-10',
      lastUpdate: '5 days ago'
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Support | AI Business Platform</title>
      </Head>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Help & Support Center</h1>
              <p className="opacity-90 mt-2">Get help, browse documentation, or contact our support team</p>
            </div>
            <Headphones className="h-12 w-12 opacity-80" />
          </div>
          
          {/* Search Bar */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search help articles, FAQs, or documentation..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/30 bg-white/20 placeholder-white/70 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('help')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'help'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Help Center
              </div>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faq'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQs
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tickets'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                My Tickets
              </div>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Headphones className="h-4 w-4 mr-2" />
                Contact Support
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Help Center */}
          {activeTab === 'help' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Popular Help Categories</h2>
                <p className="text-gray-600">Browse articles by category</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helpCategories.map((category, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-gray-500">{category.articles} articles</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-4">Quick Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="#" className="flex items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                    <ExternalLink className="h-4 w-4 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Documentation</p>
                      <p className="text-sm text-gray-600">Complete API reference</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                    <Video className="h-4 w-4 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Video Tutorials</p>
                      <p className="text-sm text-gray-600">Step-by-step guides</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                    <Users className="h-4 w-4 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Community Forum</p>
                      <p className="text-sm text-gray-600">Ask other users</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* FAQs */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-600">Find answers to common questions</p>
              </div>

              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {faq.category}
                          </span>
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Read more
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Tickets */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">My Support Tickets</h2>
                  <p className="text-gray-600">Track and manage your support requests</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Ticket
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Update
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {supportTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-blue-600">{ticket.id}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{ticket.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(ticket.priority)}`} />
                              <span className="capitalize">{ticket.priority}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ticket.lastUpdate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Contact Support */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Contact Support Team</h2>
                  <p className="text-gray-600">Submit a ticket and we'll get back to you</p>
                </div>

                {ticketSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-green-900">Ticket Submitted Successfully!</h3>
                    <p className="text-green-700 mt-2">We'll respond within 24 hours. Ticket ID: TKT-004</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Brief description of your issue"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={ticketForm.category}
                            onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                          >
                            <option value="technical">Technical Issue</option>
                            <option value="billing">Billing</option>
                            <option value="account">Account</option>
                            <option value="feature">Feature Request</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={ticketForm.priority}
                            onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          rows={6}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Please provide detailed information about your issue..."
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Submit Support Ticket
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Support Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Email Support</p>
                        <p className="text-sm text-gray-600">support@aibusiness.com</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Phone Support</p>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Live Chat</p>
                        <p className="text-sm text-gray-600">Available 9am-6pm EST</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Support Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-blue-900">Standard Support</p>
                        <p className="text-sm text-blue-700">Monday-Friday, 9am-6pm EST</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-blue-900">Emergency Support</p>
                        <p className="text-sm text-blue-700">24/7 for critical issues</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Tip:</span> For faster resolution, include screenshots and detailed steps to reproduce the issue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
