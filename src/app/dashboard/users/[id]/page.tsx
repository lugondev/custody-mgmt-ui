'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { DataTable, Column } from '@/components/common/DataTable'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/common/NotificationToast'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Key,
  Activity,
  Edit,
  Trash2,
  Lock,
  Unlock,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react'

interface UserDetails {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'manager' | 'operator' | 'viewer'
  department: string
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  lastLogin?: string
  avatar?: string
  permissions: string[]
  twoFactorEnabled: boolean
  emailVerified: boolean
  phoneVerified: boolean
  loginAttempts: number
  lastPasswordChange: string
  notes?: string
}

interface UserActivity {
  id: string
  action: string
  description: string
  timestamp: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failed' | 'warning'
}

interface UserSession {
  id: string
  device: string
  location: string
  ipAddress: string
  loginTime: string
  lastActivity: string
  status: 'active' | 'expired'
}

/**
 * User details page component
 */
export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addToast } = useToast()
  const [user, setUser] = useState<UserDetails | null>(null)
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [sessions, setSessions] = useState<UserSession[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSuspendDialog, setShowSuspendDialog] = useState(false)
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState<Partial<UserDetails>>({})

  useEffect(() => {
    fetchUserDetails()
  }, [params.id])

  const fetchUserDetails = async () => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const mockUser: UserDetails = {
        id: params.id,
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        role: 'manager',
        department: 'Finance',
        status: 'active',
        createdAt: '2024-01-15T10:30:00Z',
        lastLogin: '2024-01-20T09:15:00Z',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        permissions: [
          'transactions.create',
          'transactions.approve',
          'wallets.view',
          'wallets.manage',
          'users.view',
          'reports.view',
        ],
        twoFactorEnabled: true,
        emailVerified: true,
        phoneVerified: true,
        loginAttempts: 0,
        lastPasswordChange: '2024-01-10T14:20:00Z',
        notes: 'Senior finance manager with extensive experience in cryptocurrency operations.',
      }
      
      // Mock activities
      const mockActivities: UserActivity[] = [
        {
          id: 'act-001',
          action: 'Login',
          description: 'User logged in successfully',
          timestamp: '2024-01-20T09:15:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
        },
        {
          id: 'act-002',
          action: 'Transaction Approval',
          description: 'Approved transaction TX-001 for 1.5 BTC',
          timestamp: '2024-01-20T10:30:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
        },
        {
          id: 'act-003',
          action: 'Failed Login',
          description: 'Failed login attempt - incorrect password',
          timestamp: '2024-01-19T08:45:00Z',
          ipAddress: '192.168.1.105',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'failed',
        },
        {
          id: 'act-004',
          action: 'Wallet Access',
          description: 'Accessed Main Trading Wallet',
          timestamp: '2024-01-19T15:20:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          status: 'success',
        },
      ]
      
      // Mock sessions
      const mockSessions: UserSession[] = [
        {
          id: 'sess-001',
          device: 'MacBook Pro (Chrome)',
          location: 'New York, NY',
          ipAddress: '192.168.1.100',
          loginTime: '2024-01-20T09:15:00Z',
          lastActivity: '2024-01-20T11:30:00Z',
          status: 'active',
        },
        {
          id: 'sess-002',
          device: 'iPhone 15 Pro (Safari)',
          location: 'New York, NY',
          ipAddress: '192.168.1.101',
          loginTime: '2024-01-19T18:45:00Z',
          lastActivity: '2024-01-19T19:15:00Z',
          status: 'expired',
        },
      ]
      
      setUser(mockUser)
      setActivities(mockActivities)
      setSessions(mockSessions)
      setEditedUser(mockUser)
    } catch (error) {
      console.error('Failed to fetch user details:', error)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load user details',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!user) return
    
    try {
      setActionLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Updating user:', editedUser)
      
      setUser({ ...user, ...editedUser })
      setEditMode(false)
      
      addToast({
        type: 'success',
        title: 'User Updated',
        message: 'User details have been successfully updated.',
      })
    } catch (error) {
        console.error('Failed to update user:', error)
        addToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update user details.',
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleSuspendUser = async () => {
    if (!user) return
    
    try {
      setActionLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newStatus = user.status === 'suspended' ? 'active' : 'suspended'
      setUser({ ...user, status: newStatus })
      setShowSuspendDialog(false)
      
      addToast({
        type: 'success',
        title: newStatus === 'suspended' ? 'User Suspended' : 'User Activated',
        message: `User has been ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully.`,
      })
    } catch (error) {
      console.error('Failed to update user status:', error)
      addToast({
        type: 'error',
        title: 'Action Failed',
        message: 'Failed to update user status.',
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleResetPassword = async () => {
    try {
      setActionLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowResetPasswordDialog(false)
      
      addToast({
        type: 'success',
        title: 'Password Reset',
        message: 'Password reset email has been sent to the user.',
      })
    } catch (error) {
      console.error('Failed to reset password:', error)
      addToast({
        type: 'error',
        title: 'Reset Failed',
        message: 'Failed to reset user password.',
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    try {
      setActionLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addToast({
        type: 'success',
        title: 'User Deleted',
        message: 'User has been successfully deleted.',
      })
      
      router.push('/dashboard/users')
    } catch (error) {
        console.error('Failed to lock user:', error)
        addToast({
        type: 'error',
        title: 'Delete Failed',
        message: 'Failed to delete user.',
      })
    } finally {
      setActionLoading(false)
    }
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'bg-red-100 text-red-800',
      manager: 'bg-blue-100 text-blue-800',
      operator: 'bg-green-100 text-green-800',
      viewer: 'bg-gray-100 text-gray-800',
    }
    
    return (
      <Badge className={variants[role as keyof typeof variants]}>
        {role}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    )
  }

  const getActivityIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const activityColumns: Column<UserActivity>[] = [
    {
      key: 'action',
      title: 'Action',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {getActivityIcon(row.status)}
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'description',
      title: 'Description',
    },
    {
      key: 'timestamp',
      title: 'Time',
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      key: 'ipAddress',
      title: 'IP Address',
      render: (value) => <code className="text-sm">{value}</code>,
    },
  ]

  const sessionColumns: Column<UserSession>[] = [
    {
      key: 'device',
      title: 'Device',
    },
    {
      key: 'location',
      title: 'Location',
    },
    {
      key: 'ipAddress',
      title: 'IP Address',
      render: (value) => <code className="text-sm">{value}</code>,
    },
    {
      key: 'loginTime',
      title: 'Login Time',
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <Badge className={value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
          {value}
        </Badge>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading user details..." />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">User Not Found</h2>
          <p className="text-slate-600 mb-4">The requested user could not be found.</p>
          <Button onClick={() => router.push('/dashboard/users')}>Back to Users</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Details</h1>
            <p className="text-slate-600">Manage user information and permissions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false)
                  setEditedUser(user)
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                disabled={actionLoading}
              >
                {actionLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setEditMode(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowResetPasswordDialog(true)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Password
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSuspendDialog(true)}
                className={user.status === 'suspended' ? 'text-green-600' : 'text-yellow-600'}
              >
                {user.status === 'suspended' ? (
                  <><Unlock className="h-4 w-4 mr-2" />Activate</>
                ) : (
                  <><Lock className="h-4 w-4 mr-2" />Suspend</>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* User Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-slate-400" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {getRoleBadge(user.role)}
                {getStatusBadge(user.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{user.email}</span>
                  {user.emailVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{user.phone}</span>
                    {user.phoneVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-slate-400" />
                  <span>
                    {user.lastLogin 
                      ? `Last login ${new Date(user.lastLogin).toLocaleDateString()}`
                      : 'Never logged in'
                    }
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-slate-400" />
                  <span>2FA {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                  {user.twoFactorEnabled && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-slate-400" />
                  <span>Password changed {new Date(user.lastPasswordChange).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                {editMode ? 'Edit user details below' : 'View user details and information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {editMode ? (
                    <Input
                      id="name"
                      value={editedUser.name || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 bg-slate-50 rounded">{user.name}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {editMode ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedUser.email || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 bg-slate-50 rounded">{user.email}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {editMode ? (
                    <Input
                      id="phone"
                      value={editedUser.phone || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 bg-slate-50 rounded">{user.phone || 'Not provided'}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  {editMode ? (
                    <Input
                      id="department"
                      value={editedUser.department || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, department: e.target.value })}
                    />
                  ) : (
                    <div className="p-2 bg-slate-50 rounded">{user.department}</div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                {editMode ? (
                  <Textarea
                    id="notes"
                    value={editedUser.notes || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, notes: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <div className="p-2 bg-slate-50 rounded min-h-[80px]">
                    {user.notes || 'No notes available'}
                  </div>
                )}
              </div>
              
              {editMode && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="twoFactor"
                    checked={editedUser.twoFactorEnabled ?? false}
                    onCheckedChange={(checked) => setEditedUser({ ...editedUser, twoFactorEnabled: checked })}
                  />
                  <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>
                Permissions granted to this user based on their role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{permission}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <DataTable
            data={activities}
            columns={activityColumns}
            title="User Activity Log"
            description="Recent activities and actions performed by this user"
            searchable={true}
            emptyMessage="No activity found"
          />
        </TabsContent>

        <TabsContent value="sessions">
          <DataTable
            data={sessions}
            columns={sessionColumns}
            title="Active Sessions"
            description="Current and recent login sessions for this user"
            searchable={false}
            emptyMessage="No sessions found"
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {user.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
              disabled={actionLoading}
            >
              {actionLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.status === 'suspended' ? 'Activate User' : 'Suspend User'}</DialogTitle>
            <DialogDescription>
              Are you sure you want to {user.status === 'suspended' ? 'activate' : 'suspend'} {user.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={user.status === 'suspended' ? 'default' : 'destructive'}
              onClick={handleSuspendUser}
              disabled={actionLoading}
            >
              {actionLoading ? (user.status === 'suspended' ? 'Activating...' : 'Suspending...') : (user.status === 'suspended' ? 'Activate' : 'Suspend')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Send a password reset email to {user.email}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleResetPassword}
              disabled={actionLoading}
            >
              {actionLoading ? 'Sending...' : 'Send Reset Email'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}