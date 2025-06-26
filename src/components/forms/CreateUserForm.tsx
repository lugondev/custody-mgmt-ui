'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Loader2, UserPlus, Shield, Eye, EyeOff } from 'lucide-react'

/**
 * User creation form validation schema
 */
const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'manager', 'operator', 'viewer'], {
    required_error: 'Please select a role',
  }),
  department: z.string().min(1, 'Department is required'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
  sendWelcomeEmail: z.boolean(),
  requirePasswordChange: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type CreateUserFormData = z.infer<typeof createUserSchema>

interface CreateUserFormProps {
  onSuccess?: (user: any) => void
  onCancel?: () => void
  className?: string
}

// Available permissions by role
const ROLE_PERMISSIONS = {
  admin: [
    'user_management',
    'wallet_management',
    'transaction_approval',
    'system_settings',
    'security_settings',
    'audit_logs',
    'api_access',
  ],
  manager: [
    'wallet_management',
    'transaction_approval',
    'user_view',
    'audit_logs',
  ],
  operator: [
    'transaction_create',
    'wallet_view',
    'user_view',
  ],
  viewer: [
    'wallet_view',
    'transaction_view',
    'user_view',
  ],
}

const PERMISSION_LABELS = {
  user_management: 'User Management',
  wallet_management: 'Wallet Management',
  transaction_approval: 'Transaction Approval',
  transaction_create: 'Create Transactions',
  transaction_view: 'View Transactions',
  system_settings: 'System Settings',
  security_settings: 'Security Settings',
  audit_logs: 'Audit Logs',
  api_access: 'API Access',
  wallet_view: 'View Wallets',
  user_view: 'View Users',
}

const DEPARTMENTS = [
  'Finance',
  'Operations',
  'Security',
  'Compliance',
  'Technology',
  'Risk Management',
]

/**
 * Form component for creating new users
 */
export function CreateUserForm({ onSuccess, onCancel, className }: CreateUserFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      department: '',
      phone: undefined,
      role: 'viewer',
      permissions: ['user_view'],
      sendWelcomeEmail: true,
      requirePasswordChange: true,
    },
  })

  const watchedRole = watch('role')
  const watchedPermissions = watch('permissions')

  /**
   * Handle role change and update permissions
   */
  const handleRoleChange = (role: string) => {
    setValue('role', role as any)
    const rolePermissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || []
    setValue('permissions', rolePermissions)
  }

  /**
   * Handle permission toggle
   */
  const handlePermissionToggle = (permission: string, checked: boolean) => {
    const currentPermissions = watchedPermissions || []
    if (checked) {
      setValue('permissions', [...currentPermissions, permission])
    } else {
      setValue('permissions', currentPermissions.filter(p => p !== permission))
    }
  }

  /**
   * Handle form submission and user creation
   */
  const onSubmit = async (data: CreateUserFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock user creation
      const newUser = {
        id: `user_${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        department: data.department,
        phone: data.phone,
        permissions: data.permissions,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: null,
        requirePasswordChange: data.requirePasswordChange,
      }
      
      onSuccess?.(newUser)
    } catch (err) {
      setError('Failed to create user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Get role badge variant
   */
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'manager': return 'default'
      case 'operator': return 'secondary'
      case 'viewer': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Create New User
        </CardTitle>
        <CardDescription>
          Add a new team member with appropriate permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-medium">Personal Information</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register('firstName')}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register('lastName')}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register('phone')}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Role and Department */}
          <div className="space-y-4">
            <h4 className="font-medium">Role and Department</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select
                  value={watchedRole}
                  onValueChange={handleRoleChange}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">Admin</Badge>
                        Full system access
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Manager</Badge>
                        Management permissions
                      </div>
                    </SelectItem>
                    <SelectItem value="operator">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Operator</Badge>
                        Operational tasks
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Viewer</Badge>
                        Read-only access
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Department *</Label>
                <Select
                  value={watch('department')}
                  onValueChange={(value) => setValue('department', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Permissions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <h4 className="font-medium">Permissions</h4>
              <Badge variant={getRoleBadgeVariant(watchedRole)}>
                {watchedRole?.charAt(0).toUpperCase() + watchedRole?.slice(1)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(PERMISSION_LABELS).map(([key, label]) => {
                const isChecked = watchedPermissions?.includes(key) || false
                const isAvailable = ROLE_PERMISSIONS[watchedRole as keyof typeof ROLE_PERMISSIONS]?.includes(key)
                
                return (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={isChecked}
                      onCheckedChange={(checked) => handlePermissionToggle(key, checked as boolean)}
                      disabled={isLoading || !isAvailable}
                    />
                    <Label
                      htmlFor={key}
                      className={`text-sm ${!isAvailable ? 'text-slate-400' : ''}`}
                    >
                      {label}
                    </Label>
                  </div>
                )
              })}
            </div>
            
            {errors.permissions && (
              <p className="text-sm text-red-500">{errors.permissions.message}</p>
            )}
          </div>
          
          <Separator />
          
          {/* Security Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Security Settings</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    {...register('password')}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendWelcomeEmail"
                  {...register('sendWelcomeEmail')}
                  disabled={isLoading}
                />
                <Label htmlFor="sendWelcomeEmail" className="text-sm">
                  Send welcome email with login instructions
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requirePasswordChange"
                  {...register('requirePasswordChange')}
                  disabled={isLoading}
                />
                <Label htmlFor="requirePasswordChange" className="text-sm">
                  Require password change on first login
                </Label>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create User
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateUserForm