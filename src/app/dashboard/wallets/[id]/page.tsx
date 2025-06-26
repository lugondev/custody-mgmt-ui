'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { DataTable, Column } from '@/components/common/DataTable'
import {
  ArrowLeft,
  Copy,
  Eye,
  EyeOff,
  Settings,
  Send,
  Shield,
  Key,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
} from 'lucide-react'

interface WalletDetails {
  id: string
  name: string
  description: string
  type: 'hot' | 'cold' | 'multi-sig'
  blockchain: string
  address: string
  balance: string
  balanceUSD: number
  status: 'active' | 'inactive' | 'frozen'
  createdAt: string
  updatedAt: string
  createdBy: string
  signaturesRequired?: number
  totalSigners?: number
  signers?: string[]
  publicKey?: string
  derivationPath?: string
  lastActivity: string
}

interface Transaction {
  id: string
  type: 'send' | 'receive'
  amount: string
  currency: string
  amountUSD: number
  from: string
  to: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: string
  txHash: string
  confirmations: number
  fee: string
  feeUSD: number
}

interface Activity {
  id: string
  type: 'created' | 'updated' | 'transaction' | 'signature' | 'frozen' | 'unfrozen'
  description: string
  user: string
  timestamp: string
  details?: Record<string, any>
}

/**
 * Wallet detail page component
 */
export default function WalletDetailPage() {
  const params = useParams()
  const router = useRouter()
  const walletId = params.id as string

  const [wallet, setWallet] = useState<WalletDetails | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchWalletDetails()
  }, [walletId])

  const fetchWalletDetails = async () => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock wallet data
      const mockWallet: WalletDetails = {
        id: walletId,
        name: 'Main Trading Wallet',
        description: 'Primary wallet for daily trading operations',
        type: 'multi-sig',
        blockchain: 'Bitcoin',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        balance: '2.45678901',
        balanceUSD: 123456.78,
        status: 'active',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-20T14:22:00Z',
        createdBy: 'john.doe@company.com',
        signaturesRequired: 2,
        totalSigners: 3,
        signers: ['john.doe@company.com', 'jane.smith@company.com', 'admin@company.com'],
        publicKey: 'xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPiCSQQMXnooFkuMaWjy5DS',
        derivationPath: "m/44'/0'/0'/0/0",
        lastActivity: '2024-01-20T09:15:00Z',
      }
      
      // Mock transactions
      const mockTransactions: Transaction[] = [
        {
          id: 'tx1',
          type: 'receive',
          amount: '0.5',
          currency: 'BTC',
          amountUSD: 25000,
          from: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
          to: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          status: 'confirmed',
          timestamp: '2024-01-20T09:15:00Z',
          txHash: 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d',
          confirmations: 6,
          fee: '0.00001',
          feeUSD: 0.5,
        },
        {
          id: 'tx2',
          type: 'send',
          amount: '0.1',
          currency: 'BTC',
          amountUSD: 5000,
          from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          to: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
          status: 'pending',
          timestamp: '2024-01-19T16:30:00Z',
          txHash: 'b2186ec55e527d4ca299g66c7195f3226c0456f27d6dg413gd91f0e6gcg6e59e',
          confirmations: 2,
          fee: '0.00002',
          feeUSD: 1.0,
        },
      ]
      
      // Mock activities
      const mockActivities: Activity[] = [
        {
          id: 'act1',
          type: 'transaction',
          description: 'Received 0.5 BTC',
          user: 'system',
          timestamp: '2024-01-20T09:15:00Z',
        },
        {
          id: 'act2',
          type: 'signature',
          description: 'Transaction signed by john.doe@company.com',
          user: 'john.doe@company.com',
          timestamp: '2024-01-19T16:32:00Z',
        },
        {
          id: 'act3',
          type: 'updated',
          description: 'Wallet description updated',
          user: 'admin@company.com',
          timestamp: '2024-01-18T11:20:00Z',
        },
      ]
      
      setWallet(mockWallet)
      setTransactions(mockTransactions)
      setActivities(mockActivities)
    } catch (error) {
      console.error('Failed to fetch wallet details:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You would typically show a toast notification here
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      frozen: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hot':
        return <TrendingUp className="h-4 w-4 text-orange-500" />
      case 'cold':
        return <Shield className="h-4 w-4 text-blue-500" />
      case 'multi-sig':
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <Key className="h-4 w-4" />
    }
  }

  const transactionColumns: Column<Transaction>[] = [
    {
      key: 'type',
      title: 'Type',
      render: (value) => (
        <div className="flex items-center gap-2">
          {value === 'send' ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : (
            <TrendingUp className="h-4 w-4 text-green-500" />
          )}
          <span className="capitalize">{value}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (value, row) => (
        <div>
          <div className="font-medium">{value} {row.currency}</div>
          <div className="text-sm text-slate-500">${row.amountUSD.toLocaleString()}</div>
        </div>
      ),
    },
    {
      key: 'from',
      title: 'From',
      render: (value) => (
        <div className="font-mono text-sm">
          {value.slice(0, 8)}...{value.slice(-8)}
        </div>
      ),
    },
    {
      key: 'to',
      title: 'To',
      render: (value) => (
        <div className="font-mono text-sm">
          {value.slice(0, 8)}...{value.slice(-8)}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'timestamp',
      title: 'Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  const activityColumns: Column<Activity>[] = [
    {
      key: 'type',
      title: 'Type',
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: 'description',
      title: 'Description',
    },
    {
      key: 'user',
      title: 'User',
    },
    {
      key: 'timestamp',
      title: 'Date',
      render: (value) => new Date(value).toLocaleString(),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading wallet details..." />
      </div>
    )
  }

  if (!wallet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Wallet not found</h2>
        <p className="text-slate-600 mb-4">The wallet you're looking for doesn't exist.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{wallet.name}</h1>
            <p className="text-slate-600">{wallet.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>

      {/* Wallet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Balance</p>
                <p className="text-2xl font-bold">{wallet.balance} {wallet.blockchain === 'Bitcoin' ? 'BTC' : 'ETH'}</p>
                <p className="text-sm text-slate-500">${wallet.balanceUSD.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Type</p>
                <div className="flex items-center gap-2 mt-1">
                  {getTypeIcon(wallet.type)}
                  <span className="font-medium capitalize">{wallet.type.replace('-', ' ')}</span>
                </div>
                <p className="text-sm text-slate-500">{wallet.blockchain}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <div className="mt-1">
                  {getStatusBadge(wallet.status)}
                </div>
                <p className="text-sm text-slate-500">Last activity: {new Date(wallet.lastActivity).toLocaleDateString()}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        {wallet.type === 'multi-sig' && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Signatures</p>
                  <p className="text-2xl font-bold">{wallet.signaturesRequired}/{wallet.totalSigners}</p>
                  <p className="text-sm text-slate-500">Required/Total</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Wallet Information */}
            <Card>
              <CardHeader>
                <CardTitle>Wallet Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Address</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-slate-100 rounded text-sm font-mono">
                      {wallet.address}
                    </code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(wallet.address)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600">Created</label>
                  <p className="text-sm text-slate-900 mt-1">
                    {new Date(wallet.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600">Created By</label>
                  <p className="text-sm text-slate-900 mt-1">{wallet.createdBy}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600">Last Updated</label>
                  <p className="text-sm text-slate-900 mt-1">
                    {new Date(wallet.updatedAt).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Multi-sig Information */}
            {wallet.type === 'multi-sig' && (
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Signature Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Signatures Required</label>
                    <p className="text-sm text-slate-900 mt-1">
                      {wallet.signaturesRequired} out of {wallet.totalSigners}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-600">Signers</label>
                    <div className="mt-2 space-y-2">
                      {wallet.signers?.map((signer, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-900">{signer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <DataTable
            data={transactions}
            columns={transactionColumns}
            title="Transaction History"
            description="All transactions for this wallet"
            searchPlaceholder="Search transactions..."
          />
        </TabsContent>
        
        <TabsContent value="activity">
          <DataTable
            data={activities}
            columns={activityColumns}
            title="Activity Log"
            description="All activities related to this wallet"
            searchPlaceholder="Search activities..."
          />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
              <CardDescription>
                Sensitive information about this wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {wallet.publicKey && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Public Key</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-slate-100 rounded text-sm font-mono break-all">
                      {wallet.publicKey}
                    </code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(wallet.publicKey!)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {wallet.derivationPath && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Derivation Path</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-slate-100 rounded text-sm font-mono">
                      {wallet.derivationPath}
                    </code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(wallet.derivationPath!)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-slate-600">Private Key</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-slate-100 rounded text-sm font-mono">
                    {showPrivateKey ? 'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi' : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                  >
                    {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  {showPrivateKey && (
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi')}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ Never share your private key with anyone
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}