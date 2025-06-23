'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Settings,
  Shield,
  Bell,
  Key,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  Save,
  RefreshCw,
  CheckCircle,
  Monitor,
  Smartphone,
  Mail,
  DollarSign,
  Activity,
  GitBranch,
  Users,
  Edit,
  AlertTriangle,
} from 'lucide-react'
import { MOCK_SECURITY_SETTINGS, MOCK_SYSTEM_SETTINGS, MOCK_APPROVAL_WORKFLOWS } from '@/lib/mock-data'
import type { SecuritySettings, ApprovalWorkflow } from '@/types'

/**
 * Settings management page component
 * Displays system settings, security configuration, and preferences
 */
export default function SettingsPage() {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(
    MOCK_SECURITY_SETTINGS
  )
  const [systemSettings, setSystemSettings] = useState(MOCK_SYSTEM_SETTINGS)
  const [isGeneratingApiKey, setIsGeneratingApiKey] = useState(false)
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [showApiKey, setShowApiKey] = useState<string | null>(null)
  const [newApiKey, setNewApiKey] = useState('')
  const [approvalWorkflows, setApprovalWorkflows] = useState<ApprovalWorkflow[]>(
    MOCK_APPROVAL_WORKFLOWS as unknown as ApprovalWorkflow[]
  )
  const [selectedWorkflow, setSelectedWorkflow] = useState<ApprovalWorkflow | null>(null)
  const [isEditingWorkflow, setIsEditingWorkflow] = useState(false)

  const handleToggleTwoFactor = () => {
    setSecuritySettings(prev => ({
      ...prev,
      twoFactorAuth: {
        ...prev.twoFactorAuth,
        enabled: !prev.twoFactorAuth.enabled,
      },
    }))
  }

  const handleToggleIpWhitelist = () => {
    setSecuritySettings(prev => ({
      ...prev,
      ipWhitelist: {
        ...prev.ipWhitelist,
        enabled: !prev.ipWhitelist.enabled,
      },
    }))
  }

  const handleGenerateApiKey = () => {
    setIsGeneratingApiKey(true)
    // Simulate API key generation
    setTimeout(() => {
      const apiKey = `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      const newKey = {
        id: `key-${Date.now()}`,
        name: newApiKeyName,
        key: apiKey,
        permissions: ['read'],
        createdAt: new Date().toISOString(),
        lastUsed: null,
        status: 'active' as const,
      }
      setSecuritySettings(prev => ({
        ...prev,
        apiKeys: [...prev.apiKeys, newKey] as readonly any[],
      }))
      setNewApiKey(apiKey)
      setNewApiKeyName('')
      setIsGeneratingApiKey(false)
    }, 1000)
  }

  const handleDeleteApiKey = (keyId: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.filter(key => key.id !== keyId) as readonly any[],
    }))
  }

  const handleToggleApiKey = (keyId: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.map(key =>
        key.id === keyId
          ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
          : key
      ) as readonly any[],
    }))
  }

  const handleUpdateSystemSetting = (
    category: string,
    key: string,
    value: any
  ) => {
    setSystemSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as Record<string, any> || {}),
        [key]: value,
      },
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'inactive':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const handleToggleWorkflowStatus = (workflowId: string) => {
    setApprovalWorkflows(prev =>
      prev.map(workflow =>
        workflow.id === workflowId
          ? { ...workflow, isActive: !workflow.isActive }
          : workflow
      )
    )
  }

  const handleDeleteWorkflow = (workflowId: string) => {
    setApprovalWorkflows(prev =>
      prev.filter(workflow => workflow.id !== workflowId)
    )
  }

  const handleSelectWorkflow = (workflow: ApprovalWorkflow) => {
    setSelectedWorkflow(workflow)
    setIsEditingWorkflow(true)
  }

  const handleCreateNewWorkflow = () => {
    const newWorkflow: ApprovalWorkflow = {
      id: `workflow-${Date.now()}`,
      name: 'New Approval Workflow',
      description: 'Description for the new workflow',
      rules: [
        { condition: 'amount < 10000', requiredApprovals: 1, approvers: ['manager'] },
      ],
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setSelectedWorkflow(newWorkflow)
    setIsEditingWorkflow(true)
  }

  const handleSaveWorkflow = (workflow: ApprovalWorkflow) => {
    if (approvalWorkflows.some(w => w.id === workflow.id)) {
      // Update existing workflow
      setApprovalWorkflows(prev =>
        prev.map(w => (w.id === workflow.id ? { ...workflow, updatedAt: new Date().toISOString() } : w))
      )
    } else {
      // Add new workflow
      setApprovalWorkflows(prev => [...prev, { ...workflow, updatedAt: new Date().toISOString() }])
    }
    setSelectedWorkflow(null)
    setIsEditingWorkflow(false)
  }

  const handleCancelEditWorkflow = () => {
    setSelectedWorkflow(null)
    setIsEditingWorkflow(false)
  }

  return (
    <div className='space-y-6 px-4'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent'>
            System Settings
          </h1>
          <p className='mt-2 text-slate-600 dark:text-slate-300'>
            Configure system preferences, security, and integrations
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <Badge
            variant='outline'
            className='border-green-200 bg-green-50 text-green-700'
          >
            <CheckCircle className='mr-1 h-3 w-3' />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue='general' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-6'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='workflows'>Workflows</TabsTrigger>
          <TabsTrigger value='api'>API Keys</TabsTrigger>
          <TabsTrigger value='audit'>Audit Logs</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value='general' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* System Configuration */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Settings className='mr-2 h-5 w-5 text-blue-600' />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Basic system settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='system-name'>System Name</Label>
                  <Input
                    id='system-name'
                    value={systemSettings.general.siteName}
                    onChange={e =>
                      handleUpdateSystemSetting(
                        'general',
                        'siteName',
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='timezone'>Timezone</Label>
                  <Select
                    value={systemSettings.general.timezone}
                    onValueChange={value =>
                      handleUpdateSystemSetting('general', 'timezone', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='UTC'>UTC</SelectItem>
                      <SelectItem value='America/New_York'>
                        Eastern Time
                      </SelectItem>
                      <SelectItem value='America/Los_Angeles'>
                        Pacific Time
                      </SelectItem>
                      <SelectItem value='Europe/London'>London</SelectItem>
                      <SelectItem value='Asia/Tokyo'>Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor='currency'>Default Currency</Label>
                  <Select
                    value={systemSettings.general.currency}
                    onValueChange={value =>
                      handleUpdateSystemSetting(
                        'general',
                        'currency',
                        value
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='USD'>USD - US Dollar</SelectItem>
                      <SelectItem value='EUR'>EUR - Euro</SelectItem>
                      <SelectItem value='GBP'>GBP - British Pound</SelectItem>
                      <SelectItem value='JPY'>JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className='text-sm text-slate-500'>
                      Enable to restrict system access
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.general.maintenanceMode}
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting(
                        'general',
                        'maintenanceMode',
                        checked
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transaction Limits */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <DollarSign className='mr-2 h-5 w-5 text-green-600' />
                  Transaction Limits
                </CardTitle>
                <CardDescription>
                  Configure transaction amount limits
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='daily-limit'>
                    Daily Transaction Limit (USD)
                  </Label>
                  <Input
                    id='daily-limit'
                    type='number'
                    value={systemSettings.limits.dailyTransactionLimit}
                    onChange={e =>
                      handleUpdateSystemSetting(
                        'limits',
                        'dailyTransactionLimit',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='single-limit'>
                    Single Transaction Limit (USD)
                  </Label>
                  <Input
                    id='single-limit'
                    type='number'
                    value={systemSettings.limits.maxTransactionAmount}
                    onChange={e =>
                      handleUpdateSystemSetting(
                        'limits',
                        'maxTransactionAmount',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='monthly-limit'>
                    Monthly Transaction Limit (USD)
                  </Label>
                  <Input
                    id='monthly-limit'
                    type='number'
                    value={systemSettings.limits.monthlyTransactionLimit}
                    onChange={e =>
                      handleUpdateSystemSetting(
                        'limits',
                        'monthlyTransactionLimit',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='approval-threshold'>
                    Daily Transaction Limit (USD)
                  </Label>
                  <Input
                    id='approval-threshold'
                    type='number'
                    value={systemSettings.limits.dailyTransactionLimit}
                    onChange={e =>
                      handleUpdateSystemSetting(
                        'limits',
                        'dailyTransactionLimit',
                        parseInt(e.target.value)
                      )
                    }
                  />
                  <p className='mt-1 text-xs text-slate-500'>
                    Maximum daily transaction limit per user
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='flex justify-end'>
            <Button>
              <Save className='mr-2 h-4 w-4' />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value='security' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Authentication */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Shield className='mr-2 h-5 w-5 text-blue-600' />
                  Authentication
                </CardTitle>
                <CardDescription>
                  Configure authentication and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className='text-sm text-slate-500'>
                      Require 2FA for all users
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth.enabled}
                    onCheckedChange={handleToggleTwoFactor}
                  />
                </div>
                {securitySettings.twoFactorAuth.enabled && (
                  <div className='ml-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950'>
                    <p className='text-sm text-blue-700 dark:text-blue-300'>
                      Method: {securitySettings.twoFactorAuth.method}
                    </p>
                    <p className='text-xs text-blue-600 dark:text-blue-400'>
                      Backup codes: {securitySettings.twoFactorAuth.backupCodes}{' '}
                      available
                    </p>
                  </div>
                )}
                <div>
                  <Label htmlFor='session-timeout'>
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id='session-timeout'
                    type='number'
                    value={systemSettings.security.sessionTimeout}
                    onChange={e =>
                      handleUpdateSystemSetting(
                        'security',
                        'sessionTimeout',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='password-length'>Password Min Length</Label>
                  <Input
                    id='password-length'
                    type='number'
                    value={systemSettings.security.passwordMinLength}
                    onChange={e =>
                      handleUpdateSystemSetting(
                        'security',
                        'passwordMinLength',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* IP Whitelist */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Globe className='mr-2 h-5 w-5 text-green-600' />
                  IP Whitelist
                </CardTitle>
                <CardDescription>
                  Restrict access to specific IP addresses
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Enable IP Whitelist</Label>
                    <p className='text-sm text-slate-500'>
                      Only allow access from whitelisted IPs
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.ipWhitelist.enabled}
                    onCheckedChange={handleToggleIpWhitelist}
                  />
                </div>
                {securitySettings.ipWhitelist.enabled && (
                  <div className='space-y-2'>
                    <Label>Whitelisted IP Addresses</Label>
                    {securitySettings.ipWhitelist.addresses.map((ip, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between rounded bg-slate-50 p-2 dark:bg-slate-800'
                      >
                        <span className='font-mono text-sm'>{ip}</span>
                        <Button variant='ghost' size='sm'>
                          <Trash2 className='h-3 w-3' />
                        </Button>
                      </div>
                    ))}
                    <div className='flex space-x-2'>
                      <Input placeholder='192.168.1.1' className='flex-1' />
                      <Button size='sm'>
                        <Plus className='mr-1 h-3 w-3' />
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Active Sessions */}
          <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Activity className='mr-2 h-5 w-5 text-orange-600' />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Monitor and manage active user sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securitySettings.activeSessions.map(session => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <p className='text-sm font-medium'>
                            {session.userId}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {session.userAgent}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center space-x-2'>
                          {session.deviceType === 'desktop' ? (
                            <Monitor className='h-4 w-4 text-slate-500' />
                          ) : (
                            <Smartphone className='h-4 w-4 text-slate-500' />
                          )}
                          <span className='text-sm capitalize'>
                            {session.deviceType}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className='font-mono text-sm'>
                          {session.ipAddress}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className='text-sm'>{session.location}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className='text-sm'>
                            {new Date(session.startTime).toLocaleDateString()}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {new Date(session.startTime).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className='text-sm'>
                            {new Date(
                              session.lastActivity
                            ).toLocaleDateString()}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {new Date(
                              session.lastActivity
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='text-red-600'
                        >
                          Terminate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value='notifications' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Email Notifications */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Mail className='mr-2 h-5 w-5 text-blue-600' />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure email notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Transaction Alerts</Label>
                    <p className='text-sm text-slate-500'>
                      Get notified of new transactions
                    </p>
                  </div>
                  <Switch
                    checked={
                      systemSettings.notifications.emailSettings.transactionAlerts
                    }
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'emailSettings', {
                        ...systemSettings.notifications.emailSettings,
                        transactionAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Security Alerts</Label>
                    <p className='text-sm text-slate-500'>
                      Get notified of security events
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.notifications.emailSettings.securityAlerts}
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'emailSettings', {
                        ...systemSettings.notifications.emailSettings,
                        securityAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>System Updates</Label>
                    <p className='text-sm text-slate-500'>
                      Get notified of system updates
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.notifications.emailSettings.systemUpdates}
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'emailSettings', {
                        ...systemSettings.notifications.emailSettings,
                        systemUpdates: checked,
                      })
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Daily Reports</Label>
                    <p className='text-sm text-slate-500'>
                      Receive daily activity reports
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.notifications.emailSettings.dailyReports}
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'emailSettings', {
                        ...systemSettings.notifications.emailSettings,
                        dailyReports: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Bell className='mr-2 h-5 w-5 text-orange-600' />
                  Push Notifications
                </CardTitle>
                <CardDescription>
                  Configure in-app notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Approval Requests</Label>
                    <p className='text-sm text-slate-500'>
                      Get notified of pending approvals
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.notifications.pushSettings.approvalRequests}
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'pushSettings', {
                        ...systemSettings.notifications.pushSettings,
                        approvalRequests: checked,
                      })
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Low Balance Alerts</Label>
                    <p className='text-sm text-slate-500'>
                      Get notified when wallet balance is low
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.notifications.pushSettings.lowBalanceAlerts}
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'pushSettings', {
                        ...systemSettings.notifications.pushSettings,
                        lowBalanceAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Failed Transactions</Label>
                    <p className='text-sm text-slate-500'>
                      Get notified of failed transactions
                    </p>
                  </div>
                  <Switch
                    checked={
                      systemSettings.notifications.pushSettings.failedTransactions
                    }
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'pushSettings', {
                        ...systemSettings.notifications.pushSettings,
                        failedTransactions: checked,
                      })
                    }
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>System Maintenance</Label>
                    <p className='text-sm text-slate-500'>
                      Get notified of maintenance windows
                    </p>
                  </div>
                  <Switch
                    checked={
                      systemSettings.notifications.pushSettings.systemMaintenance
                    }
                    onCheckedChange={checked =>
                      handleUpdateSystemSetting('notifications', 'pushSettings', {
                        ...systemSettings.notifications.pushSettings,
                        systemMaintenance: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value='api' className='space-y-6'>
          {/* Create API Key */}
          <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Plus className='mr-2 h-5 w-5 text-green-600' />
                Create New API Key
              </CardTitle>
              <CardDescription>
                Generate a new API key for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex space-x-4'>
                <div className='flex-1'>
                  <Label htmlFor='api-key-name'>API Key Name</Label>
                  <Input
                    id='api-key-name'
                    placeholder='Enter a descriptive name'
                    value={newApiKeyName}
                    onChange={e => setNewApiKeyName(e.target.value)}
                  />
                </div>
                <div className='flex items-end'>
                  <Button
                    onClick={handleGenerateApiKey}
                    disabled={!newApiKeyName || isGeneratingApiKey}
                  >
                    {isGeneratingApiKey ? (
                      <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                      <Key className='mr-2 h-4 w-4' />
                    )}
                    Generate Key
                  </Button>
                </div>
              </div>
              {newApiKey && (
                <div className='mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-green-800 dark:text-green-200'>
                        New API Key Generated
                      </p>
                      <p className='text-xs text-green-600 dark:text-green-400'>
                        Make sure to copy this key now. You won't be able to see
                        it again!
                      </p>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => copyToClipboard(newApiKey)}
                    >
                      <Copy className='mr-1 h-3 w-3' />
                      Copy
                    </Button>
                  </div>
                  <div className='mt-2 rounded border bg-white p-2 font-mono text-sm dark:bg-slate-900'>
                    {newApiKey}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Existing API Keys */}
          <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Key className='mr-2 h-5 w-5 text-blue-600' />
                API Keys ({securitySettings.apiKeys.length})
              </CardTitle>
              <CardDescription>Manage your existing API keys</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securitySettings.apiKeys.map(apiKey => (
                    <TableRow key={apiKey.id}>
                      <TableCell>
                        <p className='font-medium'>{apiKey.name}</p>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center space-x-2'>
                          <span className='font-mono text-sm'>
                            {showApiKey === apiKey.id
                              ? apiKey.key
                              : `${apiKey.key.substring(0, 8)}...`}
                          </span>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              setShowApiKey(
                                showApiKey === apiKey.id ? null : apiKey.id
                              )
                            }
                          >
                            {showApiKey === apiKey.id ? (
                              <EyeOff className='h-3 w-3' />
                            ) : (
                              <Eye className='h-3 w-3' />
                            )}
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className='h-3 w-3' />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex space-x-1'>
                          {apiKey.permissions.map(permission => (
                            <Badge
                              key={permission}
                              variant='outline'
                              className='text-xs'
                            >
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(apiKey.status)}>
                          {apiKey.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {apiKey.lastUsed ? (
                          <div>
                            <p className='text-sm'>
                              {new Date(apiKey.lastUsed).toLocaleDateString()}
                            </p>
                            <p className='text-xs text-slate-500'>
                              {new Date(apiKey.lastUsed).toLocaleTimeString()}
                            </p>
                          </div>
                        ) : (
                          <span className='text-sm text-slate-400'>Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className='text-sm'>
                            {new Date(apiKey.createdAt).toLocaleDateString()}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {new Date(apiKey.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleToggleApiKey(apiKey.id)}
                          >
                            {apiKey.status === 'active' ? (
                              <Lock className='h-3 w-3' />
                            ) : (
                              <Unlock className='h-3 w-3' />
                            )}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant='outline'
                                size='sm'
                                className='text-red-600'
                              >
                                <Trash2 className='h-3 w-3' />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete API Key
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this API key?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteApiKey(apiKey.id)}
                                  className='bg-red-600 hover:bg-red-700'
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value='audit' className='space-y-6'>
          {/* Audit Logs Tab Content */}
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Audit Logs</CardTitle>
              <CardDescription>
                View system activity logs for security and compliance purposes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securitySettings.auditLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className='font-mono'>
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.userId}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className='font-mono'>{log.ipAddress}</TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={getStatusColor(log.status)}
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='workflows' className='space-y-6'>
          {/* Workflows Tab Content */}
          {isEditingWorkflow ? (
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>
                  {selectedWorkflow?.id.startsWith('workflow-') ? 'Create New Workflow' : 'Edit Workflow'}
                </CardTitle>
                <CardDescription>
                  Configure approval rules and conditions for transaction processing.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='grid gap-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='workflow-name'>Workflow Name</Label>
                      <Input
                        id='workflow-name'
                        value={selectedWorkflow?.name || ''}
                        onChange={(e) => setSelectedWorkflow(prev => prev ? {...prev, name: e.target.value} : null)}
                        placeholder='Enter workflow name'
                      />
                    </div>
                    
                    <div className='grid gap-2'>
                      <Label htmlFor='workflow-description'>Description</Label>
                      <Input
                        id='workflow-description'
                        value={selectedWorkflow?.description || ''}
                        onChange={(e) => setSelectedWorkflow(prev => prev ? {...prev, description: e.target.value} : null)}
                        placeholder='Enter workflow description'
                      />
                    </div>
                    
                    <div className='grid gap-2'>
                      <div className='flex items-center justify-between'>
                        <Label htmlFor='workflow-status'>Active Status</Label>
                        <Switch
                          id='workflow-status'
                          checked={selectedWorkflow?.isActive || false}
                          onCheckedChange={(checked) => setSelectedWorkflow(prev => prev ? {...prev, isActive: checked} : null)}
                        />
                      </div>
                      <p className='text-sm text-gray-500'>
                        Enable or disable this workflow
                      </p>
                    </div>
                  </div>
                  
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-medium'>Approval Rules</h3>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          if (selectedWorkflow) {
                            const newRule = {
                              condition: 'amount > 0',
                              requiredApprovals: 1,
                              approvers: ['manager']
                            };
                            setSelectedWorkflow({
                              ...selectedWorkflow,
                              rules: [...selectedWorkflow.rules, newRule]
                            });
                          }
                        }}
                      >
                        <Plus className='h-4 w-4 mr-2' />
                        Add Rule
                      </Button>
                    </div>
                    
                    {selectedWorkflow?.rules.map((rule, index) => (
                      <Card key={index} className='p-4 border border-gray-200'>
                        <div className='space-y-4'>
                          <div className='grid gap-2'>
                            <Label htmlFor={`rule-condition-${index}`}>Condition</Label>
                            <Input
                              id={`rule-condition-${index}`}
                              value={rule.condition}
                              onChange={(e) => {
                                if (selectedWorkflow && selectedWorkflow.rules[index]) {
                                  const updatedRules = [...selectedWorkflow.rules];
                                  const currentRule = updatedRules[index];
                                  if (currentRule) {
                                    updatedRules[index] = {
                                      condition: e.target.value,
                                      requiredApprovals: currentRule.requiredApprovals,
                                      approvers: currentRule.approvers
                                    };
                                    setSelectedWorkflow({
                                      ...selectedWorkflow,
                                      rules: updatedRules
                                    });
                                  }
                                }
                              }}
                              placeholder='e.g., amount > 10000'
                            />
                            <p className='text-xs text-gray-500'>
                              Use conditions like 'amount {'>'} 10000' or 'currency == "BTC"'
                            </p>
                          </div>
                          
                          <div className='grid gap-2'>
                            <Label htmlFor={`required-approvals-${index}`}>Required Approvals</Label>
                            <Select
                              value={rule.requiredApprovals.toString()}
                              onValueChange={(value) => {
                                if (selectedWorkflow && selectedWorkflow.rules[index]) {
                                  const updatedRules = [...selectedWorkflow.rules];
                                  const currentRule = updatedRules[index];
                                  if (currentRule) {
                                    updatedRules[index] = {
                                      condition: currentRule.condition,
                                      requiredApprovals: parseInt(value),
                                      approvers: currentRule.approvers
                                    };
                                    setSelectedWorkflow({
                                      ...selectedWorkflow,
                                      rules: updatedRules
                                    });
                                  }
                                }
                              }}
                            >
                              <SelectTrigger id={`required-approvals-${index}`}>
                                <SelectValue placeholder='Select required approvals' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='1'>1 Approval</SelectItem>
                                <SelectItem value='2'>2 Approvals</SelectItem>
                                <SelectItem value='3'>3 Approvals</SelectItem>
                                <SelectItem value='4'>4 Approvals</SelectItem>
                                <SelectItem value='5'>5 Approvals</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className='grid gap-2'>
                            <Label>Approver Roles</Label>
                            <div className='flex flex-wrap gap-2'>
                              {['manager', 'admin', 'finance', 'compliance', 'security'].map(role => (
                                <Badge
                                  key={role}
                                  variant={rule.approvers.includes(role) ? 'default' : 'outline'}
                                  className='cursor-pointer'
                                  onClick={() => {
                                    if (selectedWorkflow && selectedWorkflow.rules[index]) {
                                      const updatedRules = [...selectedWorkflow.rules];
                                      const currentRule = updatedRules[index];
                                      if (currentRule) {
                                        const currentApprovers = currentRule.approvers;
                                        const updatedApprovers = currentApprovers.includes(role)
                                          ? currentApprovers.filter(r => r !== role)
                                          : [...currentApprovers, role];
                                        
                                        updatedRules[index] = {
                                          condition: currentRule.condition,
                                          requiredApprovals: currentRule.requiredApprovals,
                                          approvers: updatedApprovers
                                        };
                                        
                                        setSelectedWorkflow({
                                          ...selectedWorkflow,
                                          rules: updatedRules
                                        });
                                      }
                                    }
                                  }}
                                >
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => {
                              if (selectedWorkflow) {
                                const updatedRules = selectedWorkflow.rules.filter((_, i) => i !== index);
                                setSelectedWorkflow({
                                  ...selectedWorkflow,
                                  rules: updatedRules
                                });
                              }
                            }}
                          >
                            <Trash2 className='h-4 w-4 mr-2' />
                            Remove Rule
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className='flex justify-end space-x-4'>
                  <Button variant='outline' onClick={handleCancelEditWorkflow}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => selectedWorkflow && handleSaveWorkflow(selectedWorkflow)}
                    disabled={!selectedWorkflow?.name || selectedWorkflow.rules.length === 0}
                  >
                    <Save className='h-4 w-4 mr-2' />
                    Save Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Approval Workflows</h2>
                <Button onClick={handleCreateNewWorkflow}>
                  <Plus className='h-4 w-4 mr-2' />
                  Create Workflow
                </Button>
              </div>
              
              <div className='grid gap-6'>
                {approvalWorkflows.map(workflow => (
                  <Card key={workflow.id}>
                    <CardHeader className='pb-2'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <div className='flex items-center gap-2'>
                            <CardTitle className='text-xl'>{workflow.name}</CardTitle>
                            <Badge
                              variant={workflow.isActive ? 'default' : 'outline'}
                              className={workflow.isActive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                            >
                              {workflow.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <CardDescription className='mt-1'>
                            {workflow.description}
                          </CardDescription>
                        </div>
                        <div className='flex space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleToggleWorkflowStatus(workflow.id)}
                          >
                            {workflow.isActive ? (
                              <>
                                <Lock className='h-4 w-4 mr-2' />
                                Disable
                              </>
                            ) : (
                              <>
                                <Unlock className='h-4 w-4 mr-2' />
                                Enable
                              </>
                            )}
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleSelectWorkflow(workflow)}
                          >
                            <Edit className='h-4 w-4 mr-2' />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant='destructive' size='sm'>
                                <Trash2 className='h-4 w-4 mr-2' />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the "{workflow.name}" workflow? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteWorkflow(workflow.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        <div>
                          <h3 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                            <GitBranch className='h-4 w-4 mr-1' />
                            Approval Rules
                          </h3>
                          <div className='space-y-2'>
                            {workflow.rules.map((rule, index) => (
                              <div key={index} className='bg-gray-50 p-3 rounded-md border border-gray-200'>
                                <div className='flex items-start justify-between'>
                                  <div className='space-y-1'>
                                    <div className='flex items-center'>
                                      <AlertTriangle className='h-4 w-4 mr-1 text-amber-500' />
                                      <span className='font-mono text-sm'>{rule.condition}</span>
                                    </div>
                                    <div className='flex items-center'>
                                      <CheckCircle className='h-4 w-4 mr-1 text-green-500' />
                                      <span className='text-sm'>
                                        Requires {rule.requiredApprovals} approval{rule.requiredApprovals > 1 ? 's' : ''}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <div className='flex items-center'>
                                      <Users className='h-4 w-4 mr-1 text-blue-500' />
                                      <span className='text-sm'>
                                        {rule.approvers.map(approver => (
                                          <Badge key={approver} variant='outline' className='mr-1 mb-1'>
                                            {approver}
                                          </Badge>
                                        ))}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='text-xs text-gray-500 flex justify-between pt-2 border-t border-gray-100'>
                          <span>Created: {new Date(workflow.createdAt).toLocaleString()}</span>
                          <span>Last Updated: {new Date(workflow.updatedAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {approvalWorkflows.length === 0 && (
                  <Card className='p-8 text-center'>
                    <div className='space-y-3'>
                      <GitBranch className='h-12 w-12 mx-auto text-gray-300' />
                      <h3 className='text-lg font-medium'>No Workflows Configured</h3>
                      <p className='text-gray-500 max-w-md mx-auto'>
                        Create your first approval workflow to define how transactions are approved in your system.
                      </p>
                      <Button onClick={handleCreateNewWorkflow} className='mt-2'>
                        <Plus className='h-4 w-4 mr-2' />
                        Create First Workflow
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </>
          )}
        </TabsContent>

      </Tabs>
    </div>
  )
}
