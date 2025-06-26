'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import {
  ArrowLeft,
  Shield,
  Key,
  Users,
  TrendingUp,
  AlertTriangle,
  Info,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createWalletSchema = z.object({
  name: z.string().min(1, 'Wallet name is required').max(50, 'Name must be less than 50 characters'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional(),
  type: z.enum(['hot', 'cold', 'multi-sig'], {
    required_error: 'Please select a wallet type',
  }),
  blockchain: z.string().min(1, 'Please select a blockchain'),
  signaturesRequired: z.number().min(1).optional(),
  signers: z.array(z.string().email('Invalid email address')).optional(),
  generateNewKeys: z.boolean(),
  importPrivateKey: z.string().optional(),
  derivationPath: z.string().optional(),
  enableBackup: z.boolean(),
  enableNotifications: z.boolean(),
})

type CreateWalletForm = z.infer<typeof createWalletSchema>

interface BlockchainOption {
  value: string
  label: string
  symbol: string
  network: string
  description: string
}

const blockchainOptions: BlockchainOption[] = [
  {
    value: 'bitcoin',
    label: 'Bitcoin',
    symbol: 'BTC',
    network: 'Mainnet',
    description: 'The original cryptocurrency network',
  },
  {
    value: 'ethereum',
    label: 'Ethereum',
    symbol: 'ETH',
    network: 'Mainnet',
    description: 'Smart contract platform',
  },
  {
    value: 'bitcoin-testnet',
    label: 'Bitcoin Testnet',
    symbol: 'tBTC',
    network: 'Testnet',
    description: 'Bitcoin test network',
  },
  {
    value: 'ethereum-goerli',
    label: 'Ethereum Goerli',
    symbol: 'GoerliETH',
    network: 'Testnet',
    description: 'Ethereum test network',
  },
]

/**
 * Create wallet page component
 */
export default function CreateWalletPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [newSignerEmail, setNewSignerEmail] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateWalletForm>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'hot',
      blockchain: '',
      generateNewKeys: true,
      enableBackup: true,
      enableNotifications: true,
      signers: [],
      signaturesRequired: 2,
      importPrivateKey: '',
      derivationPath: '',
    },
  })

  const watchedType = watch('type')
  const watchedSigners = watch('signers') || []
  const watchedGenerateNewKeys = watch('generateNewKeys')
  const watchedBlockchain = watch('blockchain')

  const onSubmit = async (data: CreateWalletForm) => {
    try {
      setLoading(true)
      
      // Validate multi-sig configuration
      if (data.type === 'multi-sig') {
        if (!data.signers || data.signers.length < 2) {
          throw new Error('Multi-sig wallets require at least 2 signers')
        }
        if (!data.signaturesRequired || data.signaturesRequired > data.signers.length) {
          throw new Error('Signatures required cannot exceed total signers')
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Creating wallet with data:', data)
      
      // Redirect to wallet list or wallet detail page
      router.push('/dashboard/wallets')
    } catch (error) {
      console.error('Failed to create wallet:', error)
      // You would typically show an error toast here
    } finally {
      setLoading(false)
    }
  }

  const addSigner = () => {
    if (newSignerEmail && !watchedSigners.includes(newSignerEmail)) {
      setValue('signers', [...watchedSigners, newSignerEmail])
      setNewSignerEmail('')
    }
  }

  const removeSigner = (email: string) => {
    setValue('signers', watchedSigners.filter(signer => signer !== email))
  }

  const getWalletTypeIcon = (type: string) => {
    switch (type) {
      case 'hot':
        return <TrendingUp className="h-5 w-5 text-orange-500" />
      case 'cold':
        return <Shield className="h-5 w-5 text-blue-500" />
      case 'multi-sig':
        return <Users className="h-5 w-5 text-purple-500" />
      default:
        return <Key className="h-5 w-5" />
    }
  }

  const getWalletTypeDescription = (type: string) => {
    switch (type) {
      case 'hot':
        return 'Connected to the internet for quick transactions. Less secure but more convenient.'
      case 'cold':
        return 'Offline storage for maximum security. Ideal for long-term holdings.'
      case 'multi-sig':
        return 'Requires multiple signatures for transactions. Enhanced security through shared control.'
      default:
        return ''
    }
  }

  const selectedBlockchain = blockchainOptions.find(option => option.value === watchedBlockchain)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create New Wallet</h1>
          <p className="text-slate-600">Set up a new wallet for your cryptocurrency assets</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide basic details about your new wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Wallet Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Main Trading Wallet"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="blockchain">Blockchain *</Label>
                <Select onValueChange={(value) => setValue('blockchain', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {blockchainOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <span>{option.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {option.symbol}
                          </Badge>
                          {option.network === 'Testnet' && (
                            <Badge variant="secondary" className="text-xs">
                              Testnet
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.blockchain && (
                  <p className="text-sm text-red-600">{errors.blockchain.message}</p>
                )}
                {selectedBlockchain && (
                  <p className="text-sm text-slate-600">{selectedBlockchain.description}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description for this wallet"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Type */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Type</CardTitle>
            <CardDescription>
              Choose the type of wallet based on your security and usage requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['hot', 'cold', 'multi-sig'].map((type) => (
                <div
                  key={type}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    watchedType === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setValue('type', type as any)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {getWalletTypeIcon(type)}
                    <h3 className="font-medium capitalize">
                      {type.replace('-', ' ')}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    {getWalletTypeDescription(type)}
                  </p>
                  {watchedType === type && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Multi-sig Configuration */}
        {watchedType === 'multi-sig' && (
          <Card>
            <CardHeader>
              <CardTitle>Multi-Signature Configuration</CardTitle>
              <CardDescription>
                Configure the multi-signature requirements for this wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signaturesRequired">Signatures Required</Label>
                <Select
                  onValueChange={(value) => setValue('signaturesRequired', parseInt(value))}
                  defaultValue="2"
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.max(1, watchedSigners.length) }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-slate-600">
                  Number of signatures required to authorize transactions
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Signers</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter signer email"
                    value={newSignerEmail}
                    onChange={(e) => setNewSignerEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSigner())}
                  />
                  <Button type="button" onClick={addSigner}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {watchedSigners.length > 0 && (
                  <div className="space-y-2 mt-3">
                    <p className="text-sm font-medium">Current Signers ({watchedSigners.length}):</p>
                    {watchedSigners.map((signer, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-sm">{signer}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSigner(signer)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {watchedSigners.length < 2 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Multi-signature wallets require at least 2 signers.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Management */}
        <Card>
          <CardHeader>
            <CardTitle>Key Management</CardTitle>
            <CardDescription>
              Configure how cryptographic keys will be generated or imported
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="generateNewKeys"
                checked={watchedGenerateNewKeys}
                onCheckedChange={(checked) => setValue('generateNewKeys', checked as boolean)}
              />
              <Label htmlFor="generateNewKeys">Generate new keys automatically</Label>
            </div>
            
            {!watchedGenerateNewKeys && (
              <div className="space-y-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Importing private keys requires extreme caution. Only import keys from trusted sources.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <Label htmlFor="importPrivateKey">Private Key</Label>
                  <div className="relative">
                    <Input
                      id="importPrivateKey"
                      type={showPrivateKey ? 'text' : 'password'}
                      placeholder="Enter private key"
                      {...register('importPrivateKey')}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="derivationPath">Derivation Path (Optional)</Label>
                  <Input
                    id="derivationPath"
                    placeholder="e.g., m/44'/0'/0'/0/0"
                    {...register('derivationPath')}
                  />
                  <p className="text-sm text-slate-600">
                    Leave empty to use default derivation path
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>
              Configure additional wallet features and security options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableBackup"
                {...register('enableBackup')}
              />
              <Label htmlFor="enableBackup">Enable automatic backup</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableNotifications"
                {...register('enableNotifications')}
              />
              <Label htmlFor="enableNotifications">Enable transaction notifications</Label>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your wallet will be created with the highest security standards. Make sure to backup your recovery phrase in a secure location.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Key className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Creating Wallet...' : 'Create Wallet'}
          </Button>
        </div>
      </form>
    </div>
  )
}