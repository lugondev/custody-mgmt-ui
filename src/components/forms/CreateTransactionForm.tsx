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
import { Separator } from '@/components/ui/separator'
import { Loader2, Send, AlertTriangle, Info } from 'lucide-react'

/**
 * Transaction creation form validation schema
 */
const createTransactionSchema = z.object({
  fromWallet: z.string().min(1, 'Please select a source wallet'),
  toAddress: z.string().min(1, 'Recipient address is required'),
  amount: z.string().min(1, 'Amount is required').refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    'Amount must be a positive number'
  ),
  currency: z.string().min(1, 'Please select a currency'),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Please select transaction priority',
  }),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  gasLimit: z.string().optional(),
  gasPrice: z.string().optional(),
})

type CreateTransactionFormData = z.infer<typeof createTransactionSchema>

interface CreateTransactionFormProps {
  onSuccess?: (transaction: any) => void
  onCancel?: () => void
  className?: string
}

// Mock data for wallets and currencies
const MOCK_WALLETS = [
  { id: 'wallet_1', name: 'Main Trading Wallet', balance: '10.5', currency: 'ETH' },
  { id: 'wallet_2', name: 'Cold Storage', balance: '2.1', currency: 'BTC' },
  { id: 'wallet_3', name: 'DeFi Wallet', balance: '1500.0', currency: 'USDC' },
]

const CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin', decimals: 8 },
  { symbol: 'ETH', name: 'Ethereum', decimals: 18 },
  { symbol: 'USDC', name: 'USD Coin', decimals: 6 },
  { symbol: 'USDT', name: 'Tether', decimals: 6 },
]

/**
 * Form component for creating new transactions
 */
export function CreateTransactionForm({ onSuccess, onCancel, className }: CreateTransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [estimatedFee, setEstimatedFee] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      priority: 'medium',
      currency: 'ETH',
    },
  })

  const watchedFromWallet = watch('fromWallet')
  const watchedAmount = watch('amount')
  const watchedPriority = watch('priority')
  const watchedCurrency = watch('currency')

  /**
   * Get selected wallet details
   */
  const selectedWallet = MOCK_WALLETS.find(w => w.id === watchedFromWallet)

  /**
   * Calculate estimated transaction fee
   */
  const calculateFee = () => {
    if (!watchedAmount || !watchedPriority) return
    
    const baseAmount = Number(watchedAmount)
    const priorityMultiplier = {
      low: 0.001,
      medium: 0.002,
      high: 0.005,
    }[watchedPriority]
    
    const fee = (baseAmount * priorityMultiplier).toFixed(6)
    setEstimatedFee(fee)
  }

  // Calculate fee when relevant fields change
  useState(() => {
    calculateFee()
  })

  /**
   * Handle form submission and transaction creation
   */
  const onSubmit = async (data: CreateTransactionFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock transaction creation
      const newTransaction = {
        id: `tx_${Date.now()}`,
        fromWallet: data.fromWallet,
        toAddress: data.toAddress,
        amount: data.amount,
        currency: data.currency,
        priority: data.priority,
        description: data.description,
        status: 'pending',
        type: 'send',
        createdAt: new Date().toISOString(),
        estimatedFee: estimatedFee,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      }
      
      onSuccess?.(newTransaction)
    } catch (err) {
      setError('Failed to create transaction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Get priority badge variant
   */
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'low': return 'secondary'
      case 'medium': return 'default'
      case 'high': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Create New Transaction
        </CardTitle>
        <CardDescription>
          Send digital assets to another wallet or address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Source Wallet */}
          <div className="space-y-2">
            <Label>From Wallet *</Label>
            <Select
              value={watchedFromWallet}
              onValueChange={(value) => setValue('fromWallet', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source wallet" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_WALLETS.map((wallet) => (
                  <SelectItem key={wallet.id} value={wallet.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{wallet.name}</span>
                      <Badge variant="outline">
                        {wallet.balance} {wallet.currency}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.fromWallet && (
              <p className="text-sm text-red-500">{errors.fromWallet.message}</p>
            )}
            
            {selectedWallet && (
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  Available Balance: <span className="font-medium">{selectedWallet.balance} {selectedWallet.currency}</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Recipient Address */}
          <div className="space-y-2">
            <Label htmlFor="toAddress">Recipient Address *</Label>
            <Input
              id="toAddress"
              placeholder="0x... or wallet address"
              {...register('toAddress')}
              disabled={isLoading}
            />
            {errors.toAddress && (
              <p className="text-sm text-red-500">{errors.toAddress.message}</p>
            )}
          </div>
          
          {/* Amount and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="any"
                placeholder="0.00"
                {...register('amount')}
                disabled={isLoading}
                onChange={(e) => {
                  register('amount').onChange(e)
                  calculateFee()
                }}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Currency *</Label>
              <Select
                value={watchedCurrency}
                onValueChange={(value) => setValue('currency', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.symbol} value={currency.symbol}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{currency.symbol}</Badge>
                        {currency.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Transaction Priority */}
          <div className="space-y-2">
            <Label>Transaction Priority *</Label>
            <Select
              value={watchedPriority}
              onValueChange={(value) => {
                setValue('priority', value as any)
                calculateFee()
              }}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Low</Badge>
                    Slower confirmation (~30 min)
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Medium</Badge>
                    Standard confirmation (~10 min)
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">High</Badge>
                    Fast confirmation (~2 min)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this transaction"
              {...register('description')}
              disabled={isLoading}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          
          {/* Transaction Summary */}
          {watchedAmount && estimatedFee && (
            <div className="p-4 border rounded-lg bg-slate-50">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Transaction Summary
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{watchedAmount} {watchedCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Fee:</span>
                  <span className="font-medium">{estimatedFee} {watchedCurrency}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{(Number(watchedAmount) + Number(estimatedFee)).toFixed(6)} {watchedCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority:</span>
                  <Badge variant={getPriorityVariant(watchedPriority)}>
                    {watchedPriority?.charAt(0).toUpperCase() + watchedPriority?.slice(1)}
                  </Badge>
                </div>
              </div>
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
              Create Transaction
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateTransactionForm