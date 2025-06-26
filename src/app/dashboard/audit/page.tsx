'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { DataTable } from '@/components/common/DataTable'
import { useToast } from '@/hooks/use-toast'
import {
  Shield,
  Search,
  Filter,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  User,
  Wallet,
  Settings,
  FileText,
  Activity,
  UserPlus,
  CreditCard,
} from 'lucide-react'

interface DateRange {
  from?: Date
  to?: Date
}

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  action: string
  category:
    | 'authentication'
    | 'transaction'
    | 'wallet'
    | 'user'
    | 'system'
    | 'security'
  resource: string
  resourceId?: string
  details: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failed' | 'pending'
  severity: 'low' | 'medium' | 'high' | 'critical'
  metadata?: Record<string, any>
}

interface AuditFilters {
  dateRange: DateRange | undefined
  userId: string
  category: string
  action: string
  status: string
  severity: string
  searchTerm: string
}

interface AuditStats {
  totalLogs: number
  successfulActions: number
  failedActions: number
  criticalEvents: number
  uniqueUsers: number
  topActions: Array<{
    action: string
    count: number
  }>
}

/**
 * Audit logs page component
 */
export default function AuditPage() {
  const { toast } = useToast()
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [auditStats, setAuditStats] = useState<AuditStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [filters, setFilters] = useState<AuditFilters>({
    dateRange: undefined,
    userId: 'all',
    category: 'all',
    action: 'all',
    status: 'all',
    severity: 'all',
    searchTerm: '',
  })

  useEffect(() => {
    fetchAuditLogs()
  }, [filters])

  const fetchAuditLogs = async () => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock audit logs data
      const mockLogs: AuditLog[] = [
        {
          id: 'audit-001',
          timestamp: '2024-01-20T10:30:00Z',
          userId: 'user-001',
          userName: 'John Smith',
          userRole: 'Admin',
          action: 'User Login',
          category: 'authentication',
          resource: 'Authentication System',
          details: 'Successful login from web interface',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
          severity: 'low',
        },
        {
          id: 'audit-002',
          timestamp: '2024-01-20T10:25:00Z',
          userId: 'user-002',
          userName: 'Sarah Johnson',
          userRole: 'Manager',
          action: 'Transaction Created',
          category: 'transaction',
          resource: 'Transaction',
          resourceId: 'tx-12345',
          details:
            'Created withdrawal transaction for $50,000 from Main Trading Wallet',
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'success',
          severity: 'medium',
          metadata: {
            amount: 50000,
            currency: 'USD',
            walletId: 'wallet-001',
            destinationAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          },
        },
        {
          id: 'audit-003',
          timestamp: '2024-01-20T10:20:00Z',
          userId: 'user-003',
          userName: 'Mike Chen',
          userRole: 'Operator',
          action: 'Transaction Approved',
          category: 'transaction',
          resource: 'Transaction',
          resourceId: 'tx-12344',
          details: 'Approved pending transaction for $25,000',
          ipAddress: '192.168.1.102',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
          severity: 'high',
          metadata: {
            amount: 25000,
            currency: 'USD',
            previousStatus: 'pending',
            newStatus: 'approved',
          },
        },
        {
          id: 'audit-004',
          timestamp: '2024-01-20T10:15:00Z',
          userId: 'user-004',
          userName: 'Emily Davis',
          userRole: 'Viewer',
          action: 'Failed Login Attempt',
          category: 'authentication',
          resource: 'Authentication System',
          details: 'Failed login attempt - invalid password',
          ipAddress: '203.0.113.45',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'failed',
          severity: 'medium',
          metadata: {
            reason: 'invalid_password',
            attemptCount: 3,
          },
        },
        {
          id: 'audit-005',
          timestamp: '2024-01-20T10:10:00Z',
          userId: 'user-001',
          userName: 'John Smith',
          userRole: 'Admin',
          action: 'Wallet Created',
          category: 'wallet',
          resource: 'Wallet',
          resourceId: 'wallet-005',
          details: 'Created new multi-signature wallet for treasury operations',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
          severity: 'high',
          metadata: {
            walletType: 'multi-sig',
            requiredSignatures: 3,
            totalSigners: 5,
            blockchain: 'Bitcoin',
          },
        },
        {
          id: 'audit-006',
          timestamp: '2024-01-20T10:05:00Z',
          userId: 'user-002',
          userName: 'Sarah Johnson',
          userRole: 'Manager',
          action: 'User Role Updated',
          category: 'user',
          resource: 'User',
          resourceId: 'user-005',
          details: 'Updated user role from Operator to Manager',
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'success',
          severity: 'high',
          metadata: {
            targetUser: 'Alex Wilson',
            previousRole: 'Operator',
            newRole: 'Manager',
          },
        },
        {
          id: 'audit-007',
          timestamp: '2024-01-20T10:00:00Z',
          userId: 'system',
          userName: 'System',
          userRole: 'System',
          action: 'Automatic Backup',
          category: 'system',
          resource: 'Backup System',
          details: 'Automated daily backup completed successfully',
          ipAddress: '127.0.0.1',
          userAgent: 'System/1.0',
          status: 'success',
          severity: 'low',
          metadata: {
            backupSize: '2.5GB',
            backupLocation: 's3://company-backups/daily/2024-01-20',
            duration: '45 minutes',
          },
        },
        {
          id: 'audit-008',
          timestamp: '2024-01-20T09:55:00Z',
          userId: 'user-003',
          userName: 'Mike Chen',
          userRole: 'Operator',
          action: 'API Key Generated',
          category: 'security',
          resource: 'API Key',
          resourceId: 'key-003',
          details: 'Generated new API key for trading bot integration',
          ipAddress: '192.168.1.102',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
          severity: 'medium',
          metadata: {
            keyName: 'Trading Bot v2',
            permissions: ['read', 'transactions'],
            expiresAt: '2024-07-20T09:55:00Z',
          },
        },
        {
          id: 'audit-009',
          timestamp: '2024-01-20T09:50:00Z',
          userId: 'user-006',
          userName: 'Unknown User',
          userRole: 'Unknown',
          action: 'Suspicious Activity Detected',
          category: 'security',
          resource: 'Security System',
          details: 'Multiple failed login attempts from suspicious IP address',
          ipAddress: '198.51.100.42',
          userAgent: 'curl/7.68.0',
          status: 'failed',
          severity: 'critical',
          metadata: {
            attemptCount: 15,
            timeWindow: '5 minutes',
            blocked: true,
          },
        },
        {
          id: 'audit-010',
          timestamp: '2024-01-20T09:45:00Z',
          userId: 'user-001',
          userName: 'John Smith',
          userRole: 'Admin',
          action: 'Settings Updated',
          category: 'system',
          resource: 'System Settings',
          details: 'Updated transaction approval thresholds',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
          severity: 'medium',
          metadata: {
            setting: 'approval_threshold',
            previousValue: 10000,
            newValue: 15000,
            currency: 'USD',
          },
        },
      ]

      // Mock audit stats
      const mockStats: AuditStats = {
        totalLogs: mockLogs.length,
        successfulActions: mockLogs.filter(log => log.status === 'success')
          .length,
        failedActions: mockLogs.filter(log => log.status === 'failed').length,
        criticalEvents: mockLogs.filter(log => log.severity === 'critical')
          .length,
        uniqueUsers: new Set(mockLogs.map(log => log.userId)).size,
        topActions: [
          { action: 'User Login', count: 45 },
          { action: 'Transaction Created', count: 23 },
          { action: 'Transaction Approved', count: 18 },
          { action: 'Wallet Accessed', count: 12 },
          { action: 'Settings Updated', count: 8 },
        ],
      }

      setAuditLogs(mockLogs)
      setAuditStats(mockStats)
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load audit logs',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExportLogs = async (format: 'csv' | 'json' | 'pdf') => {
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log(`Exporting audit logs as ${format}...`)

      toast({
        title: 'Export Complete',
        description: `Audit logs exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      console.error('Failed to export logs:', error)
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'Failed to export audit logs',
      })
    }
  }

  const updateFilters = (updates: Partial<AuditFilters>) => {
    setFilters({ ...filters, ...updates })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication':
        return <User className='h-4 w-4' />
      case 'transaction':
        return <CreditCard className='h-4 w-4' />
      case 'wallet':
        return <Wallet className='h-4 w-4' />
      case 'user':
        return <UserPlus className='h-4 w-4' />
      case 'system':
        return <Settings className='h-4 w-4' />
      case 'security':
        return <Shield className='h-4 w-4' />
      default:
        return <Activity className='h-4 w-4' />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoadingSpinner size='lg' text='Loading audit logs...' />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='flex items-center gap-2 text-3xl font-bold text-slate-900'>
            <Shield className='h-8 w-8' />
            Audit Logs
          </h1>
          <p className='text-slate-600'>
            Track and monitor all system activities and user actions
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={fetchAuditLogs} disabled={loading}>
            <RefreshCw className='mr-2 h-4 w-4' />
            Refresh
          </Button>
          <Select
            onValueChange={value =>
              handleExportLogs(value as 'csv' | 'json' | 'pdf')
            }
          >
            <SelectTrigger className='w-32'>
              <SelectValue placeholder='Export' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='csv'>CSV</SelectItem>
              <SelectItem value='json'>JSON</SelectItem>
              <SelectItem value='pdf'>PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      {auditStats && (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-slate-600'>
                    Total Logs
                  </p>
                  <p className='text-2xl font-bold text-slate-900'>
                    {auditStats.totalLogs}
                  </p>
                </div>
                <FileText className='h-8 w-8 text-blue-600' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-slate-600'>
                    Successful
                  </p>
                  <p className='text-2xl font-bold text-slate-900'>
                    {auditStats.successfulActions}
                  </p>
                </div>
                <CheckCircle className='h-8 w-8 text-green-600' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-slate-600'>Failed</p>
                  <p className='text-2xl font-bold text-slate-900'>
                    {auditStats.failedActions}
                  </p>
                </div>
                <AlertTriangle className='h-8 w-8 text-red-600' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-slate-600'>
                    Critical Events
                  </p>
                  <p className='text-2xl font-bold text-slate-900'>
                    {auditStats.criticalEvents}
                  </p>
                </div>
                <AlertTriangle className='h-8 w-8 text-orange-600' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-slate-600'>
                    Unique Users
                  </p>
                  <p className='text-2xl font-bold text-slate-900'>
                    {auditStats.uniqueUsers}
                  </p>
                </div>
                <User className='h-8 w-8 text-purple-600' />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <Label>Date Range</Label>
              <DatePickerWithRange
                date={filters.dateRange}
                onDateChange={date => updateFilters({ dateRange: date })}
              />
            </div>

            <div className='space-y-2'>
              <Label>Category</Label>
              <Select
                value={filters.category}
                onValueChange={value => updateFilters({ category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Categories</SelectItem>
                  <SelectItem value='authentication'>Authentication</SelectItem>
                  <SelectItem value='transaction'>Transaction</SelectItem>
                  <SelectItem value='wallet'>Wallet</SelectItem>
                  <SelectItem value='user'>User</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                  <SelectItem value='security'>Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Status</Label>
              <Select
                value={filters.status}
                onValueChange={value => updateFilters({ status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='success'>Success</SelectItem>
                  <SelectItem value='failed'>Failed</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Severity</Label>
              <Select
                value={filters.severity}
                onValueChange={value => updateFilters({ severity: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Severity</SelectItem>
                  <SelectItem value='critical'>Critical</SelectItem>
                  <SelectItem value='high'>High</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='low'>Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Search</Label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400' />
              <Input
                placeholder='Search logs by action, user, resource, or details...'
                value={filters.searchTerm}
                onChange={e => updateFilters({ searchTerm: e.target.value })}
                className='pl-10'
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries</CardTitle>
          <CardDescription>
            Detailed log of all system activities and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={auditLogs}
            columns={[
              {
                key: 'timestamp',
                title: 'Timestamp',
                render: (_, log) => (
                  <div className='text-sm'>
                    {formatTimestamp(log.timestamp)}
                  </div>
                ),
              },
              {
                key: 'category',
                title: 'Category',
                render: (_, log) => (
                  <div className='flex items-center gap-2'>
                    {getCategoryIcon(log.category)}
                    <span className='capitalize'>{log.category}</span>
                  </div>
                ),
              },
              {
                key: 'action',
                title: 'Action',
                render: (_, log) => <div className='font-medium'>{log.action}</div>,
              },
              {
                key: 'user',
                title: 'User',
                render: (_, log) => (
                  <div>
                    <div className='font-medium'>{log.userName}</div>
                    <div className='text-sm text-slate-500'>{log.userRole}</div>
                  </div>
                ),
              },
              {
                key: 'resource',
                title: 'Resource',
                render: (_, log) => (
                  <div>
                    <div className='font-medium'>{log.resource}</div>
                    {log.resourceId && (
                      <div className='text-sm text-slate-500'>
                        {log.resourceId}
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: 'status',
                title: 'Status',
                render: (_, log) => (
                  <Badge className={getStatusColor(log.status)}>
                    {log.status.toUpperCase()}
                  </Badge>
                ),
              },
              {
                key: 'severity',
                title: 'Severity',
                render: (_, log) => (
                  <Badge className={getSeverityColor(log.severity)}>
                    {log.severity.toUpperCase()}
                  </Badge>
                ),
              },
              {
                key: 'ipAddress',
                title: 'IP Address',
                render: (_, log) => (
                  <code className='rounded bg-slate-100 px-2 py-1 text-xs'>
                    {log.ipAddress}
                  </code>
                ),
              },
              {
                key: 'actions',
                title: 'Actions',
                render: (_, log) => (
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setSelectedLog(log)}
                  >
                    <Eye className='mr-2 h-4 w-4' />
                    Details
                  </Button>
                ),
              },
            ]}
            searchable={false}
          />
        </CardContent>
      </Card>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
          <Card className='max-h-[80vh] w-full max-w-2xl overflow-y-auto'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Audit Log Details</CardTitle>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setSelectedLog(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    Timestamp
                  </Label>
                  <p className='text-sm'>
                    {formatTimestamp(selectedLog.timestamp)}
                  </p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    Log ID
                  </Label>
                  <p className='font-mono text-sm'>{selectedLog.id}</p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    User
                  </Label>
                  <p className='text-sm'>
                    {selectedLog.userName} ({selectedLog.userRole})
                  </p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    Category
                  </Label>
                  <div className='flex items-center gap-2'>
                    {getCategoryIcon(selectedLog.category)}
                    <span className='text-sm capitalize'>
                      {selectedLog.category}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    Action
                  </Label>
                  <p className='text-sm font-medium'>{selectedLog.action}</p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    Status
                  </Label>
                  <Badge className={getStatusColor(selectedLog.status)}>
                    {selectedLog.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    Severity
                  </Label>
                  <Badge className={getSeverityColor(selectedLog.severity)}>
                    {selectedLog.severity.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    IP Address
                  </Label>
                  <code className='rounded bg-slate-100 px-2 py-1 text-xs'>
                    {selectedLog.ipAddress}
                  </code>
                </div>
              </div>

              <div>
                <Label className='text-sm font-medium text-slate-600'>
                  Resource
                </Label>
                <p className='text-sm'>
                  {selectedLog.resource}
                  {selectedLog.resourceId && (
                    <span className='text-slate-500'>
                      {' '}
                      ({selectedLog.resourceId})
                    </span>
                  )}
                </p>
              </div>

              <div>
                <Label className='text-sm font-medium text-slate-600'>
                  Details
                </Label>
                <p className='rounded border bg-slate-50 p-3 text-sm'>
                  {selectedLog.details}
                </p>
              </div>

              <div>
                <Label className='text-sm font-medium text-slate-600'>
                  User Agent
                </Label>
                <p className='rounded border bg-slate-50 p-2 font-mono text-xs text-slate-500'>
                  {selectedLog.userAgent}
                </p>
              </div>

              {selectedLog.metadata && (
                <div>
                  <Label className='text-sm font-medium text-slate-600'>
                    Additional Metadata
                  </Label>
                  <pre className='overflow-x-auto rounded border bg-slate-50 p-3 text-xs'>
                    {JSON.stringify(selectedLog.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
