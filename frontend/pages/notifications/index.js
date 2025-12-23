import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { 
  Bell, BellOff, Mail, Smartphone, Clock, AlertCircle, 
  CheckCircle, XCircle, Filter, Archive, Trash2, Settings,
  MessageSquare, CreditCard, Package, TrendingUp, Users,
  Check, X, Eye, EyeOff, Download as DownloadIcon
} from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Sale Completed',
      message: 'Customer John Doe purchased 5 items worth $1,250',
      type: 'sale',
      priority: 'high',
      read: false,
      timestamp: '2 minutes ago',
      icon: TrendingUp,
      color: 'text-success-600',
      bgColor: 'bg-success-100'
    },
    {
      id: 2,
      title: 'Inventory Alert',
      message: 'Product "Wireless Headphones" stock is running low (15 items left)',
      type: 'inventory',
      priority: 'medium',
      read: false,
      timestamp: '15 minutes ago',
      icon: Package,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100'
    },
    {
      id: 3,
      title: 'New Customer Registered',
      message: 'Sarah Johnson joined with premium subscription',
      type: 'customer',
      priority: 'low',
      read: true,
      timestamp: '1 hour ago',
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      id: 4,
      title: 'Payment Failed',
      message: 'Monthly subscription payment failed for customer@example.com',
      type: 'payment',
      priority: 'high',
      read: false,
      timestamp: '3 hours ago',
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 5,
      title: 'System Update Available',
      message: 'New platform update v2.5.0 is ready to install',
      type: 'system',
      priority: 'medium',
      read: true,
      timestamp: '5 hours ago',
      icon: Settings,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 6,
      title: 'AI Prediction Ready',
      message: 'Sales forecast for next month is available in Analytics',
      type: 'ai',
      priority: 'low',
      read: true,
      timestamp: '1 day ago',
      icon: Bell,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 7,
      title: 'Security Alert',
      message: 'New login detected from unfamiliar location (New York, USA)',
      type: 'security',
      priority: 'high',
      read: false,
      timestamp: '2 days ago',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 8,
      title: 'Customer Feedback',
      message: 'New 5-star review from Michael Smith',
      type: 'feedback',
      priority: 'low',
      read: true,
      timestamp: '3 days ago',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      sales: true,
      inventory: true,
      customers: true,
      payments: true,
      system: false,
      ai: true,
      security: true,
      feedback: false
    },
    push: {
      sales: true,
      inventory: true,
      customers: false,
      payments: true,
      system: false,
      ai: true,
      security: true,
      feedback: false
    },
    sms: {
      sales: false,
      inventory: false,
      customers: false,
      payments: true,
      system: false,
      ai: false,
      security: true,
      feedback: false
    },
    frequency: 'realtime',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    },
    summaryEmail: true,
    summaryFrequency: 'daily'
  })

  const [filter, setFilter] = useState('all')
  const [showSettings, setShowSettings] = useState(false)
  const [showQuietHours, setShowQuietHours] = useState(false)

  // ========== HANDLERS CORRIGIDOS ==========

  const handleSettingsClick = () => {
    setShowSettings(!showSettings)
    toast.success(showSettings ? 'Settings closed' : 'Settings opened')
  }

  const handleMarkAllAsRead = () => {
    if (notifications.filter(n => !n.read).length === 0) {
      toast.error('All notifications are already read')
      return
    }

    toast.loading('Marking all as read...')
    
    setTimeout(() => {
      setNotifications(notifications.map(notification => ({ ...notification, read: true })))
      toast.success('All notifications marked as read')
    }, 1000)
  }

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
    toast.success('Marked as read')
  }

  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      const notificationToDelete = notifications.find(n => n.id === id)
      setNotifications(notifications.filter(notification => notification.id !== id))
      toast.success(`Deleted: ${notificationToDelete.title}`)
    }
  }

  const handleArchiveAll = () => {
    const readNotifications = notifications.filter(n => n.read)
    
    if (readNotifications.length === 0) {
      toast.error('No read notifications to archive')
      return
    }

    if (window.confirm(`Archive ${readNotifications.length} read notifications?`)) {
      toast.loading('Archiving notifications...')
      
      setTimeout(() => {
        setNotifications(notifications.filter(notification => !notification.read))
        toast.success(`${readNotifications.length} notifications archived`)
      }, 1500)
    }
  }

  const handleToggleNotificationSetting = (channel, setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [channel]: {
        ...notificationSettings[channel],
        [setting]: !notificationSettings[channel][setting]
      }
    })
    toast.success(`${setting.replace(/([A-Z])/g, ' $1')} ${!notificationSettings[channel][setting] ? 'enabled' : 'disabled'}`)
  }

  const handleUpdateFrequency = (frequency) => {
    setNotificationSettings({
      ...notificationSettings,
      frequency
    })
    toast.success(`Notification frequency set to ${frequency}`)
  }

  const handleToggleQuietHours = () => {
    setNotificationSettings({
      ...notificationSettings,
      quietHours: {
        ...notificationSettings.quietHours,
        enabled: !notificationSettings.quietHours.enabled
      }
    })
    toast.success(`Quiet hours ${!notificationSettings.quietHours.enabled ? 'enabled' : 'disabled'}`)
  }

  const handleUpdateQuietHours = (field, value) => {
    setNotificationSettings({
      ...notificationSettings,
      quietHours: {
        ...notificationSettings.quietHours,
        [field]: value
      }
    })
  }

  const handleExportNotifications = () => {
    toast.loading('Preparing export...')
    
    setTimeout(() => {
      const exportData = notifications.map(notification => ({
        ...notification,
        exportedAt: new Date().toISOString()
      }))
      
      // Simular download
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      toast.success(
        <div>
          <p className="font-semibold">Notifications Exported</p>
          <a 
            href={dataUri} 
            download="notifications.json"
            className="text-sm text-primary-600 hover:text-primary-800 block mt-1"
          >
            Click to download notifications.json
          </a>
        </div>,
        { duration: 5000 }
      )
    }, 1500)
  }

  const handleSaveSettings = () => {
    toast.loading('Saving settings...')
    
    setTimeout(() => {
      setShowSettings(false)
      toast.success('Notification settings saved successfully')
    }, 1000)
  }

  const handleAdvancedSettings = () => {
    toast.success(
      <div>
        <p className="font-semibold">Advanced Settings</p>
        <p className="text-sm mt-1">Team notification rules and automation workflows opened in new tab</p>
      </div>,
      { duration: 3000 }
    )
  }

  const handleTakeAction = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId)
    toast.success(
      <div>
        <p className="font-semibold">Action Taken</p>
        <p className="text-sm mt-1">Processing: {notification.title}</p>
      </div>,
      { duration: 3000 }
    )
  }

  // Filtrar notificações
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    if (filter === 'high') return notification.priority === 'high'
    if (filter === 'medium') return notification.priority === 'medium'
    if (filter === 'low') return notification.priority === 'low'
    return notification.type === filter
  })

  // Estatísticas
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    high: notifications.filter(n => n.priority === 'high').length,
    today: notifications.filter(n => n.timestamp.includes('minute') || n.timestamp.includes('hour')).length
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Notifications | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with your business activities</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleSettingsClick} // ✅ AGORA FUNCIONA
                className="btn-secondary flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showSettings ? 'Close Settings' : 'Settings'}
              </button>
              <button 
                onClick={handleMarkAllAsRead} // ✅ AGORA FUNCIONA
                disabled={stats.unread === 0}
                className={`btn-primary flex items-center ${stats.unread === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.high}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === 'unread' ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === 'read' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Read
                </button>
                <button
                  onClick={() => setFilter('high')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === 'high' ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  High Priority
                </button>
                <button
                  onClick={() => setFilter('medium')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setFilter('low')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === 'low' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Low
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleArchiveAll}
                  disabled={notifications.filter(n => n.read).length === 0}
                  className={`btn-secondary text-sm ${notifications.filter(n => n.read).length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Read
                </button>
                <button
                  onClick={handleExportNotifications}
                  className="btn-secondary text-sm"
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <BellOff className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">No notifications</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => {
                  const Icon = notification.icon
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-6 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className={`h-10 w-10 rounded-lg ${notification.bgColor} flex items-center justify-center mr-4 flex-shrink-0`}>
                          <Icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h4 className="text-sm font-semibold text-gray-900">
                                {notification.title}
                              </h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </span>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              {notification.timestamp}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-3 mt-4">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={() => handleTakeAction(notification.id)}
                              className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                            >
                              Take action
                            </button>
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-sm text-red-600 hover:text-red-800 font-medium ml-auto flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Notification Channels */}
              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <h4 className="text-sm font-semibold text-gray-900">Email Notifications</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(notificationSettings.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <button
                          onClick={() => handleToggleNotificationSetting('email', key)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full ${value ? 'bg-primary-600' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${value ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <h4 className="text-sm font-semibold text-gray-900">Push Notifications</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(notificationSettings.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <button
                          onClick={() => handleToggleNotificationSetting('push', key)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full ${value ? 'bg-primary-600' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${value ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <h4 className="text-sm font-semibold text-gray-900">SMS Notifications</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(notificationSettings.sms).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <button
                          onClick={() => handleToggleNotificationSetting('sms', key)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full ${value ? 'bg-primary-600' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${value ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frequency Settings */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Notification Frequency</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['realtime', 'hourly', 'daily', 'weekly'].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => handleUpdateFrequency(freq)}
                        className={`p-3 rounded-lg border text-sm font-medium ${notificationSettings.frequency === freq ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiet Hours */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Quiet Hours</h4>
                      <p className="text-sm text-gray-600">Pause notifications during specific hours</p>
                    </div>
                    <button
                      onClick={handleToggleQuietHours}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.quietHours.enabled ? 'bg-primary-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {notificationSettings.quietHours.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          className="input-field"
                          value={notificationSettings.quietHours.start}
                          onChange={(e) => handleUpdateQuietHours('start', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          className="input-field"
                          value={notificationSettings.quietHours.end}
                          onChange={(e) => handleUpdateQuietHours('end', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary Email */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Daily Summary Email</h4>
                    <p className="text-sm text-gray-600">Receive a daily digest of all notifications</p>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      summaryEmail: !notificationSettings.summaryEmail
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.summaryEmail ? 'bg-primary-600' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.summaryEmail ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Save Settings */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSaveSettings}
                    className="btn-primary"
                  >
                    Save Settings
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Need more control?</h3>
                <p className="opacity-90 mt-2">
                  Customize notifications for each team member and set up advanced rules
                </p>
              </div>
              <button 
                onClick={handleAdvancedSettings}
                className="btn-white mt-4 md:mt-0"
              >
                <Settings className="h-5 w-5 mr-2" />
                Advanced Settings
              </button>
            </div>
          </div>

          {/* Pagination */}
          {filteredNotifications.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredNotifications.length}</span> of{' '}
                <span className="font-medium">{notifications.length}</span> notifications
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toast.error('Previous page not available in demo')}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
                <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  1
                </button>
                <button 
                  onClick={() => toast.error('Page 2 not available in demo')}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  2
                </button>
                <button 
                  onClick={() => toast.error('Page 3 not available in demo')}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  3
                </button>
                <button 
                  onClick={() => toast.error('Next page not available in demo')}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
