'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  Lock,
  Key,
  Smartphone,
  Globe,
  Clock,
  Eye,
  EyeOff,
  RefreshCw,
  Copy,
  Trash2,
  Plus,
  Search,
  Filter,
  LogOut,
  History,
  Monitor,
} from 'lucide-react'
import { MOCK_SECURITY_SETTINGS } from '@/lib/mock-data'
import type { SecuritySettings } from '@/types'

// Mock data for security audit logs
const MOCK_SECURITY_LOGS = [
  {
    id: '1',
    timestamp: '2023-10-15T14:30:00Z',
    event: 'login_success',
    user: 'john.smith@example.com',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    details: 'Successful login via password',
  },
  {
    id: '2',
    timestamp: '2023-10-15T13:45:00Z',
    event: 'settings_changed',
    user: 'admin@example.com',
    ipAddress: '192.168.1.5',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    details: 'Changed 2FA settings',
  },
  {
    id: '3',
    timestamp: '2023-10-15T12:15:00Z',
    event: 'login_failed',
    user: 'sarah.johnson@example.com',
    ipAddress: '192.168.1.10',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
    details: 'Failed login attempt (incorrect password)',
  },
  {
    id: '4',
    timestamp: '2023-10-14T09:30:00Z',
    event: 'api_key_created',
    user: 'david.kim@example.com',
    ipAddress: '192.168.1.15',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    details: 'Created new API key: System Integration',
  },
  {
    id: '5',
    timestamp: '2023-10-14T08:45:00Z',
    event: 'user_added',
    user: 'admin@example.com',
    ipAddress: '192.168.1.5',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    details: 'Added new user: michael.chen@example.com',
  },
]

// Mock data for API keys
const MOCK_API_KEYS = [
  {
    id: '1',
    name: 'Production API',
    created: '2023-09-01T10:00:00Z',
    lastUsed: '2023-10-15T08:30:00Z',
    status: 'active',
    permissions: ['read', 'write'],
    createdBy: 'john.smith@example.com',
  },
  {
    id: '2',
    name: 'Analytics Integration',
    created: '2023-09-15T14:20:00Z',
    lastUsed: '2023-10-14T16:45:00Z',
    status: 'active',
    permissions: ['read'],
    createdBy: 'sarah.johnson@example.com',
  },
  {
    id: '3',
    name: 'Development Testing',
    created: '2023-10-05T09:15:00Z',
    lastUsed: '2023-10-12T11:30:00Z',
    status: 'inactive',
    permissions: ['read', 'write'],
    createdBy: 'david.kim@example.com',
  },
]

// Mock data for whitelisted IPs
const MOCK_WHITELISTED_IPS = [
  {
    id: '1',
    ipAddress: '192.168.1.1',
    description: 'Office - Main',
    addedBy: 'admin@example.com',
    dateAdded: '2023-08-15T10:00:00Z',
  },
  {
    id: '2',
    ipAddress: '192.168.1.5',
    description: 'Office - Finance Dept',
    addedBy: 'admin@example.com',
    dateAdded: '2023-08-15T10:05:00Z',
  },
  {
    id: '3',
    ipAddress: '203.0.113.10',
    description: 'Remote Office - New York',
    addedBy: 'john.smith@example.com',
    dateAdded: '2023-09-20T14:30:00Z',
  },
]

/**
 * Security management page component
 * Displays security settings, audit logs, and security controls
 */
export default function SecurityPage() {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(
    MOCK_SECURITY_SETTINGS
  )
  const [securityLogs, _setSecurityLogs] = useState(MOCK_SECURITY_LOGS)
  const [apiKeys, setApiKeys] = useState<
    Array<{
      id: string
      name: string
      created: string
      lastUsed: string | null
      status: string
      permissions: string[]
      createdBy: string
    }>
  >(MOCK_API_KEYS)
  const [whitelistedIps, setWhitelistedIps] = useState(MOCK_WHITELISTED_IPS)
  const [searchTerm, setSearchTerm] = useState('')
  const [eventFilter, setEventFilter] = useState('all')
  const [isAddApiKeyDialogOpen, setIsAddApiKeyDialogOpen] = useState(false)
  const [isAddIpDialogOpen, setIsAddIpDialogOpen] = useState(false)
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [newIpAddress, setNewIpAddress] = useState('')
  const [newIpDescription, setNewIpDescription] = useState('')
  const [newApiKeyPermissions, setNewApiKeyPermissions] = useState<string[]>([
    'read',
  ])
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Filter security logs based on search term and event filter
  const filteredLogs = securityLogs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = eventFilter === 'all' || log.event === eventFilter

    return matchesSearch && matchesFilter
  })

  // Handle adding a new API key
  const handleAddApiKey = () => {
    if (!newApiKeyName) return

    const newKey = {
      id: `${apiKeys.length + 1}`,
      name: newApiKeyName,
      created: new Date().toISOString(),
      lastUsed: null,
      status: 'active',
      permissions: newApiKeyPermissions,
      createdBy: 'current.user@example.com',
    }

    setApiKeys([...apiKeys, newKey])
    setNewApiKeyName('')
    setNewApiKeyPermissions(['read'])
    setIsAddApiKeyDialogOpen(false)
  }

  // Handle adding a new whitelisted IP
  const handleAddIp = () => {
    if (!newIpAddress) return

    const newIp = {
      id: `${whitelistedIps.length + 1}`,
      ipAddress: newIpAddress,
      description: newIpDescription || 'No description',
      addedBy: 'current.user@example.com',
      dateAdded: new Date().toISOString(),
    }

    setWhitelistedIps([...whitelistedIps, newIp])
    setNewIpAddress('')
    setNewIpDescription('')
    setIsAddIpDialogOpen(false)
  }

  // Handle deleting an API key
  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  // Handle deleting a whitelisted IP
  const handleDeleteIp = (id: string) => {
    setWhitelistedIps(whitelistedIps.filter(ip => ip.id !== id))
  }

  // Handle toggling 2FA
  const handleToggle2FA = () => {
    setSecuritySettings({
      ...securitySettings,
      twoFactorAuth: {
        ...securitySettings.twoFactorAuth,
        enabled: !securitySettings.twoFactorAuth.enabled,
      },
    })
  }

  // Handle toggling IP whitelist
  const handleToggleIpWhitelist = () => {
    setSecuritySettings({
      ...securitySettings,
      ipWhitelist: {
        ...securitySettings.ipWhitelist,
        enabled: !securitySettings.ipWhitelist.enabled,
      },
    })
  }

  return (
    <div className='space-y-6 px-4'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-900'>Security Settings</h1>
          <p className='mt-1 text-neutral-600'>
            Manage authentication, access controls, and security policies
          </p>
        </div>
      </div>

      <Tabs defaultValue='authentication'>
        <TabsList className='grid w-full grid-cols-6'>
          <TabsTrigger value='authentication'>
            <Lock className='mr-2 h-4 w-4' />
            Authentication
          </TabsTrigger>
          <TabsTrigger value='password'>
            <Key className='mr-2 h-4 w-4' />
            Password Policy
          </TabsTrigger>
          <TabsTrigger value='ip-whitelist'>
            <Globe className='mr-2 h-4 w-4' />
            IP Whitelist
          </TabsTrigger>
          <TabsTrigger value='sessions'>
            <Smartphone className='mr-2 h-4 w-4' />
            Sessions
          </TabsTrigger>
          <TabsTrigger value='api-keys'>
            <Key className='mr-2 h-4 w-4' />
            API Keys
          </TabsTrigger>
          <TabsTrigger value='audit-log'>
            <History className='mr-2 h-4 w-4' />
            Audit Log
          </TabsTrigger>
        </TabsList>

        {/* Authentication Tab */}
        <TabsContent value='authentication' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Enhance your account security with two-factor authentication
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <h4 className='font-medium'>
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Require a second form of authentication when signing in
                  </p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth.enabled}
                  onCheckedChange={handleToggle2FA}
                />
              </div>

              {securitySettings.twoFactorAuth.enabled && (
                <div className='mt-4 space-y-4'>
                  <div className='space-y-2'>
                    <Label>Authentication Method</Label>
                    <Select
                      defaultValue={securitySettings.twoFactorAuth.method}
                      onValueChange={value =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: {
                            ...securitySettings.twoFactorAuth,
                            method: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select authentication method' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='authenticator'>
                          Authenticator App
                        </SelectItem>
                        <SelectItem value='sms'>SMS</SelectItem>
                        <SelectItem value='email'>Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <h4 className='font-medium'>Backup Codes</h4>
                    <p className='text-sm text-muted-foreground'>
                      You have {securitySettings.twoFactorAuth.backupCodes}{' '}
                      backup codes remaining
                    </p>
                    <Button variant='outline' size='sm'>
                      <RefreshCw className='mr-2 h-4 w-4' />
                      Generate New Codes
                    </Button>
                  </div>

                  <div className='space-y-2'>
                    <h4 className='font-medium'>Last Used</h4>
                    <p className='text-sm text-muted-foreground'>
                      {new Date(
                        securitySettings.twoFactorAuth.lastUsed
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Policy Tab */}
        <TabsContent value='password' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>
                Configure password requirements and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Minimum Password Length</h4>
                    <p className='text-sm text-muted-foreground'>
                      Set the minimum number of characters required for
                      passwords
                    </p>
                  </div>
                  <Select defaultValue='12'>
                    <SelectTrigger className='w-20'>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='8'>8</SelectItem>
                      <SelectItem value='10'>10</SelectItem>
                      <SelectItem value='12'>12</SelectItem>
                      <SelectItem value='14'>14</SelectItem>
                      <SelectItem value='16'>16</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Require Special Characters</h4>
                    <p className='text-sm text-muted-foreground'>
                      Passwords must include at least one special character
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Require Numbers</h4>
                    <p className='text-sm text-muted-foreground'>
                      Passwords must include at least one number
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Require Mixed Case</h4>
                    <p className='text-sm text-muted-foreground'>
                      Passwords must include both uppercase and lowercase
                      letters
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Password Expiration</h4>
                    <p className='text-sm text-muted-foreground'>
                      Force password change after specified period
                    </p>
                  </div>
                  <Select defaultValue='90'>
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='never'>Never</SelectItem>
                      <SelectItem value='30'>30 days</SelectItem>
                      <SelectItem value='60'>60 days</SelectItem>
                      <SelectItem value='90'>90 days</SelectItem>
                      <SelectItem value='180'>180 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Password History</h4>
                    <p className='text-sm text-muted-foreground'>
                      Prevent reuse of previous passwords
                    </p>
                  </div>
                  <Select defaultValue='5'>
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='0'>None</SelectItem>
                      <SelectItem value='3'>Last 3</SelectItem>
                      <SelectItem value='5'>Last 5</SelectItem>
                      <SelectItem value='10'>Last 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='border-t pt-4'>
                <h4 className='mb-2 font-medium'>Change Your Password</h4>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='current-password'>Current Password</Label>
                    <div className='relative'>
                      <Input
                        id='current-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your current password'
                      />
                      <Button
                        variant='ghost'
                        size='icon'
                        className='absolute right-0 top-0'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='new-password'>New Password</Label>
                    <div className='relative'>
                      <Input
                        id='new-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your new password'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                      <Button
                        variant='ghost'
                        size='icon'
                        className='absolute right-0 top-0'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='confirm-password'>
                      Confirm New Password
                    </Label>
                    <div className='relative'>
                      <Input
                        id='confirm-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Confirm your new password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                      <Button
                        variant='ghost'
                        size='icon'
                        className='absolute right-0 top-0'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button>
                    <Lock className='mr-2 h-4 w-4' />
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IP Whitelist Tab */}
        <TabsContent value='ip-whitelist' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>IP Whitelist</CardTitle>
              <CardDescription>
                Restrict access to the system from specific IP addresses only
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <h4 className='font-medium'>Enable IP Whitelist</h4>
                  <p className='text-sm text-muted-foreground'>
                    Only allow access from the IP addresses listed below
                  </p>
                </div>
                <Switch
                  checked={securitySettings.ipWhitelist.enabled}
                  onCheckedChange={handleToggleIpWhitelist}
                />
              </div>

              {securitySettings.ipWhitelist.enabled && (
                <div className='mt-4 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h4 className='font-medium'>Whitelisted IP Addresses</h4>
                    <Dialog
                      open={isAddIpDialogOpen}
                      onOpenChange={setIsAddIpDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button size='sm'>
                          <Plus className='mr-2 h-4 w-4' />
                          Add IP Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add IP Address to Whitelist</DialogTitle>
                          <DialogDescription>
                            Enter the IP address you want to whitelist for
                            system access.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4 py-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='ip-address'>IP Address</Label>
                            <Input
                              id='ip-address'
                              placeholder='e.g., 192.168.1.1'
                              value={newIpAddress}
                              onChange={e => setNewIpAddress(e.target.value)}
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='ip-description'>
                              Description (Optional)
                            </Label>
                            <Input
                              id='ip-description'
                              placeholder='e.g., Office Network'
                              value={newIpDescription}
                              onChange={e =>
                                setNewIpDescription(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant='outline'
                            onClick={() => setIsAddIpDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleAddIp}>Add IP Address</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className='rounded-md border'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Added By</TableHead>
                          <TableHead>Date Added</TableHead>
                          <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {whitelistedIps.map(ip => (
                          <TableRow key={ip.id}>
                            <TableCell className='font-medium'>
                              {ip.ipAddress}
                            </TableCell>
                            <TableCell>{ip.description}</TableCell>
                            <TableCell>{ip.addedBy}</TableCell>
                            <TableCell>
                              {new Date(ip.dateAdded).toLocaleDateString()}
                            </TableCell>
                            <TableCell className='text-right'>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant='ghost' size='icon'>
                                    <Trash2 className='h-4 w-4 text-destructive' />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete IP Address
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove{' '}
                                      {ip.ipAddress} from the whitelist? This
                                      action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteIp(ip.id)}
                                      className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value='sessions' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Manage your active login sessions across devices
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Session Timeout</h4>
                    <p className='text-sm text-muted-foreground'>
                      Automatically log out inactive sessions after specified
                      period
                    </p>
                  </div>
                  <Select defaultValue='30'>
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='15'>15 minutes</SelectItem>
                      <SelectItem value='30'>30 minutes</SelectItem>
                      <SelectItem value='60'>1 hour</SelectItem>
                      <SelectItem value='120'>2 hours</SelectItem>
                      <SelectItem value='240'>4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>Concurrent Sessions</h4>
                    <p className='text-sm text-muted-foreground'>
                      Maximum number of active sessions allowed per user
                    </p>
                  </div>
                  <Select defaultValue='3'>
                    <SelectTrigger className='w-20'>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>1</SelectItem>
                      <SelectItem value='2'>2</SelectItem>
                      <SelectItem value='3'>3</SelectItem>
                      <SelectItem value='5'>5</SelectItem>
                      <SelectItem value='10'>10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='border-t pt-4'>
                <h4 className='mb-4 font-medium'>Your Current Sessions</h4>
                <div className='space-y-4'>
                  {securitySettings.loginSessions.map(session => (
                    <div
                      key={session.id}
                      className='flex items-center justify-between rounded-lg border p-4'
                    >
                      <div className='flex items-center space-x-4'>
                        <div className='rounded-full bg-primary/10 p-2'>
                          {session.deviceType === 'desktop' ? (
                            <Monitor className='h-5 w-5 text-primary' />
                          ) : (
                            <Smartphone className='h-5 w-5 text-primary' />
                          )}
                        </div>
                        <div>
                          <p className='font-medium'>{session.device}</p>
                          <div className='flex items-center text-sm text-muted-foreground'>
                            <Globe className='mr-1 h-3 w-3' />
                            {session.location} ({session.ipAddress})
                          </div>
                          <div className='flex items-center text-sm text-muted-foreground'>
                            <Clock className='mr-1 h-3 w-3' />
                            {new Date(session.loginTime).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        {session.status === 'active' && (
                          <Badge
                            variant='outline'
                            className='border-green-200 bg-green-50 text-green-700'
                          >
                            Current Session
                          </Badge>
                        )}
                        {session.id !== 'session-1' && (
                          <Button variant='ghost' size='sm'>
                            <LogOut className='mr-2 h-4 w-4' />
                            Terminate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                <LogOut className='mr-2 h-4 w-4' />
                Log Out All Other Sessions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value='api-keys' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for integrating with external systems
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <h4 className='font-medium'>Your API Keys</h4>
                  <p className='text-sm text-muted-foreground'>
                    Create and manage API keys for secure access to our API
                  </p>
                </div>
                <Dialog
                  open={isAddApiKeyDialogOpen}
                  onOpenChange={setIsAddApiKeyDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className='mr-2 h-4 w-4' />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New API Key</DialogTitle>
                      <DialogDescription>
                        API keys allow external applications to authenticate
                        with our service.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='api-key-name'>API Key Name</Label>
                        <Input
                          id='api-key-name'
                          placeholder='e.g., Production API'
                          value={newApiKeyName}
                          onChange={e => setNewApiKeyName(e.target.value)}
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label>Permissions</Label>
                        <div className='grid grid-cols-2 gap-2'>
                          <div className='flex items-center space-x-2'>
                            <Checkbox
                              id='permission-read'
                              checked={newApiKeyPermissions.includes('read')}
                              onCheckedChange={checked => {
                                if (checked) {
                                  setNewApiKeyPermissions([
                                    ...newApiKeyPermissions,
                                    'read',
                                  ])
                                } else {
                                  setNewApiKeyPermissions(
                                    newApiKeyPermissions.filter(
                                      p => p !== 'read'
                                    )
                                  )
                                }
                              }}
                            />
                            <Label htmlFor='permission-read'>Read</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Checkbox
                              id='permission-write'
                              checked={newApiKeyPermissions.includes('write')}
                              onCheckedChange={checked => {
                                if (checked) {
                                  setNewApiKeyPermissions([
                                    ...newApiKeyPermissions,
                                    'write',
                                  ])
                                } else {
                                  setNewApiKeyPermissions(
                                    newApiKeyPermissions.filter(
                                      p => p !== 'write'
                                    )
                                  )
                                }
                              }}
                            />
                            <Label htmlFor='permission-write'>Write</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant='outline'
                        onClick={() => setIsAddApiKeyDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddApiKey}>Create API Key</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map(key => (
                      <TableRow key={key.id}>
                        <TableCell className='font-medium'>
                          {key.name}
                        </TableCell>
                        <TableCell>
                          {new Date(key.created).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {key.lastUsed
                            ? new Date(key.lastUsed).toLocaleDateString()
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant='outline'
                            className={`${key.status === 'active' ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 text-gray-700'}`}
                          >
                            {key.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className='flex space-x-1'>
                            {key.permissions.map(permission => (
                              <Badge key={permission} variant='secondary'>
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end space-x-1'>
                            <Button variant='ghost' size='icon'>
                              <Copy className='h-4 w-4' />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                  <Trash2 className='h-4 w-4 text-destructive' />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete API Key
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the API key
                                    "{key.name}"? This action cannot be undone
                                    and any applications using this key will no
                                    longer be able to access the API.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteApiKey(key.id)}
                                    className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value='audit-log' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Security Audit Log</CardTitle>
              <CardDescription>
                Review security-related events and activities
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <div className='relative flex-1'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search logs...'
                    className='pl-8'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  defaultValue='all'
                  onValueChange={value => setEventFilter(value)}
                >
                  <SelectTrigger className='w-[180px]'>
                    <Filter className='mr-2 h-4 w-4' />
                    <SelectValue placeholder='Filter by event' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Events</SelectItem>
                    <SelectItem value='login_success'>Login Success</SelectItem>
                    <SelectItem value='login_failed'>Login Failed</SelectItem>
                    <SelectItem value='settings_changed'>
                      Settings Changed
                    </SelectItem>
                    <SelectItem value='api_key_created'>
                      API Key Created
                    </SelectItem>
                    <SelectItem value='user_added'>User Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant='outline'
                            className={`${log.event === 'login_success' || log.event === 'api_key_created' || log.event === 'user_added' ? 'border-green-200 bg-green-50 text-green-700' : log.event === 'login_failed' ? 'border-red-200 bg-red-50 text-red-700' : 'border-blue-200 bg-blue-50 text-blue-700'}`}
                          >
                            {log.event.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>
                  Showing {filteredLogs.length} of {securityLogs.length} logs
                </div>
                <div className='flex space-x-2'>
                  <Button variant='outline' size='sm' disabled>
                    Previous
                  </Button>
                  <Button variant='outline' size='sm' disabled>
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
