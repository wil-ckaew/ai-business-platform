import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { FileText, Download, Calendar, Filter, Plus, BarChart3, PieChart, LineChart, Users, TrendingUp } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ReportsPage() {
  const [reports] = useState([
    { id: 1, name: 'Monthly Sales Report', type: 'sales', date: '2024-01-15', status: 'completed', size: '2.4 MB' },
    { id: 2, name: 'Customer Analytics Q4', type: 'analytics', date: '2024-01-10', status: 'completed', size: '3.1 MB' },
    { id: 3, name: 'Revenue Forecast', type: 'predictions', date: '2024-01-05', status: 'pending', size: '1.8 MB' },
    { id: 4, name: 'User Growth Analysis', type: 'analytics', date: '2023-12-28', status: 'completed', size: '2.7 MB' },
    { id: 5, name: 'Product Performance', type: 'sales', date: '2023-12-20', status: 'completed', size: '1.9 MB' },
  ])

  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreatingReport, setIsCreatingReport] = useState(false)
  const [newReport, setNewReport] = useState({
    name: '',
    type: 'sales',
    schedule: 'once',
    format: 'pdf'
  })

  const reportTypes = [
    { id: 'sales', name: 'Sales Reports', icon: BarChart3, color: 'bg-primary-500' },
    { id: 'analytics', name: 'Analytics Reports', icon: PieChart, color: 'bg-success-500' },
    { id: 'predictions', name: 'Prediction Reports', icon: TrendingUp, color: 'bg-warning-500' },
    { id: 'users', name: 'User Reports', icon: Users, color: 'bg-secondary-500' },
  ]

  const handleExport = () => {
    toast.loading('Exporting reports list...')
    
    const exportData = [
      ['Reports Database Export', '', '', '', ''],
      ['Generated', new Date().toLocaleString(), '', '', ''],
      ['Total Reports', reports.length, 'Completed', reports.filter(r => r.status === 'completed').length, ''],
      ['', '', '', '', ''],
      ['ID', 'Report Name', 'Type', 'Date', 'Status', 'Size'],
      ...reports.map(r => [
        r.id,
        `"${r.name}"`,
        r.type,
        r.date,
        r.status,
        r.size
      ])
    ]
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + exportData.map(row => row.join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `reports_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Reports list exported successfully!')
  }

  const handleCreateReport = () => {
    setIsCreatingReport(true)
  }

  const handleGenerateReport = () => {
    if (!newReport.name.trim()) {
      toast.error('Please enter a report name')
      return
    }

    // Gerar novo ID
    const newId = Math.max(...reports.map(r => r.id), 0) + 1
    
    // Criar novo relatório
    const reportToAdd = {
      id: newId,
      name: newReport.name,
      type: newReport.type,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      size: '0.0 MB'
    }

    // Aqui normalmente você chamaria uma API para gerar o relatório
    toast.loading(`Generating ${newReport.name}...`)
    
    setTimeout(() => {
      // Simular geração do relatório
      toast.success(`Report "${newReport.name}" created successfully!`)
      setIsCreatingReport(false)
      setNewReport({
        name: '',
        type: 'sales',
        schedule: 'once',
        format: 'pdf'
      })
      
      // Em um app real, você atualizaria o estado aqui
      // setReports([reportToAdd, ...reports])
    }, 2000)
  }

  const handleDownloadReport = (reportId) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      toast.success(`Downloading ${report.name}...`)
      // Simular download
      setTimeout(() => {
        toast.success(`Report downloaded: ${report.name}`)
      }, 1000)
    }
  }

  // Filtrar relatórios
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || report.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <DashboardLayout>
      <Head>
        <title>Reports | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600">Generate and manage business reports</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExport}
                className="btn-secondary flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export List
              </button>
              <button 
                onClick={handleCreateReport}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </button>
            </div>
          </div>

          {/* Report Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportTypes.map((type) => {
              const Icon = type.icon
              const reportCount = reports.filter(r => r.type === type.id).length
              
              return (
                <div 
                  key={type.id}
                  className={`card cursor-pointer hover:shadow-md transition-shadow ${
                    filterType === type.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setFilterType(type.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">{type.name}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{reportCount}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${type.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                      <Icon className={`h-6 w-6 ${type.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    {filterType === type.id ? 'Selected' : 'Click to filter'}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Filters */}
          <div className="card">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search reports by name..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-3">
                <select 
                  className="input-field"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="sales">Sales Reports</option>
                  <option value="analytics">Analytics Reports</option>
                  <option value="predictions">Prediction Reports</option>
                  <option value="users">User Reports</option>
                </select>
                <button className="btn-secondary flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{report.name}</div>
                            <div className="text-sm text-gray-500">ID: REP-{report.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.type === 'sales' ? 'bg-primary-100 text-primary-800' :
                          report.type === 'analytics' ? 'bg-success-100 text-success-800' :
                          report.type === 'predictions' ? 'bg-warning-100 text-warning-800' :
                          'bg-secondary-100 text-secondary-800'
                        }`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {report.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'completed' 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{report.size}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleDownloadReport(report.id)}
                            className="text-primary-600 hover:text-primary-800 text-sm"
                          >
                            Download
                          </button>
                          <button 
                            onClick={() => toast.success(`Previewing ${report.name}`)}
                            className="text-gray-600 hover:text-gray-800 text-sm"
                          >
                            Preview
                          </button>
                          <button 
                            onClick={() => toast.success(`Scheduling ${report.name}`)}
                            className="text-gray-600 hover:text-gray-800 text-sm"
                          >
                            Schedule
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Report Templates */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Sales Performance',
                  description: 'Monthly sales trends and revenue analysis with charts',
                  icon: BarChart3,
                  color: 'text-primary-600',
                  bgColor: 'bg-primary-50'
                },
                {
                  title: 'Customer Analytics',
                  description: 'Customer segmentation and behavior analysis',
                  icon: Users,
                  color: 'text-success-600',
                  bgColor: 'bg-success-50'
                },
                {
                  title: 'Revenue Forecast',
                  description: 'AI-powered revenue predictions for next quarter',
                  icon: TrendingUp,
                  color: 'text-warning-600',
                  bgColor: 'bg-warning-50'
                },
              ].map((template) => (
                <div key={template.title} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${template.bgColor}`}>
                      <template.icon className={`h-5 w-5 ${template.color}`} />
                    </div>
                    <h4 className="font-medium text-gray-900">{template.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <button 
                    onClick={() => {
                      setNewReport({
                        ...newReport,
                        name: `${template.title} - ${new Date().toLocaleDateString()}`,
                        type: template.title.toLowerCase().includes('sales') ? 'sales' :
                              template.title.toLowerCase().includes('customer') ? 'analytics' : 'predictions'
                      })
                      setIsCreatingReport(true)
                    }}
                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal para Criar Novo Relatório */}
        {isCreatingReport && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Report</h3>
                <button 
                  onClick={() => setIsCreatingReport(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Name *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Monthly Sales Report"
                    value={newReport.name}
                    onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type
                  </label>
                  <select 
                    className="input-field"
                    value={newReport.type}
                    onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                  >
                    <option value="sales">Sales Report</option>
                    <option value="analytics">Analytics Report</option>
                    <option value="predictions">Prediction Report</option>
                    <option value="users">User Report</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule
                  </label>
                  <select 
                    className="input-field"
                    value={newReport.schedule}
                    onChange={(e) => setNewReport({...newReport, schedule: e.target.value})}
                  >
                    <option value="once">Generate Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format
                  </label>
                  <select 
                    className="input-field"
                    value={newReport.format}
                    onChange={(e) => setNewReport({...newReport, format: e.target.value})}
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="excel">Excel Spreadsheet</option>
                    <option value="csv">CSV File</option>
                    <option value="html">HTML Report</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setIsCreatingReport(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleGenerateReport}
                  className="btn-primary"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  )
}
