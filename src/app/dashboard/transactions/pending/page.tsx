'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { DataTable, Column } from '@/components/common/DataTable'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  DollarSign,
} from 'lucide-react'

interface PendingTransaction {
  id: string
  type: 'send' | 'receive' | 'internal'
  amount: string
  currency: string
  amountUSD: number
  fromWallet: string
  toAddress: string
  toWallet?: string
  status: 'pending_approval' | 'pending_signatures' | 'pending_broadcast'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  createdBy: string
  description?: string
  estimatedFee: string
  estimatedFeeUSD: number
  requiredSignatures: number
  currentSignatures: number
  signers: Array<{
    email: string
    signed: boolean
    signedAt?: string
  }>
  approvals: Array<{
    email: string
    approved: boolean
    approvedAt?: string
    comment?: string
  }>
  riskScore: 'low' | 'medium' | 'high'
  tags: string[]
}

/**
 * Pending transactions page component
 */
export default function PendingTransactionsPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<PendingTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<PendingTransaction | null>(null)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [approvalComment, setApprovalComment] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPendingTransactions()
  }, [])

  const fetchPendingTransactions = async () => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      const mockTransactions: PendingTransaction[] = [
        {
          id: 'tx-001',
          type: 'send',
          amount: '1.5',
          currency: 'BTC',
          amountUSD: 75000,
          fromWallet: 'Main Trading Wallet',
          toAddress: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
          status: 'pending_approval',
          priority: 'high',
          createdAt: '2024-01-20T10:30:00Z',
          createdBy: 'john.doe@company.com',
          description: 'Payment to vendor for Q1 services',
          estimatedFee: '0.0001',
          estimatedFeeUSD: 5.0,
          requiredSignatures: 2,
          currentSignatures: 0,
          signers: [
            { email: 'john.doe@company.com', signed: false },
            { email: 'jane.smith@company.com', signed: false },
            { email: 'admin@company.com', signed: false },
          ],
          approvals: [
            { email: 'manager@company.com', approved: false },
          ],
          riskScore: 'medium',
          tags: ['vendor-payment', 'q1-2024'],
        },
        {
          id: 'tx-002',
          type: 'send',
          amount: '0.05',
          currency: 'BTC',
          amountUSD: 2500,
          fromWallet: 'Cold Storage Wallet',
          toAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          status: 'pending_signatures',
          priority: 'medium',
          createdAt: '2024-01-19T15:45:00Z',
          createdBy: 'jane.smith@company.com',
          description: 'Internal transfer to hot wallet',
          estimatedFee: '0.00005',
          estimatedFeeUSD: 2.5,
          requiredSignatures: 3,
          currentSignatures: 1,
          signers: [
            { email: 'john.doe@company.com', signed: true, signedAt: '2024-01-19T16:00:00Z' },
            { email: 'jane.smith@company.com', signed: false },
            { email: 'admin@company.com', signed: false },
          ],
          approvals: [
            { email: 'manager@company.com', approved: true, approvedAt: '2024-01-19T15:50:00Z', comment: 'Approved for internal transfer' },
          ],
          riskScore: 'low',
          tags: ['internal-transfer'],
        },
        {
          id: 'tx-003',
          type: 'send',
          amount: '5.0',
          currency: 'ETH',
          amountUSD: 12500,
          fromWallet: 'Ethereum Main Wallet',
          toAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590c4',
          status: 'pending_approval',
          priority: 'urgent',
          createdAt: '2024-01-20T09:15:00Z',
          createdBy: 'admin@company.com',
          description: 'Emergency payment for critical infrastructure',
          estimatedFee: '0.002',
          estimatedFeeUSD: 5.0,
          requiredSignatures: 2,
          currentSignatures: 0,
          signers: [
            { email: 'john.doe@company.com', signed: false },
            { email: 'jane.smith@company.com', signed: false },
          ],
          approvals: [],
          riskScore: 'high',
          tags: ['emergency', 'infrastructure'],
        },
      ]
      
      setTransactions(mockTransactions)
    } catch (error) {
      console.error('Failed to fetch pending transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedTransaction) return
    
    try {
      setActionLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Approving transaction:', selectedTransaction.id, 'Comment:', approvalComment)
      
      // Update transaction status
      setTransactions(prev => prev.map(tx => 
        tx.id === selectedTransaction.id 
          ? { ...tx, status: 'pending_signatures' as const }
          : tx
      ))
      
      setShowApprovalDialog(false)
      setApprovalComment('')
      setSelectedTransaction(null)
    } catch (error) {
      console.error('Failed to approve transaction:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async () => {
    if (!selectedTransaction) return
    
    try {
      setActionLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Rejecting transaction:', selectedTransaction.id, 'Reason:', rejectReason)
      
      // Remove transaction from list
      setTransactions(prev => prev.filter(tx => tx.id !== selectedTransaction.id))
      
      setShowRejectDialog(false)
      setRejectReason('')
      setSelectedTransaction(null)
    } catch (error) {
      console.error('Failed to reject transaction:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    }
    
    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {priority}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending_approval: 'bg-yellow-100 text-yellow-800',
      pending_signatures: 'bg-blue-100 text-blue-800',
      pending_broadcast: 'bg-purple-100 text-purple-800',
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ')}
      </Badge>
    )
  }

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    }
    
    return (
      <Badge className={variants[risk as keyof typeof variants]}>
        {risk} risk
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case 'receive':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'internal':
        return <Users className="h-4 w-4 text-blue-500" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = searchTerm === '' || 
      tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.fromWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.toAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus
    const matchesPriority = filterPriority === 'all' || tx.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const columns: Column<PendingTransaction>[] = [
    {
      key: 'type',
      title: 'Type',
      render: (value) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(value)}
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
      key: 'fromWallet',
      title: 'From',
      render: (value) => (
        <div className="max-w-32 truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: 'toAddress',
      title: 'To',
      render: (value, row) => (
        <div>
          <div className="font-mono text-sm max-w-32 truncate" title={value}>
            {value.slice(0, 8)}...{value.slice(-8)}
          </div>
          {row.toWallet && (
            <div className="text-xs text-slate-500">{row.toWallet}</div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'priority',
      title: 'Priority',
      render: (value) => getPriorityBadge(value),
    },
    {
      key: 'currentSignatures',
      title: 'Signatures',
      render: (value, row) => (
        <div className="text-center">
          <span className="font-medium">{value}/{row.requiredSignatures}</span>
        </div>
      ),
    },
    {
      key: 'riskScore',
      title: 'Risk',
      render: (value) => getRiskBadge(value),
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/dashboard/transactions/${row.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {row.status === 'pending_approval' && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 hover:text-green-700"
                onClick={() => {
                  setSelectedTransaction(row)
                  setShowApprovalDialog(true)
                }}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => {
                  setSelectedTransaction(row)
                  setShowRejectDialog(true)
                }}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  const pendingApprovalCount = transactions.filter(tx => tx.status === 'pending_approval').length
  const pendingSignaturesCount = transactions.filter(tx => tx.status === 'pending_signatures').length
  const urgentCount = transactions.filter(tx => tx.priority === 'urgent').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading pending transactions..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Pending Transactions</h1>
        <p className="text-slate-600">Review and approve transactions awaiting authorization</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingApprovalCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Signatures</p>
                <p className="text-2xl font-bold text-blue-600">{pendingSignaturesCount}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Pending</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
              <Shield className="h-8 w-8 text-slate-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="pending_signatures">Pending Signatures</SelectItem>
                <SelectItem value="pending_broadcast">Pending Broadcast</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <DataTable
        data={filteredTransactions}
        columns={columns}
        title="Pending Transactions"
        description={`${filteredTransactions.length} transactions awaiting action`}
        searchable={false}
        emptyMessage="No pending transactions found"
      />

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this transaction for {selectedTransaction?.amount} {selectedTransaction?.currency}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">Transaction Details</h4>
              <div className="space-y-1 text-sm">
                <div>Amount: {selectedTransaction?.amount} {selectedTransaction?.currency}</div>
                <div>From: {selectedTransaction?.fromWallet}</div>
                <div>To: {selectedTransaction?.toAddress}</div>
                <div>Description: {selectedTransaction?.description || 'No description'}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Approval Comment (Optional)</label>
              <Textarea
                placeholder="Add a comment for this approval..."
                value={approvalComment}
                onChange={(e) => setApprovalComment(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={actionLoading}>
              {actionLoading ? 'Approving...' : 'Approve'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this transaction for {selectedTransaction?.amount} {selectedTransaction?.currency}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">Transaction Details</h4>
              <div className="space-y-1 text-sm">
                <div>Amount: {selectedTransaction?.amount} {selectedTransaction?.currency}</div>
                <div>From: {selectedTransaction?.fromWallet}</div>
                <div>To: {selectedTransaction?.toAddress}</div>
                <div>Description: {selectedTransaction?.description || 'No description'}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rejection Reason *</label>
              <Textarea
                placeholder="Please provide a reason for rejecting this transaction..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={actionLoading || !rejectReason.trim()}>
              {actionLoading ? 'Rejecting...' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}