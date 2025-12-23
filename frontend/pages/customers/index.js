import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { Search, Filter, UserPlus, Mail, Phone, MapPin, Download, X, Calendar, Building, DollarSign, Edit, Trash2, Check, X as XIcon, MoreVertical } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex@business.com', phone: '+1 (555) 123-4567', location: 'New York, USA', company: 'TechCorp', status: 'active', value: 12500, joinDate: '2023-01-15' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@tech.com', phone: '+1 (555) 234-5678', location: 'San Francisco, USA', company: 'Startup XYZ', status: 'active', value: 8900, joinDate: '2023-02-20' },
    { id: 3, name: 'Michael Chen', email: 'michael@corp.com', phone: '+1 (555) 345-6789', location: 'Toronto, Canada', company: 'Global Solutions', status: 'active', value: 15600, joinDate: '2023-03-10' },
    { id: 4, name: 'Emma Wilson', email: 'emma@innovate.com', phone: '+44 20 1234 5678', location: 'London, UK', company: 'Innovate Labs', status: 'inactive', value: 4300, joinDate: '2023-04-05' },
    { id: 5, name: 'David Brown', email: 'david@global.com', phone: '+61 2 9876 5432', location: 'Sydney, Australia', company: 'Digital Media', status: 'active', value: 7200, joinDate: '2023-05-12' },
    { id: 6, name: 'Lisa Wang', email: 'lisa@enterprise.com', phone: '+86 10 8765 4321', location: 'Beijing, China', company: 'Enterprise Group', status: 'active', value: 21000, joinDate: '2023-06-18' },
    { id: 7, name: 'Robert Garcia', email: 'robert@finance.com', phone: '+1 (555) 876-5432', location: 'Miami, USA', company: 'Finance Corp', status: 'pending', value: 0, joinDate: '2023-07-25' },
    { id: 8, name: 'Maria Silva', email: 'maria@retail.com', phone: '+55 11 9876-5432', location: 'São Paulo, Brazil', company: 'Retail Chain', status: 'active', value: 14500, joinDate: '2023-08-30' }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('value')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    status: 'active'
  })

  // Filtrar e ordenar clientes
  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'value') {
        return sortOrder === 'asc' ? a.value - b.value : b.value - a.value
      } else if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === 'joinDate') {
        return sortOrder === 'asc' ? new Date(a.joinDate) - new Date(b.joinDate) : new Date(b.joinDate) - new Date(a.joinDate)
      }
      return 0
    })

  // Estatísticas
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    pending: customers.filter(c => c.status === 'pending').length,
    totalValue: customers.reduce((sum, c) => sum + c.value, 0),
    avgValue: customers.filter(c => c.status === 'active').length > 0 
      ? customers.filter(c => c.status === 'active').reduce((sum, c) => sum + c.value, 0) / 
        customers.filter(c => c.status === 'active').length 
      : 0
  }

  // Handlers
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error('Please fill in required fields')
      return
    }

    const customer = {
      id: customers.length + 1,
      ...newCustomer,
      value: 0,
      joinDate: new Date().toISOString().split('T')[0]
    }

    setCustomers([...customers, customer])
    setNewCustomer({ name: '', email: '', phone: '', location: '', company: '', status: 'active' })
    setShowAddModal(false)
    toast.success('Customer added successfully')
  }

  const handleUpdateCustomer = () => {
    if (!editingCustomer) return

    setCustomers(customers.map(c => 
      c.id === editingCustomer.id ? editingCustomer : c
    ))
    setShowEditModal(false)
    setEditingCustomer(null)
    toast.success('Customer updated successfully')
  }

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id))
      toast.success('Customer deleted')
    }
  }

  const handleExportCustomers = () => {
    toast.loading('Preparing export...')
    setTimeout(() => {
      toast.success('Customer data exported successfully')
    }, 1500)
  }

  const handleSendEmail = (email) => {
    toast.success(`Email prepared for ${email}`)
  }

  const handleToggleSelect = (id) => {
    setSelectedCustomers(prev => 
      prev.includes(id) 
        ? prev.filter(cid => cid !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id))
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-success-100 text-success-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-warning-100 text-warning-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Customers | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600">Manage your customer relationships and insights</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Customer
              </button>
              <button 
                onClick={handleExportCustomers}
                className="btn-secondary flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center">
                  <Check className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Value</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.avgValue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search customers by name, email, or company..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${statusFilter === 'all' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${statusFilter === 'active' ? 'bg-success-100 text-success-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatusFilter('inactive')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${statusFilter === 'inactive' ? 'bg-gray-100 text-gray-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Inactive
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${statusFilter === 'pending' ? 'bg-warning-100 text-warning-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Pending
                </button>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  className="input-field text-sm py-1"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="value">Value</option>
                  <option value="name">Name</option>
                  <option value="joinDate">Join Date</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => handleToggleSelect(customer.id)}
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                            {customer.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Joined {customer.joinDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.company}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {customer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${customer.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSendEmail(customer.email)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Send Email"
                          >
                            <Mail className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingCustomer(customer)
                              setShowEditModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-800"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredCustomers.length}</span> of{' '}
              <span className="font-medium">{customers.length}</span> customers
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                1
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Add Customer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Add New Customer</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="input-field"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={newCustomer.company}
                      onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={newCustomer.location}
                      onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select 
                      className="input-field"
                      value={newCustomer.status}
                      onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCustomer}
                    className="btn-primary flex-1"
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Customer Modal */}
        {showEditModal && editingCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Customer</h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false)
                      setEditingCustomer(null)
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={editingCustomer.name}
                      onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      value={editingCustomer.email}
                      onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="input-field"
                      value={editingCustomer.phone}
                      onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={editingCustomer.company}
                      onChange={(e) => setEditingCustomer({...editingCustomer, company: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={editingCustomer.location}
                      onChange={(e) => setEditingCustomer({...editingCustomer, location: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select 
                      className="input-field"
                      value={editingCustomer.status}
                      onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Value ($)
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      value={editingCustomer.value}
                      onChange={(e) => setEditingCustomer({...editingCustomer, value: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => {
                      setShowEditModal(false)
                      setEditingCustomer(null)
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCustomer}
                    className="btn-primary flex-1"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  )
}
