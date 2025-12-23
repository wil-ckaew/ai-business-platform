import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { Settings, User, Globe, Bell, Palette, Mail, CreditCard, Database, Save, X, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  // User Profile
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@business.com',
    company: 'TechCorp Inc.',
    role: 'Administrator',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'en',
    bio: 'Senior Business Analyst with focus on AI-driven solutions.'
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    email: {
      sales: true,
      customers: true,
      reports: true,
      security: true,
      newsletter: false
    },
    push: {
      sales: true,
      customers: false,
      reports: true,
      security: true
    },
    frequency: 'realtime',
    quietHours: { start: '22:00', end: '07:00', enabled: false }
  })

  // Appearance
  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    density: 'comfortable',
    sidebar: 'expanded',
    animations: true
  })

  // Billing
  const [billing, setBilling] = useState({
    plan: 'enterprise',
    status: 'active',
    nextBilling: '2024-02-15',
    paymentMethod: 'visa',
    autoRenew: true
  })

  // API Settings
  const [apiSettings, setApiSettings] = useState({
    enabled: true,
    rateLimit: 1000,
    webhooks: [],
    newWebhook: { url: '', events: [] }
  })

  // Data & Privacy
  const [privacy, setPrivacy] = useState({
    dataRetention: 365,
    analytics: true,
    shareData: false,
    exportData: true
  })

  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showApiKey, setShowApiKey] = useState(false)

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'api', name: 'API', icon: Database },
    { id: 'privacy', name: 'Data & Privacy', icon: Globe }
  ]

  const handleSaveSettings = () => {
    setIsSaving(true)
    toast.loading('Saving settings...')
    
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Settings saved successfully!')
    }, 1500)
  }

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      toast.success('Settings reset to default values')
    }
  }

  const handleAddWebhook = () => {
    if (!apiSettings.newWebhook.url) {
      toast.error('Please enter a webhook URL')
      return
    }

    setApiSettings({
      ...apiSettings,
      webhooks: [...apiSettings.webhooks, { ...apiSettings.newWebhook, id: Date.now() }],
      newWebhook: { url: '', events: [] }
    })
    toast.success('Webhook added successfully')
  }

  const handleRemoveWebhook = (webhookId) => {
    setApiSettings({
      ...apiSettings,
      webhooks: apiSettings.webhooks.filter(w => w.id !== webhookId)
    })
    toast.success('Webhook removed')
  }

  const handleExportData = () => {
    toast.loading('Preparing data export...')
    setTimeout(() => {
      toast.success('Data export prepared. Check your email for download link.')
    }, 2000)
  }

  const generateApiKey = () => {
    const key = 'sk_live_' + Array.from({length: 32}, () => 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))
    ).join('')
    
    toast.success('New API key generated')
    return key
  }

  const apiKey = generateApiKey()

  return (
    <DashboardLayout>
      <Head>
        <title>Settings | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Configure your account and platform preferences</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleResetSettings}
                className="btn-secondary"
              >
                Reset to Default
              </button>
              <button 
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="btn-primary flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Settings Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-xl font-semibold">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                      <p className="text-gray-600">{profile.role} • {profile.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="input-field"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={profile.company}
                        onChange={(e) => setProfile({...profile, company: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="input-field"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select 
                        className="input-field"
                        value={profile.timezone}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select 
                        className="input-field"
                        value={profile.language}
                        onChange={(e) => setProfile({...profile, language: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="pt">Portuguese</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      className="input-field min-h-[100px]"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {Object.entries(notifications.email).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </p>
                            <p className="text-xs text-gray-500">
                              Receive email notifications for {key}
                            </p>
                          </div>
                          <button
                            onClick={() => setNotifications({
                              ...notifications,
                              email: {...notifications.email, [key]: !value}
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${value ? 'bg-success-600' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      {Object.entries(notifications.push).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </p>
                          </div>
                          <button
                            onClick={() => setNotifications({
                              ...notifications,
                              push: {...notifications.push, [key]: !value}
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${value ? 'bg-primary-600' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Frequency</h3>
                    <select 
                      className="input-field"
                      value={notifications.frequency}
                      onChange={(e) => setNotifications({...notifications, frequency: e.target.value})}
                    >
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly digest</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly digest</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Quiet Hours</h3>
                      <button
                        onClick={() => setNotifications({
                          ...notifications,
                          quietHours: {...notifications.quietHours, enabled: !notifications.quietHours.enabled}
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.quietHours.enabled ? 'bg-primary-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    {notifications.quietHours.enabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time
                          </label>
                          <input
                            type="time"
                            className="input-field"
                            value={notifications.quietHours.start}
                            onChange={(e) => setNotifications({
                              ...notifications,
                              quietHours: {...notifications.quietHours, start: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Time
                          </label>
                          <input
                            type="time"
                            className="input-field"
                            value={notifications.quietHours.end}
                            onChange={(e) => setNotifications({
                              ...notifications,
                              quietHours: {...notifications.quietHours, end: e.target.value}
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['light', 'dark', 'auto'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setAppearance({...appearance, theme})}
                          className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                            appearance.theme === theme ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`h-8 w-full rounded mb-2 ${
                            theme === 'light' ? 'bg-gray-100' : 
                            theme === 'dark' ? 'bg-gray-800' : 
                            'bg-gradient-to-r from-gray-100 to-gray-800'
                          }`} />
                          <span className="text-sm font-medium capitalize">{theme}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Size</h3>
                    <div className="flex gap-4">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAppearance({...appearance, fontSize: size})}
                          className={`px-4 py-2 rounded-lg border ${
                            appearance.fontSize === size ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className={`${
                            size === 'small' ? 'text-sm' :
                            size === 'medium' ? 'text-base' : 'text-lg'
                          } font-medium capitalize`}>
                            {size}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interface Density</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['compact', 'comfortable', 'spacious'].map((density) => (
                        <button
                          key={density}
                          onClick={() => setAppearance({...appearance, density})}
                          className={`p-4 rounded-lg border-2 ${
                            appearance.density === density ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className={`${
                              density === 'compact' ? 'h-2' :
                              density === 'comfortable' ? 'h-4' : 'h-6'
                            } bg-gray-300 rounded w-full`} />
                            <div className={`${
                              density === 'compact' ? 'h-2' :
                              density === 'comfortable' ? 'h-4' : 'h-6'
                            } bg-gray-300 rounded w-3/4`} />
                          </div>
                          <span className="text-sm font-medium capitalize mt-2 block">{density}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Animations</h3>
                        <p className="text-sm text-gray-600">Enable interface animations and transitions</p>
                      </div>
                      <button
                        onClick={() => setAppearance({...appearance, animations: !appearance.animations})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${appearance.animations ? 'bg-primary-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${appearance.animations ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full capitalize">
                            {billing.plan}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            billing.status === 'active' 
                              ? 'bg-success-100 text-success-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {billing.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button className="btn-primary">Upgrade Plan</button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600">Next Billing Date</p>
                          <p className="text-lg font-semibold text-gray-900">{billing.nextBilling}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment Method</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="h-8 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">•••• 4242</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Auto Renew</p>
                            <p className="text-xs text-gray-500">Automatically renew your subscription</p>
                          </div>
                          <button
                            onClick={() => setBilling({...billing, autoRenew: !billing.autoRenew})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${billing.autoRenew ? 'bg-primary-600' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${billing.autoRenew ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                        <button className="btn-secondary w-full">Download Invoices</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Tab */}
              {activeTab === 'api' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">API Access</h3>
                      <button
                        onClick={() => setApiSettings({...apiSettings, enabled: !apiSettings.enabled})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${apiSettings.enabled ? 'bg-primary-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${apiSettings.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      Enable or disable API access for your account. When disabled, all API requests will be rejected.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">API Key</h3>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={apiKey}
                          readOnly
                          className="input-field pr-12 font-mono"
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey)
                          toast.success('API key copied to clipboard')
                        }}
                        className="btn-secondary"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => {
                          const newKey = generateApiKey()
                          toast.success('New API key generated')
                        }}
                        className="btn-primary"
                      >
                        Regenerate
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Keep your API key secure. Do not share it publicly.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limiting</h3>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="100"
                        max="5000"
                        step="100"
                        value={apiSettings.rateLimit}
                        onChange={(e) => setApiSettings({...apiSettings, rateLimit: parseInt(e.target.value)})}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900">{apiSettings.rateLimit} requests/hour</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhooks</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <input
                          type="url"
                          placeholder="https://example.com/webhook"
                          className="input-field flex-1"
                          value={apiSettings.newWebhook.url}
                          onChange={(e) => setApiSettings({
                            ...apiSettings,
                            newWebhook: {...apiSettings.newWebhook, url: e.target.value}
                          })}
                        />
                        <button
                          onClick={handleAddWebhook}
                          className="btn-primary"
                        >
                          Add Webhook
                        </button>
                      </div>
                      
                      {apiSettings.webhooks.length > 0 ? (
                        <div className="space-y-3">
                          {apiSettings.webhooks.map((webhook) => (
                            <div key={webhook.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{webhook.url}</p>
                                <p className="text-sm text-gray-500">
                                  {webhook.events.length > 0 ? webhook.events.join(', ') : 'No events selected'}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveWebhook(webhook.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No webhooks configured</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Data & Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Retention</h3>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="30"
                        max="730"
                        step="30"
                        value={privacy.dataRetention}
                        onChange={(e) => setPrivacy({...privacy, dataRetention: parseInt(e.target.value)})}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900">{privacy.dataRetention} days</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      How long we keep your data before automatically deleting it.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Usage Analytics</p>
                        <p className="text-xs text-gray-500">Help us improve by sharing anonymous usage data</p>
                      </div>
                      <button
                        onClick={() => setPrivacy({...privacy, analytics: !privacy.analytics})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${privacy.analytics ? 'bg-primary-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${privacy.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Share Data with Partners</p>
                        <p className="text-xs text-gray-500">Allow sharing anonymized data with trusted partners</p>
                      </div>
                      <button
                        onClick={() => setPrivacy({...privacy, shareData: !privacy.shareData})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${privacy.shareData ? 'bg-primary-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${privacy.shareData ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Export Data</p>
                        <p className="text-xs text-gray-500">Enable automatic data exports</p>
                      </div>
                      <button
                        onClick={() => setPrivacy({...privacy, exportData: !privacy.exportData})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${privacy.exportData ? 'bg-primary-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${privacy.exportData ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleExportData}
                        className="btn-secondary"
                      >
                        Export All Data
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
                            toast.loading('Deleting data...')
                            setTimeout(() => {
                              toast.success('Data deletion scheduled')
                            }, 2000)
                          }
                        }}
                        className="btn-secondary text-red-600 hover:text-red-800 hover:border-red-300"
                      >
                        Delete All Data
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
