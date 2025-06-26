'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { CreateUserForm } from '@/components/forms/CreateUserForm'
import { useToast } from '@/components/common/NotificationToast'

/**
 * Create user page component
 */
export default function CreateUserPage() {
  const router = useRouter()
  const { addToast } = useToast()
  const handleUserCreated = async (userData: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Creating user:', userData)
      
      addToast({
        type: 'success',
        title: 'User Created',
        message: `User ${userData.firstName} ${userData.lastName} has been created successfully.`,
      })
      
      router.push('/dashboard/users')
    } catch (error) {
      console.error('Failed to create user:', error)
      addToast({
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to create user. Please try again.',
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="h-8 w-8" />
            Create New User
          </h1>
          <p className="text-slate-600">Add a new user to the custody management system</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Fill in the details below to create a new user account. All required fields must be completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateUserForm
              onSuccess={handleUserCreated}
            />
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>User Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Admin</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• System configuration</li>
                <li>• All wallet operations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Manager</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Transaction approval</li>
                <li>• Wallet management</li>
                <li>• User oversight</li>
                <li>• Reporting access</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Operator</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Transaction creation</li>
                <li>• Wallet operations</li>
                <li>• Basic reporting</li>
                <li>• Limited user access</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Viewer</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Read-only access</li>
                <li>• View transactions</li>
                <li>• View wallets</li>
                <li>• Basic reports</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}