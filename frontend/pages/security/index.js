import { useState } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../components/layout/DashboardLayout'
import PageWrapper from '../../components/layout/PageWrapper'
import { 
  Shield, Lock, Key, UserCheck, Eye, EyeOff, Bell, Globe, 
  ShieldCheck, AlertTriangle, CheckCircle, XCircle, RefreshCw, 
  LogOut, History, Users, Fingerprint, Download as DownloadIcon 
} from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function SecurityPage() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: ['192.168.1.1', '10.0.0.1', '203.0.113.5'],
    apiAccess: false,
    autoLogout: true,
    auditLogging: true
  })

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newIp, setNewIp] = useState('')
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'New York, USA', ip: '192.168.1.100', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'San Francisco, USA', ip: '10.0.0.25', lastActive: '5 hours ago', current: false },
    { id: 3, device: 'Firefox on Mac', location: 'London, UK', ip: '203.0.113.42', lastActive: '2 days ago', current: false }
  ])

  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, event: 'Successful login', user: 'alex@business.com', ip: '192.168.1.100', timestamp: '2024-01-15 14:30:22', severity: 'info' },
    { id: 2, event: 'Password changed', user: 'alex@business.com', ip: '192.168.1.100', timestamp: '2024-01-15 14:25:10', severity: 'info' },
    { id: 3, event: 'Failed login attempt', user: 'unknown', ip: '45.67.89.123', timestamp: '2024-01-15 13:45:33', severity: 'warning' },
    { id: 4, event: '2FA enabled', user: 'alex@business.com', ip: '192.168.1.100', timestamp: '2024-01-14 09:15:44', severity: 'info' },
    { id: 5, event: 'API key generated', user: 'alex@business.com', ip: '10.0.0.25', timestamp: '2024-01-13 16:20:18', severity: 'info' },
    { id: 6, event: 'Suspicious activity detected', user: 'alex@business.com', ip: '203.0.113.42', timestamp: '2024-01-12 22:05:59', severity: 'danger' }
  ])

  // ========== HANDLERS CORRIGIDOS ==========
  
  const handleRunSecurityAudit = () => {
    toast.loading('Running security audit...')
    
    setTimeout(() => {
      // Simular auditoria de segurança
      const issues = [
        { type: 'warning', message: '2 devices still use old passwords' },
        { type: 'success', message: 'Two-factor authentication is enabled' },
        { type: 'warning', message: '3 sessions older than 30 days' },
        { type: 'success', message: 'Firewall rules are up to date' },
        { type: 'danger', message: '1 critical vulnerability found' }
      ]
      
      toast.dismiss()
      
      // Mostrar relatório em toast
      toast.success(
        <div>
          <p className="font-semibold">Security Audit Complete</p>
          <ul className="text-sm mt-1">
            {issues.map((issue, idx) => (
              <li key={idx} className={`flex items-center ${idx < issues.length - 1 ? 'mb-1' : ''}`}>
                {issue.type === 'success' && <CheckCircle className="h-3 w-3 text-green-500 mr-2" />}
                {issue.type === 'warning' && <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />}
                {issue.type === 'danger' && <AlertTriangle className="h-3 w-3 text-red-500 mr-2" />}
                {issue.message}
              </li>
            ))}
          </ul>
        </div>,
        { duration: 5000 }
      )
    }, 2000)
  }

  const handleUpdateSecuritySetting = (setting, value) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: value
    })
    toast.success('Security setting updated')
  }

  const handleChangePassword = () => {
    if (!password.current || !password.new || !password.confirm) {
      toast.error('Please fill in all password fields')
      return
    }

    if (password.new !== password.confirm) {
      toast.error('New passwords do not match')
      return
    }

    if (password.new.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    toast.loading('Updating password...')
    setTimeout(() => {
      setPassword({ current: '', new: '', confirm: '' })
      toast.success('Password updated successfully')
    }, 1500)
  }

  const handleAddIp = () => {
    if (!newIp) {
      toast.error('Please enter an IP address')
      return
    }

    // Basic IP validation
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
    if (!ipRegex.test(newIp)) {
      toast.error('Please enter a valid IP address')
      return
    }

    setSecuritySettings({
      ...securitySettings,
      ipWhitelist: [...securitySettings.ipWhitelist, newIp]
    })
    setNewIp('')
    toast.success('IP address added to whitelist')
  }

  const handleRemoveIp = (ipToRemove) => {
    setSecuritySettings({
      ...securitySettings,
      ipWhitelist: securitySettings.ipWhitelist.filter(ip => ip !== ipToRemove)
    })
    toast.success('IP address removed from whitelist')
  }

  const handleTerminateSession = (sessionId) => {
    if (window.confirm('Are you sure you want to terminate this session?')) {
      setActiveSessions(activeSessions.filter(session => session.id !== sessionId))
      toast.success('Session terminated')
    }
  }

  const handleGenerateBackupCode = () => {
    const code = Array.from({length: 10}, () => 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36))
    ).join('')
    
    toast.success(
      <div>
        <p className="font-semibold">Backup Code Generated</p>
        <p className="text-sm font-mono mt-1 bg-gray-100 p-2 rounded">{code}</p>
        <p className="text-xs text-gray-600 mt-1">Save this code in a secure location</p>
      </div>,
      { duration: 10000 }
    )
  }

  const handleExportLogs = () => {
    toast.loading('Preparing logs export...')
    
    setTimeout(() => {
      const logsData = securityLogs.map(log => ({
        ...log,
        exportedAt: new Date().toISOString()
      }))
      
      // Simular download
      const dataStr = JSON.stringify(logsData, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      toast.success(
        <div>
          <p className="font-semibold">Logs Exported Successfully</p>
          <a 
            href={dataUri} 
            download="security-logs.json"
            className="text-sm text-primary-600 hover:text-primary-800 block mt-1"
          >
            Click to download security-logs.json
          </a>
        </div>,
        { duration: 5000 }
      )
    }, 1500)
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'danger': return 'bg-red-100 text-red-800 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const securityScore = 85 // Calculate based on settings

  return (
    <DashboardLayout>
      <Head>
        <title>Security | AI Business Platform</title>
      </Head>
      
      <PageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Security</h1>
              <p className="text-gray-600">Manage your account security and access controls</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium text-primary-600">
                    Security Score: {securityScore}/100
                  </span>
                </div>
              </div>
              <button 
                onClick={handleRunSecurityAudit} // ✅ AGORA FUNCIONA
                className="btn-primary flex items-center"
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                Run Security Audit
              </button>
            </div>
          </div>

          {/* Security Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">2FA Status</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Sessions</p>
                    <p className="text-lg font-semibold text-gray-900">{activeSessions.length}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-warning-100 flex items-center justify-center mr-3">
                    <AlertTriangle className="h-6 w-6 text-warning-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Failed Logins</p>
                    <p className="text-lg font-semibold text-gray-900">3 (24h)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">IP Whitelist</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {securitySettings.ipWhitelist.length} IPs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Security Settings */}
            <div className="space-y-6">
              {/* Password Change */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="input-field pr-10"
                        value={password.current}
                        onChange={(e) => setPassword({...password, current: e.target.value})}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        className="input-field pr-10"
                        value={password.new}
                        onChange={(e) => setPassword({...password, new: e.target.value})}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters with uppercase, lowercase, and numbers
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="input-field pr-10"
                        value={password.confirm}
                        onChange={(e) => setPassword({...password, confirm: e.target.value})}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="btn-primary w-full"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button
                    onClick={() => handleUpdateSecuritySetting('twoFactorAuth', !securitySettings.twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      securitySettings.twoFactorAuth ? 'bg-success-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {securitySettings.twoFactorAuth && (
                  <div className="space-y-4 mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Fingerprint className="h-5 w-5 text-primary-600 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Authenticator App</p>
                            <p className="text-xs text-gray-600">Use Google Authenticator or similar</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => toast.success('Authenticator app configuration opened')}
                          className="btn-secondary text-sm"
                        >
                          Configure
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateBackupCode}
                      className="btn-secondary w-full"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Generate Backup Codes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sessions & IP Whitelist */}
            <div className="space-y-6">
              {/* Active Sessions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                  <span className="text-sm text-gray-600">{activeSessions.length} active</span>
                </div>
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className={`p-4 border rounded-lg ${
                      session.current ? 'border-primary-200 bg-primary-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{session.device}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{session.location}</span>
                            <span>•</span>
                            <span>{session.ip}</span>
                            <span>•</span>
                            <span>Last active: {session.lastActive}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.current && (
                            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
                              Current
                            </span>
                          )}
                          {!session.current && (
                            <button
                              onClick={() => handleTerminateSession(session.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Terminate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IP Whitelist */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">IP Whitelist</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Only allow access from trusted IP addresses
                </p>

                <div className="space-y-3 mb-4">
                  {securitySettings.ipWhitelist.map((ip, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="font-mono text-gray-900">{ip}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveIp(ip)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input-field flex-1"
                    placeholder="Enter IP address (e.g., 192.168.1.1)"
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                  />
                  <button
                    onClick={handleAddIp}
                    className="btn-primary"
                  >
                    Add IP
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-600">Receive security alerts via email</p>
                </div>
                <button
                  onClick={() => handleUpdateSecuritySetting('emailNotifications', !securitySettings.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    securitySettings.emailNotifications ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    securitySettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Login Alerts</p>
                  <p className="text-xs text-gray-600">Alert on new device login</p>
                </div>
                <button
                  onClick={() => handleUpdateSecuritySetting('loginAlerts', !securitySettings.loginAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    securitySettings.loginAlerts ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto Logout</p>
                  <p className="text-xs text-gray-600">Logout after period of inactivity</p>
                </div>
                <button
                  onClick={() => handleUpdateSecuritySetting('autoLogout', !securitySettings.autoLogout)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    securitySettings.autoLogout ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    securitySettings.autoLogout ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Audit Logging</p>
                  <p className="text-xs text-gray-600">Log all security events</p>
                </div>
                <button
                  onClick={() => handleUpdateSecuritySetting('auditLogging', !securitySettings.auditLogging)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    securitySettings.auditLogging ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Session Timeout</p>
                  <p className="text-xs text-gray-600">Minutes before auto logout</p>
                </div>
                <select 
                  className="input-field w-24"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => handleUpdateSecuritySetting('sessionTimeout', parseInt(e.target.value))}
                >
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="120">120 min</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Password Expiry</p>
                  <p className="text-xs text-gray-600">Days before password expires</p>
                </div>
                <select 
                  className="input-field w-24"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => handleUpdateSecuritySetting('passwordExpiry', parseInt(e.target.value))}
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Logs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Security Logs</h3>
              <button 
                onClick={handleExportLogs} // ✅ AGORA FUNCIONA
                className="btn-secondary text-sm flex items-center"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export Logs
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.event}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {log.user}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {log.ip}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {log.timestamp}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                          {log.severity.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
