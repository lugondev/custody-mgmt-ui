'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ControlledConfirmDialog } from '@/components/common/ConfirmDialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import {
  ArrowLeft,
  Settings,
  Key,
  EyeOff,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Save,
} from 'lucide-react'

interface WalletSettings {
  // General Settings
  name: string
  description: string
  tags: string[]

  // Security Settings
  requireMultiSig: boolean
  requiredSignatures: number
  totalSigners: number
  autoLockTimeout: number
  allowedIPs: string[]

  // Transaction Settings
  dailyLimit: number
  transactionLimit: number
  requireApprovalAbove: number
  allowInternalTransfers: boolean

  // Notification Settings
  emailNotifications: boolean
  smsNotifications: boolean
  webhookUrl: string
  notifyOnTransaction: boolean
  notifyOnLogin: boolean
  notifyOnFailedAttempt: boolean

  // Backup Settings
  autoBackup: boolean
  backupFrequency: 'daily' | 'weekly' | 'monthly'
  backupLocation: string
  encryptBackups: boolean

  // Network Settings
  networkType: 'mainnet' | 'testnet'
  customRpcUrl?: string
  gasSettings: {
    priority: 'low' | 'medium' | 'high' | 'custom'
    customGasPrice?: number
    maxGasLimit: number
  }
}

interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  createdAt: string
  lastUsed?: string
  status: 'active' | 'inactive'
}

/**
 * Wallet settings page component
 */
export default function WalletSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [settings, setSettings] = useState<WalletSettings | null>(null)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [showApiKey, setShowApiKey] = useState<string | null>(null)

  useEffect(() => {
    fetchWalletSettings()
  }, [])

  const fetchWalletSettings = async () => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock settings data
      const mockSettings: WalletSettings = {
        name: 'Main Trading Wallet',
        description: 'Primary wallet for daily trading operations',
        tags: ['trading', 'main', 'hot-wallet'],

        requireMultiSig: true,
        requiredSignatures: 2,
        totalSigners: 3,
        autoLockTimeout: 30,
        allowedIPs: ['192.168.1.0/24', '10.0.0.0/8'],

        dailyLimit: 100000,
        transactionLimit: 50000,
        requireApprovalAbove: 10000,
        allowInternalTransfers: true,

        emailNotifications: true,
        smsNotifications: false,
        webhookUrl: 'https://api.company.com/webhooks/wallet',
        notifyOnTransaction: true,
        notifyOnLogin: true,
        notifyOnFailedAttempt: true,

        autoBackup: true,
        backupFrequency: 'daily',
        backupLocation: 's3://company-backups/wallets/',
        encryptBackups: true,

        networkType: 'mainnet',
        customRpcUrl: '',
        gasSettings: {
          priority: 'medium',
          maxGasLimit: 500000,
        },
      }

      // Mock API keys
      const mockApiKeys: ApiKey[] = [
        {
          id: 'key-001',
          name: 'Trading Bot API',
          key: 'sk_live_abc123...xyz789',
          permissions: ['read', 'transactions'],
          createdAt: '2024-01-15T10:30:00Z',
          lastUsed: '2024-01-20T09:15:00Z',
          status: 'active',
        },
        {
          id: 'key-002',
          name: 'Monitoring Service',
          key: 'sk_live_def456...uvw012',
          permissions: ['read'],
          createdAt: '2024-01-10T14:20:00Z',
          lastUsed: '2024-01-19T18:45:00Z',
          status: 'active',
        },
      ]

      setSettings(mockSettings)
      setApiKeys(mockApiKeys)
    } catch (error) {
      console.error('Failed to fetch wallet settings:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load wallet settings',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!settings) return

    try {
      setSaving(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      console.log('Saving wallet settings:', settings)

      toast({
        title: 'Settings Saved',
        description: 'Wallet settings have been successfully updated.',
      })
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'Failed to save wallet settings.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleResetSettings = async () => {
    try {
      setSaving(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      await fetchWalletSettings()
      setShowResetDialog(false)

      toast({
        title: 'Settings Reset',
        description: 'Wallet settings have been reset to defaults.',
      })
    } catch (error) {
      console.error('Failed to reset settings:', error)
      toast({
        variant: 'destructive',
        title: 'Reset Failed',
        description: 'Failed to reset wallet settings.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCreateApiKey = async () => {
    try {
      setSaving(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newKey: ApiKey = {
        id: `key-${Date.now()}`,
        name: newApiKeyName,
        key: `sk_live_${Math.random().toString(36).substring(2)}`,
        permissions: selectedPermissions,
        createdAt: new Date().toISOString(),
        status: 'active',
      }

      setApiKeys([...apiKeys, newKey])
      setShowApiKey(newKey.key)
      setShowApiKeyDialog(false)
      setNewApiKeyName('')
      setSelectedPermissions([])

      toast({
        title: 'API Key Created',
        description: 'New API key has been created successfully.',
      })
    } catch (error) {
      console.error('Failed to create API key:', error)
      toast({
        variant: 'destructive',
        title: 'Creation Failed',
        description: 'Failed to create API key.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleRevokeApiKey = async (keyId: string) => {
    try {
      setSaving(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setApiKeys(apiKeys.filter(key => key.id !== keyId))

      toast({
        title: 'API Key Revoked',
        description: 'API key has been revoked successfully.',
      })
    } catch (error) {
      console.error('Failed to revoke API key:', error)
      toast({
        variant: 'destructive',
        title: 'Revoke Failed',
        description: 'Failed to revoke API key.',
      })
    } finally {
      setSaving(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied',
      description: 'API key copied to clipboard',
    })
  }

  const updateSettings = (updates: Partial<WalletSettings>) => {
    if (settings) {
      setSettings({ ...settings, ...updates })
    }
  }

  const availablePermissions = [
    { value: 'read', label: 'Read wallet data' },
    { value: 'transactions', label: 'Create transactions' },
    { value: 'approve', label: 'Approve transactions' },
    { value: 'manage', label: 'Manage wallet settings' },
  ]

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoadingSpinner size='lg' text='Loading wallet settings...' />
      </div>
    )
  }

  if (!settings) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h2 className='mb-2 text-2xl font-bold text-slate-900'>
            Settings Not Found
          </h2>
          <p className='mb-4 text-slate-600'>Unable to load wallet settings.</p>
          <Button onClick={() => router.push('/dashboard/wallets')}>
            Back to Wallets
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm' onClick={() => router.back()}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
          </Button>

          <div>
            <h1 className='flex items-center gap-2 text-3xl font-bold text-slate-900'>
              <Settings className='h-8 w-8' />
              Wallet Settings
            </h1>
            <p className='text-slate-600'>
              Configure wallet security, limits, and preferences
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={() => setShowResetDialog(true)}>
            <RefreshCw className='mr-2 h-4 w-4' />
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} loading={saving}>
            <Save className='mr-2 h-4 w-4' />
            Save Settings
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue='general' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-6'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='limits'>Limits</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='backup'>Backup</TabsTrigger>
          <TabsTrigger value='api'>API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value='general'>
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic wallet information and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Wallet Name</Label>
                  <Input
                    id='name'
                    value={settings.name}
                    onChange={e => updateSettings({ name: e.target.value })}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='networkType'>Network Type</Label>
                  <Select
                    value={settings.networkType}
                    onValueChange={(value: 'mainnet' | 'testnet') =>
                      updateSettings({ networkType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='mainnet'>Mainnet</SelectItem>
                      <SelectItem value='testnet'>Testnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  value={settings.description}
                  onChange={e =>
                    updateSettings({ description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='tags'>Tags (comma-separated)</Label>
                <Input
                  id='tags'
                  value={settings.tags.join(', ')}
                  onChange={e =>
                    updateSettings({
                      tags: e.target.value.split(',').map(tag => tag.trim()),
                    })
                  }
                  placeholder='trading, main, hot-wallet'
                />
              </div>

              {settings.networkType === 'mainnet' && (
                <div className='space-y-2'>
                  <Label htmlFor='customRpc'>Custom RPC URL (Optional)</Label>
                  <Input
                    id='customRpc'
                    value={settings.customRpcUrl || ''}
                    onChange={e =>
                      updateSettings({ customRpcUrl: e.target.value })
                    }
                    placeholder='https://your-custom-rpc-endpoint.com'
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='security'>
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure wallet security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <Label>Multi-Signature Required</Label>
                  <p className='text-sm text-slate-600'>
                    Require multiple signatures for transactions
                  </p>
                </div>
                <Switch
                  checked={settings.requireMultiSig}
                  onCheckedChange={checked =>
                    updateSettings({ requireMultiSig: checked })
                  }
                />
              </div>

              {settings.requireMultiSig && (
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='requiredSigs'>Required Signatures</Label>
                    <Input
                      id='requiredSigs'
                      type='number'
                      min='1'
                      max={settings.totalSigners}
                      value={settings.requiredSignatures}
                      onChange={e =>
                        updateSettings({
                          requiredSignatures: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='totalSigners'>Total Signers</Label>
                    <Input
                      id='totalSigners'
                      type='number'
                      min={settings.requiredSignatures}
                      value={settings.totalSigners}
                      onChange={e =>
                        updateSettings({
                          totalSigners: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className='space-y-2'>
                <Label htmlFor='autoLock'>Auto-lock Timeout (minutes)</Label>
                <Input
                  id='autoLock'
                  type='number'
                  min='5'
                  max='1440'
                  value={settings.autoLockTimeout}
                  onChange={e =>
                    updateSettings({
                      autoLockTimeout: parseInt(e.target.value),
                    })
                  }
                />
                <p className='text-sm text-slate-600'>
                  Automatically lock wallet after inactivity
                </p>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='allowedIPs'>Allowed IP Addresses</Label>
                <Textarea
                  id='allowedIPs'
                  value={settings.allowedIPs.join('\n')}
                  onChange={e =>
                    updateSettings({
                      allowedIPs: e.target.value
                        .split('\n')
                        .filter(ip => ip.trim()),
                    })
                  }
                  rows={3}
                  placeholder='192.168.1.0/24\n10.0.0.0/8'
                />
                <p className='text-sm text-slate-600'>
                  One IP address or CIDR block per line
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='limits'>
          <Card>
            <CardHeader>
              <CardTitle>Transaction Limits</CardTitle>
              <CardDescription>
                Set daily and transaction limits for enhanced security
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='dailyLimit'>Daily Limit (USD)</Label>
                  <Input
                    id='dailyLimit'
                    type='number'
                    min='0'
                    value={settings.dailyLimit}
                    onChange={e =>
                      updateSettings({ dailyLimit: parseInt(e.target.value) })
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='transactionLimit'>
                    Single Transaction Limit (USD)
                  </Label>
                  <Input
                    id='transactionLimit'
                    type='number'
                    min='0'
                    value={settings.transactionLimit}
                    onChange={e =>
                      updateSettings({
                        transactionLimit: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='approvalThreshold'>
                  Require Approval Above (USD)
                </Label>
                <Input
                  id='approvalThreshold'
                  type='number'
                  min='0'
                  value={settings.requireApprovalAbove}
                  onChange={e =>
                    updateSettings({
                      requireApprovalAbove: parseInt(e.target.value),
                    })
                  }
                />
                <p className='text-sm text-slate-600'>
                  Transactions above this amount require manual approval
                </p>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <Label>Allow Internal Transfers</Label>
                  <p className='text-sm text-slate-600'>
                    Allow transfers between internal wallets
                  </p>
                </div>
                <Switch
                  checked={settings.allowInternalTransfers}
                  onCheckedChange={checked =>
                    updateSettings({ allowInternalTransfers: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='notifications'>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Email Notifications</Label>
                    <p className='text-sm text-slate-600'>
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={checked =>
                      updateSettings({ emailNotifications: checked })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className='text-sm text-slate-600'>
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={checked =>
                      updateSettings({ smsNotifications: checked })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Transaction Notifications</Label>
                    <p className='text-sm text-slate-600'>
                      Notify on all transactions
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyOnTransaction}
                    onCheckedChange={checked =>
                      updateSettings({ notifyOnTransaction: checked })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Login Notifications</Label>
                    <p className='text-sm text-slate-600'>
                      Notify on wallet access
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyOnLogin}
                    onCheckedChange={checked =>
                      updateSettings({ notifyOnLogin: checked })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label>Failed Attempt Notifications</Label>
                    <p className='text-sm text-slate-600'>
                      Notify on failed access attempts
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyOnFailedAttempt}
                    onCheckedChange={checked =>
                      updateSettings({ notifyOnFailedAttempt: checked })
                    }
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='webhookUrl'>Webhook URL (Optional)</Label>
                <Input
                  id='webhookUrl'
                  value={settings.webhookUrl}
                  onChange={e => updateSettings({ webhookUrl: e.target.value })}
                  placeholder='https://your-webhook-endpoint.com'
                />
                <p className='text-sm text-slate-600'>
                  Receive real-time notifications via webhook
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='backup'>
          <Card>
            <CardHeader>
              <CardTitle>Backup Settings</CardTitle>
              <CardDescription>
                Configure automatic backups and recovery options
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <Label>Automatic Backup</Label>
                  <p className='text-sm text-slate-600'>
                    Enable automatic wallet backups
                  </p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={checked =>
                    updateSettings({ autoBackup: checked })
                  }
                />
              </div>

              {settings.autoBackup && (
                <>
                  <div className='space-y-2'>
                    <Label htmlFor='backupFreq'>Backup Frequency</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') =>
                        updateSettings({ backupFrequency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='daily'>Daily</SelectItem>
                        <SelectItem value='weekly'>Weekly</SelectItem>
                        <SelectItem value='monthly'>Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='backupLocation'>Backup Location</Label>
                    <Input
                      id='backupLocation'
                      value={settings.backupLocation}
                      onChange={e =>
                        updateSettings({ backupLocation: e.target.value })
                      }
                      placeholder='s3://your-bucket/wallets/'
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <Label>Encrypt Backups</Label>
                      <p className='text-sm text-slate-600'>
                        Encrypt backup files for security
                      </p>
                    </div>
                    <Switch
                      checked={settings.encryptBackups}
                      onCheckedChange={checked =>
                        updateSettings({ encryptBackups: checked })
                      }
                    />
                  </div>
                </>
              )}

              <div className='flex gap-2'>
                <Button variant='outline'>
                  <Download className='mr-2 h-4 w-4' />
                  Download Backup
                </Button>
                <Button variant='outline'>
                  <Upload className='mr-2 h-4 w-4' />
                  Restore from Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='api'>
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for programmatic access to this wallet
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowApiKeyDialog(true)}>
                    <Key className='mr-2 h-4 w-4' />
                    Create API Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {apiKeys.map(apiKey => (
                    <div
                      key={apiKey.id}
                      className='flex items-center justify-between rounded-lg border p-4'
                    >
                      <div className='flex-1'>
                        <div className='mb-1 flex items-center gap-2'>
                          <h4 className='font-medium'>{apiKey.name}</h4>
                          <Badge
                            className={
                              apiKey.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {apiKey.status}
                          </Badge>
                        </div>
                        <div className='text-sm text-slate-600'>
                          <div>
                            Created:{' '}
                            {new Date(apiKey.createdAt).toLocaleDateString()}
                          </div>
                          {apiKey.lastUsed && (
                            <div>
                              Last used:{' '}
                              {new Date(apiKey.lastUsed).toLocaleDateString()}
                            </div>
                          )}
                          <div>
                            Permissions: {apiKey.permissions.join(', ')}
                          </div>
                        </div>
                        <div className='mt-2 flex items-center gap-2'>
                          <code className='rounded bg-slate-100 px-2 py-1 text-xs'>
                            {apiKey.key.substring(0, 20)}...
                          </code>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className='h-3 w-3' />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleRevokeApiKey(apiKey.id)}
                        className='text-red-600 hover:text-red-700'
                      >
                        Revoke
                      </Button>
                    </div>
                  ))}

                  {apiKeys.length === 0 && (
                    <div className='py-8 text-center text-slate-500'>
                      No API keys created yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {showApiKey && (
              <Card className='border-green-200 bg-green-50'>
                <CardHeader>
                  <CardTitle className='text-green-800'>
                    New API Key Created
                  </CardTitle>
                  <CardDescription className='text-green-700'>
                    Please copy this API key now. You won't be able to see it
                    again.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center gap-2'>
                    <code className='flex-1 rounded border bg-white p-3 font-mono text-sm'>
                      {showApiKey}
                    </code>
                    <Button onClick={() => copyToClipboard(showApiKey)}>
                      <Copy className='mr-2 h-4 w-4' />
                      Copy
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => setShowApiKey(null)}
                    >
                      <EyeOff className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <ControlledConfirmDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        title='Reset Settings'
        description='Are you sure you want to reset all settings to their default values? This action cannot be undone.'
        confirmText='Reset'
        cancelText='Cancel'
        onConfirm={handleResetSettings}
        loading={saving}
        variant='destructive'
      />

      {/* API Key Creation Dialog */}
      <AlertDialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new API key for programmatic access to this wallet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='apiKeyName'>API Key Name</Label>
              <Input
                id='apiKeyName'
                value={newApiKeyName}
                onChange={e => setNewApiKeyName(e.target.value)}
                placeholder='Trading Bot API'
              />
            </div>

            <div className='space-y-2'>
              <Label>Permissions</Label>
              <div className='space-y-2'>
                {availablePermissions.map(permission => (
                  <div
                    key={permission.value}
                    className='flex items-center space-x-2'
                  >
                    <input
                      type='checkbox'
                      id={permission.value}
                      checked={selectedPermissions.includes(permission.value)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedPermissions([
                            ...selectedPermissions,
                            permission.value,
                          ])
                        } else {
                          setSelectedPermissions(
                            selectedPermissions.filter(
                              p => p !== permission.value
                            )
                          )
                        }
                      }}
                      className='rounded border-gray-300'
                    />
                    <Label htmlFor={permission.value} className='text-sm'>
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateApiKey}
              disabled={saving}
            >
              {saving ? 'Creating...' : 'Create'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
