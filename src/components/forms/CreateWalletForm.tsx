'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Loader2, Wallet, Shield, Key } from 'lucide-react'

/**
 * Wallet creation form validation schema
 */
const createWalletSchema = z.object({
  name: z.string().min(1, 'Wallet name is required').max(50, 'Name must be less than 50 characters'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional(),
  type: z.enum(['hot', 'cold', 'multi-sig'], {
    required_error: 'Please select a wallet type',
  }),
  blockchain: z.enum(['bitcoin', 'ethereum', 'polygon', 'bsc', 'avalanche'], {
    required_error: 'Please select a blockchain',
  }),
  signaturesRequired: z.number().min(1).max(10).optional(),
  totalSigners: z.number().min(1).max(10).optional(),
})

type CreateWalletFormData = z.infer<typeof createWalletSchema>

interface CreateWalletFormProps {
  onSuccess?: (wallet: any) => void
  onCancel?: () => void
  className?: string
}

/**
 * Form component for creating new wallets
 */
export function CreateWalletForm({ onSuccess, onCancel, className }: CreateWalletFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [_currentStep, _setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateWalletFormData>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      type: 'hot',
      blockchain: 'ethereum',
      signaturesRequired: 2,
      totalSigners: 3,
    },
  })

  const watchedType = watch('type')
  const watchedBlockchain = watch('blockchain')

  /**
   * Handle form submission and wallet creation
   */
  const onSubmit = async (data: CreateWalletFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock wallet creation
      const newWallet = {
        id: `wallet_${Date.now()}`,
        name: data.name,
        description: data.description,
        type: data.type,
        blockchain: data.blockchain,
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        balance: '0.00',
        status: 'active',
        createdAt: new Date().toISOString(),
        signaturesRequired: data.type === 'multi-sig' ? data.signaturesRequired : undefined,
        totalSigners: data.type === 'multi-sig' ? data.totalSigners : undefined,
      }
      
      onSuccess?.(newWallet)
    } catch (err) {
      setError('Failed to create wallet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Get wallet type icon and description
   */
  const getWalletTypeInfo = (type: string) => {
    switch (type) {
      case 'hot':
        return {
          icon: <Wallet className="h-4 w-4" />,
          description: 'Connected to the internet for quick transactions'
        }
      case 'cold':
        return {
          icon: <Shield className="h-4 w-4" />,
          description: 'Offline storage for maximum security'
        }
      case 'multi-sig':
        return {
          icon: <Key className="h-4 w-4" />,
          description: 'Requires multiple signatures for transactions'
        }
      default:
        return { icon: null, description: '' }
    }
  }

  const typeInfo = getWalletTypeInfo(watchedType)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Create New Wallet
        </CardTitle>
        <CardDescription>
          Set up a new wallet for managing your digital assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Wallet Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Main Trading Wallet"
                {...register('name')}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description for this wallet"
                {...register('description')}
                disabled={isLoading}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
          
          {/* Wallet Configuration */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Wallet Type *</Label>
              <Select
                value={watchedType}
                onValueChange={(value) => setValue('type', value as any)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Hot Wallet
                    </div>
                  </SelectItem>
                  <SelectItem value="cold">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Cold Wallet
                    </div>
                  </SelectItem>
                  <SelectItem value="multi-sig">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Multi-Signature
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {typeInfo.description && (
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  {typeInfo.icon}
                  {typeInfo.description}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Blockchain *</Label>
              <Select
                value={watchedBlockchain}
                onValueChange={(value) => setValue('blockchain', value as any)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bitcoin">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">BTC</Badge>
                      Bitcoin
                    </div>
                  </SelectItem>
                  <SelectItem value="ethereum">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">ETH</Badge>
                      Ethereum
                    </div>
                  </SelectItem>
                  <SelectItem value="polygon">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">MATIC</Badge>
                      Polygon
                    </div>
                  </SelectItem>
                  <SelectItem value="bsc">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">BNB</Badge>
                      Binance Smart Chain
                    </div>
                  </SelectItem>
                  <SelectItem value="avalanche">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">AVAX</Badge>
                      Avalanche
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Multi-sig Configuration */}
          {watchedType === 'multi-sig' && (
            <div className="space-y-4 p-4 border rounded-lg bg-slate-50">
              <h4 className="font-medium flex items-center gap-2">
                <Key className="h-4 w-4" />
                Multi-Signature Configuration
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signaturesRequired">Signatures Required</Label>
                  <Input
                    id="signaturesRequired"
                    type="number"
                    min="1"
                    max="10"
                    {...register('signaturesRequired', { valueAsNumber: true })}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalSigners">Total Signers</Label>
                  <Input
                    id="totalSigners"
                    type="number"
                    min="1"
                    max="10"
                    {...register('totalSigners', { valueAsNumber: true })}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <p className="text-sm text-slate-600">
                This wallet will require {watch('signaturesRequired')} out of {watch('totalSigners')} signatures to authorize transactions.
              </p>
            </div>
          )}
          
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
              Create Wallet
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateWalletForm