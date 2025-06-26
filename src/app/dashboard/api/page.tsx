'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { DataTable } from '@/components/common/DataTable'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { useToast } from '@/hooks/use-toast'
import {
  Key,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  RefreshCw,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Code,
  Globe,
  Lock,
  Unlock,
  Download,
  Upload,
} from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  description: string
  key: string
  permissions: string[]
  status: 'active' | 'inactive' | 'expired'
  createdAt: string
  lastUsed?: string
  expiresAt?: string
  usageCount: number
  rateLimit: number
  ipWhitelist: string[]
  createdBy: string
}

interface ApiEndpoint {
  id: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  description: string
  category: 'wallets' | 'transactions' | 'users' | 'reports' | 'system'
  requiresAuth: boolean
  permissions: string[]
  rateLimit: number
  status: 'active' | 'deprecated' | 'maintenance'
  version: string
}

interface ApiUsageStats {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  topEndpoints: Array<{
    endpoint: string
    requests: number
  }>
  requestsByHour: Array<{
    hour: string
    requests: number
  }>
}

interface CreateApiKeyForm {
  name: string
  description: string
  permissions: string[]
  expiresAt: string
  rateLimit: number
  ipWhitelist: string
}

/**
 * API Management page component
 */
export default function ApiPage() {
  const { toast } = useToast()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpoint[]>([])
  const [apiStats, setApiStats] = useState<ApiUsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [createForm, setCreateForm] = useState<CreateApiKeyForm>({
    name: '',
    description: '',
    permissions: [],
    expiresAt: '',
    rateLimit: 1000,
    ipWhitelist: '',
  })

  const availablePermissions = [
    'read:wallets',
    'write:wallets',
    'read:transactions',
    'write:transactions',
    'read:users',
    'write:users',
    'read:reports',
    'read:audit',
    'admin:system',
  ]

  useEffect(() => {
    fetchApiData()
  }, [])

  const fetchApiData = async () => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock API keys data
      const mockApiKeys: ApiKey[] = [
        {
          id: 'key-001',
          name: 'Trading Bot API',
          description: 'API key for automated trading bot integration',
          key: 'ck_live_51234567890abcdef1234567890abcdef12345678',
          permissions: ['read:wallets', 'write:transactions', 'read:transactions'],
          status: 'active',
          createdAt: '2024-01-15T10:00:00Z',
          lastUsed: '2024-01-20T09:30:00Z',
          expiresAt: '2024-07-15T10:00:00Z',
          usageCount: 15420,
          rateLimit: 1000,
          ipWhitelist: ['192.168.1.100', '203.0.113.45'],
          createdBy: 'John Smith',
        },
        {
          id: 'key-002',
          name: 'Mobile App API',
          description: 'API key for mobile application access',
          key: 'ck_live_98765432109876543210987654321098765432',
          permissions: ['read:wallets', 'read:transactions', 'read:users'],
          status: 'active',
          createdAt: '2024-01-10T14:30:00Z',
          lastUsed: '2024-01-20T11:15:00Z',
          expiresAt: '2024-12-31T23:59:59Z',
          usageCount: 8750,
          rateLimit: 500,
          ipWhitelist: [],
          createdBy: 'Sarah Johnson',
        },
        {
          id: 'key-003',
          name: 'Reporting Service',
          description: 'API key for automated reporting and analytics',
          key: 'ck_live_abcdef1234567890abcdef1234567890abcdef12',
          permissions: ['read:reports', 'read:audit', 'read:transactions'],
          status: 'active',
          createdAt: '2024-01-05T09:00:00Z',
          lastUsed: '2024-01-19T23:45:00Z',
          expiresAt: '2024-06-05T09:00:00Z',
          usageCount: 3200,
          rateLimit: 200,
          ipWhitelist: ['10.0.0.50'],
          createdBy: 'Mike Chen',
        },
        {
          id: 'key-004',
          name: 'Legacy Integration',
          description: 'API key for legacy system integration (deprecated)',
          key: 'ck_live_legacy123456789012345678901234567890123',
          permissions: ['read:wallets'],
          status: 'inactive',
          createdAt: '2023-12-01T12:00:00Z',
          lastUsed: '2024-01-01T00:00:00Z',
          expiresAt: '2024-03-01T12:00:00Z',
          usageCount: 450,
          rateLimit: 100,
          ipWhitelist: ['192.168.1.200'],
          createdBy: 'Emily Davis',
        },
      ]
      
      // Mock API endpoints data
      const mockApiEndpoints: ApiEndpoint[] = [
        {
          id: 'endpoint-001',
          path: '/api/v1/wallets',
          method: 'GET',
          description: 'List all wallets',
          category: 'wallets',
          requiresAuth: true,
          permissions: ['read:wallets'],
          rateLimit: 100,
          status: 'active',
          version: 'v1',
        },
        {
          id: 'endpoint-002',
          path: '/api/v1/wallets',
          method: 'POST',
          description: 'Create a new wallet',
          category: 'wallets',
          requiresAuth: true,
          permissions: ['write:wallets'],
          rateLimit: 10,
          status: 'active',
          version: 'v1',
        },
        {
          id: 'endpoint-003',
          path: '/api/v1/transactions',
          method: 'GET',
          description: 'List transactions',
          category: 'transactions',
          requiresAuth: true,
          permissions: ['read:transactions'],
          rateLimit: 200,
          status: 'active',
          version: 'v1',
        },
        {
          id: 'endpoint-004',
          path: '/api/v1/transactions',
          method: 'POST',
          description: 'Create a new transaction',
          category: 'transactions',
          requiresAuth: true,
          permissions: ['write:transactions'],
          rateLimit: 50,
          status: 'active',
          version: 'v1',
        },
        {
          id: 'endpoint-005',
          path: '/api/v1/users',
          method: 'GET',
          description: 'List users',
          category: 'users',
          requiresAuth: true,
          permissions: ['read:users'],
          rateLimit: 100,
          status: 'active',
          version: 'v1',
        },
        {
          id: 'endpoint-006',
          path: '/api/v1/reports/balance',
          method: 'GET',
          description: 'Get balance reports',
          category: 'reports',
          requiresAuth: true,
          permissions: ['read:reports'],
          rateLimit: 50,
          status: 'active',
          version: 'v1',
        },
        {
          id: 'endpoint-007',
          path: '/api/v1/audit/logs',
          method: 'GET',
          description: 'Get audit logs',
          category: 'system',
          requiresAuth: true,
          permissions: ['read:audit'],
          rateLimit: 20,
          status: 'active',
          version: 'v1',
        },
        {
          id: 'endpoint-008',
          path: '/api/v0/legacy/wallets',
          method: 'GET',
          description: 'Legacy wallet endpoint (deprecated)',
          category: 'wallets',
          requiresAuth: true,
          permissions: ['read:wallets'],
          rateLimit: 10,
          status: 'deprecated',
          version: 'v0',
        },
      ]
      
      // Mock API usage stats
      const mockApiStats: ApiUsageStats = {
        totalRequests: 127500,
        successfulRequests: 125200,
        failedRequests: 2300,
        averageResponseTime: 145,
        topEndpoints: [
          { endpoint: '/api/v1/wallets', requests: 45200 },
          { endpoint: '/api/v1/transactions', requests: 38900 },
          { endpoint: '/api/v1/users', requests: 22100 },
          { endpoint: '/api/v1/reports/balance', requests: 15400 },
          { endpoint: '/api/v1/audit/logs', requests: 5900 },
        ],
        requestsByHour: [
          { hour: '00:00', requests: 1200 },
          { hour: '01:00', requests: 800 },
          { hour: '02:00', requests: 600 },
          { hour: '03:00', requests: 400 },
          { hour: '04:00', requests: 500 },
          { hour: '05:00', requests: 700 },
          { hour: '06:00', requests: 1100 },
          { hour: '07:00', requests: 1800 },
          { hour: '08:00', requests: 2500 },
          { hour: '09:00', requests: 3200 },
          { hour: '10:00', requests: 3800 },
          { hour: '11:00', requests: 4200 },
          { hour: '12:00', requests: 4500 },
          { hour: '13:00', requests: 4300 },
          { hour: '14:00', requests: 4100 },
          { hour: '15:00', requests: 3900 },
          { hour: '16:00', requests: 3600 },
          { hour: '17:00', requests: 3200 },
          { hour: '18:00', requests: 2800 },
          { hour: '19:00', requests: 2400 },
          { hour: '20:00', requests: 2000 },
          { hour: '21:00', requests: 1600 },
          { hour: '22:00', requests: 1400 },
          { hour: '23:00', requests: 1300 },
        ],
      }
      
      setApiKeys(mockApiKeys)
      setApiEndpoints(mockApiEndpoints)
      setApiStats(mockApiStats)
    } catch (error) {
      console.error('Failed to fetch API data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load API data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateApiKey = async () => {
    try {
      setCreating(true)
      
      // Validate form
      if (!createForm.name.trim()) {
        toast({
        title: 'Validation Error',
        description: 'API key name is required',
        variant: 'destructive',
      })
        return
      }
      
      if (createForm.permissions.length === 0) {
        toast({
        title: 'Validation Error',
        description: 'At least one permission is required',
        variant: 'destructive',
      })
        return
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate new API key
      const newApiKey: ApiKey = {
        id: `key-${Date.now()}`,
        name: createForm.name,
        description: createForm.description,
        key: `ck_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        permissions: createForm.permissions,
        status: 'active',
        createdAt: new Date().toISOString(),
        usageCount: 0,
        rateLimit: createForm.rateLimit,
        ipWhitelist: createForm.ipWhitelist ? createForm.ipWhitelist.split(',').map(ip => ip.trim()) : [],
        createdBy: 'Current User',
        ...(createForm.expiresAt && { expiresAt: createForm.expiresAt }),
      }
      
      setApiKeys([newApiKey, ...apiKeys])
      setShowCreateForm(false)
      setCreateForm({
        name: '',
        description: '',
        permissions: [],
        expiresAt: '',
        rateLimit: 1000,
        ipWhitelist: '',
      })
      
      toast({
        title: 'API Key Created',
        description: `API key "${newApiKey.name}" has been created successfully`,
      })
    } catch (error) {
      console.error('Failed to create API key:', error)
      toast({
        title: 'Error',
        description: 'Failed to create API key',
        variant: 'destructive',
      })
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteApiKey = async () => {
    if (!selectedKey) return
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setApiKeys(apiKeys.filter(key => key.id !== selectedKey.id))
      setShowDeleteDialog(false)
      setSelectedKey(null)
      
      toast({
        title: 'API Key Deleted',
        description: `API key "${selectedKey.name}" has been deleted`,
      })
    } catch (error) {
      console.error('Failed to delete API key:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete API key',
        variant: 'destructive',
      })
    }
  }

  const handleToggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys)
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId)
    } else {
      newVisibleKeys.add(keyId)
    }
    setVisibleKeys(newVisibleKeys)
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: 'Copied',
      description: 'API key copied to clipboard',
    })
  }

  const handleToggleKeyStatus = async (keyId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setApiKeys(apiKeys.map(key => {
        if (key.id === keyId) {
          return {
            ...key,
            status: key.status === 'active' ? 'inactive' : 'active'
          }
        }
        return key
      }))
      
      toast({
        title: 'Status Updated',
        description: 'API key status has been updated',
      })
    } catch (error) {
      console.error('Failed to update API key status:', error)
      toast({
        title: 'Error',
        description: 'Failed to update API key status',
        variant: 'destructive',
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'deprecated': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800'
      case 'POST': return 'bg-green-100 text-green-800'
      case 'PUT': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      case 'PATCH': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const maskApiKey = (key: string | undefined) => {
    if (!key || typeof key !== 'string') {
      return 'Invalid API Key'
    }
    if (key.length < 20) {
      return key // Return as-is if too short to mask
    }
    return `${key.substring(0, 12)}...${key.substring(key.length - 8)}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading API management..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Key className="h-8 w-8" />
            API Management
          </h1>
          <p className="text-slate-600">Manage API keys, endpoints, and integrations</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={fetchApiData}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {apiStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Requests</p>
                  <p className="text-2xl font-bold text-slate-900">{apiStats.totalRequests.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Success Rate</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {((apiStats.successfulRequests / apiStats.totalRequests) * 100).toFixed(1)}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Failed Requests</p>
                  <p className="text-2xl font-bold text-slate-900">{apiStats.failedRequests.toLocaleString()}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-slate-900">{apiStats.averageResponseTime}ms</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="keys" className="space-y-6">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for accessing the custody management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={apiKeys}
                columns={[
                  {
                    key: 'name',
                    title: 'Name',
                    render: (_, key) => (
                      <div>
                        <div className="font-medium">{key.name}</div>
                        <div className="text-sm text-slate-500">{key.description}</div>
                      </div>
                    ),
                  },
                  {
                    key: 'key',
                    title: 'API Key',
                    render: (_, key) => (
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                          {visibleKeys.has(key.id) ? key.key : maskApiKey(key.key)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleKeyVisibility(key.id)}
                        >
                          {visibleKeys.has(key.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyKey(key.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  },
                  {
                    key: 'permissions',
                    title: 'Permissions',
                    render: (_, key) => (
                      <div className="flex flex-wrap gap-1">
                        {key.permissions.slice(0, 2).map((permission: string) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {key.permissions.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{key.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    ),
                  },
                  {
                    key: 'status',
                    title: 'Status',
                    render: (_, key) => (
                      <Badge className={getStatusColor(key.status)}>
                        {key.status.toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'usage',
                    title: 'Usage',
                    render: (_, key) => (
                      <div className="text-sm">
                        <div>{key.usageCount.toLocaleString()} requests</div>
                        <div className="text-slate-500">Limit: {key.rateLimit}/hour</div>
                      </div>
                    ),
                  },
                  {
                    key: 'lastUsed',
                    title: 'Last Used',
                    render: (_, key) => (
                      <div className="text-sm">
                        {key.lastUsed ? formatDate(key.lastUsed) : 'Never'}
                      </div>
                    ),
                  },
                  {
                    key: 'actions',
                    title: 'Actions',
                    render: (_, key) => (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleKeyStatus(key.id)}
                        >
                          {key.status === 'active' ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Unlock className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedKey(key)
                            setShowDeleteDialog(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Endpoints Tab */}
        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Available API endpoints and their configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={apiEndpoints}
                columns={[
                  {
                    key: 'method',
                    title: 'Method',
                    render: (_, endpoint) => (
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                    ),
                  },
                  {
                    key: 'path',
                    title: 'Endpoint',
                    render: (_, endpoint) => (
                      <div>
                        <code className="text-sm font-mono">{endpoint.path}</code>
                        <div className="text-xs text-slate-500 mt-1">{endpoint.description}</div>
                      </div>
                    ),
                  },
                  {
                    key: 'category',
                    title: 'Category',
                    render: (_, endpoint) => (
                      <Badge variant="outline" className="capitalize">
                        {endpoint.category}
                      </Badge>
                    ),
                  },
                  {
                    key: 'permissions',
                    title: 'Required Permissions',
                    render: (_, endpoint) => (
                      <div className="flex flex-wrap gap-1">
                        {endpoint.permissions.map((permission: string) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    ),
                  },
                  {
                    key: 'rateLimit',
                    title: 'Rate Limit',
                    render: (_, endpoint) => (
                      <div className="text-sm">{endpoint.rateLimit}/hour</div>
                    ),
                  },
                  {
                    key: 'status',
                    title: 'Status',
                    render: (_, endpoint) => (
                      <Badge className={getStatusColor(endpoint.status)}>
                        {endpoint.status.toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'version',
                    title: 'Version',
                    render: (_, endpoint) => (
                      <Badge variant="outline">{endpoint.version}</Badge>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Analytics Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Endpoints</CardTitle>
                <CardDescription>Most frequently used API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                {apiStats?.topEndpoints.map((endpoint, index) => (
                  <div key={endpoint.endpoint} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <code className="text-sm">{endpoint.endpoint}</code>
                    </div>
                    <div className="text-sm font-medium">{endpoint.requests.toLocaleString()}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Request Volume by Hour</CardTitle>
                <CardDescription>API request distribution over 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {apiStats?.requestsByHour.slice(0, 12).map((hourData) => (
                    <div key={hourData.hour} className="flex items-center justify-between">
                      <div className="text-sm font-medium w-16">{hourData.hour}</div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(hourData.requests / Math.max(...(apiStats?.requestsByHour.map(h => h.requests) || [1]))) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 w-16 text-right">
                        {hourData.requests.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Integration guides and API reference documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">API Reference</h3>
                    <p className="text-sm text-slate-600 mb-4">Complete API endpoint documentation</p>
                    <Button variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      View Docs
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">SDK Downloads</h3>
                    <p className="text-sm text-slate-600 mb-4">Client libraries and SDKs</p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Postman Collection</h3>
                    <p className="text-sm text-slate-600 mb-4">Import API collection for testing</p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Quick Start Guide</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">1. Create an API Key</h4>
                    <p className="text-slate-600">Generate a new API key with the required permissions for your application.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Authentication</h4>
                    <p className="text-slate-600">Include your API key in the Authorization header:</p>
                    <code className="block bg-white p-2 rounded mt-2 text-xs">
                      Authorization: Bearer your_api_key_here
                    </code>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Make API Calls</h4>
                    <p className="text-slate-600">Use the base URL and endpoint paths to interact with the API:</p>
                    <code className="block bg-white p-2 rounded mt-2 text-xs">
                      GET https://api.custody-mgmt.com/v1/wallets
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create API Key Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New API Key</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="Enter API key name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  placeholder="Enter API key description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Permissions *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission}
                        checked={createForm.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCreateForm({
                              ...createForm,
                              permissions: [...createForm.permissions, permission]
                            })
                          } else {
                            setCreateForm({
                              ...createForm,
                              permissions: createForm.permissions.filter(p => p !== permission)
                            })
                          }
                        }}
                        className="rounded border-slate-300"
                      />
                      <Label htmlFor={permission} className="text-sm">{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    value={createForm.rateLimit}
                    onChange={(e) => setCreateForm({ ...createForm, rateLimit: parseInt(e.target.value) || 1000 })}
                    min="1"
                    max="10000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Expires At (optional)</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={createForm.expiresAt}
                    onChange={(e) => setCreateForm({ ...createForm, expiresAt: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ipWhitelist">IP Whitelist (optional)</Label>
                <Input
                  id="ipWhitelist"
                  value={createForm.ipWhitelist}
                  onChange={(e) => setCreateForm({ ...createForm, ipWhitelist: e.target.value })}
                  placeholder="192.168.1.100, 203.0.113.45"
                />
                <p className="text-xs text-slate-500">Comma-separated list of allowed IP addresses</p>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateApiKey}
                  disabled={creating}
                >
                  {creating ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Create API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && selectedKey && (
        <ConfirmDialog
          title="Delete API Key"
          description={`Are you sure you want to delete the API key "${selectedKey.name}"? This action cannot be undone and will immediately revoke access for any applications using this key.`}
          confirmText="Delete"
          variant="destructive"
          onConfirm={handleDeleteApiKey}
        >
          <div />
        </ConfirmDialog>
      )}
    </div>
  )
}