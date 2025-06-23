'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Check,
  X,
  Clock,
  Copy,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
} from 'lucide-react'
import {
  MOCK_TRANSACTIONS,
  MOCK_WALLETS,
} from '@/lib/mock-data'

/**
 * Transactions management page component
 * Displays transaction list, creation, and approval functionality
 */
function TransactionsPageContent() {
  const searchParams = useSearchParams()
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  // Set initial filter based on URL params
  useEffect(() => {
    const status = searchParams.get('status')
    if (status) {
      setStatusFilter(status)
    }
  }, [searchParams])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.txHash?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || transaction.status === statusFilter
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateTransaction = () => {
    // Transaction creation logic would go here
    setIsCreateDialogOpen(false)
  }

  const handleApproveTransaction = (transactionId: string) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === transactionId
          ? {
              ...tx,
              status: 'approved',
              currentApprovals: tx.currentApprovals + 1,
            }
          : tx
      )
    )
  }

  const handleRejectTransaction = (transactionId: string) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === transactionId ? { ...tx, status: 'rejected' } : tx
      )
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'pending':
        return <Clock className='h-4 w-4 text-yellow-500' />
      case 'approved':
        return <Check className='h-4 w-4 text-blue-500' />
      case 'rejected':
        return <XCircle className='h-4 w-4 text-red-500' />
      default:
        return <AlertTriangle className='h-4 w-4 text-gray-500' />
    }
  }

  return (
    <div className='min-h-screen space-y-6 bg-gray-50 p-6'>
      {/* Page Header */}
      <div className='mb-8 space-y-4'>
        {/* Title */}
        <h1 className='text-2xl font-semibold text-gray-900'>
          Transactions
        </h1>
        
        {/* Controls Row */}
        <div className='flex items-center justify-between'>
          {/* Left: Tab Navigation */}
          <div className='flex rounded-md border border-gray-200 bg-white p-0.5 shadow-sm'>
            <button
              className={`rounded px-2 py-1 text-xs font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              className={`rounded px-2 py-1 text-xs font-medium transition-all ${
                statusFilter === 'receive'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setStatusFilter('receive')}
            >
              Transfer in
            </button>
            <button
              className={`rounded px-2 py-1 text-xs font-medium transition-all ${
                statusFilter === 'send'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setStatusFilter('send')}
            >
              Transfer out
            </button>
          </div>

          {/* Right: Search and Filters */}
          <div className='flex items-center gap-1.5'>
            {/* Search Bar */}
            <div className='relative'>
              <Search className='absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 transform text-gray-400' />
              <Input
                placeholder='Search...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-36 h-8 border-gray-200 bg-white pl-7 text-xs focus:border-gray-300 focus:ring-0'
              />
            </div>

            {/* Transaction Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className='w-28 h-8 border-gray-200 bg-white text-xs'>
                <SelectValue placeholder='Type: All' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Type: All</SelectItem>
                <SelectItem value='send'>Send</SelectItem>
                <SelectItem value='receive'>Receive</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <Select>
              <SelectTrigger className='w-32 h-8 border-gray-200 bg-white text-xs'>
                <SelectValue placeholder='01/01 - 14/05' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='last7'>Last 7 days</SelectItem>
                <SelectItem value='last30'>Last 30 days</SelectItem>
                <SelectItem value='custom'>Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Create Transaction Button and Dialog */}
      <div className='mb-6 flex justify-end'>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'>
              <Plus className='mr-2 h-4 w-4' />
              New Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Create New Transaction</DialogTitle>
              <DialogDescription>
                Initiate a new digital asset transaction
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='type' className='text-right'>
                  Type
                </Label>
                <Select>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='send'>Send</SelectItem>
                    <SelectItem value='receive'>Receive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='wallet' className='text-right'>
                  From Wallet
                </Label>
                <Select>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select wallet' />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_WALLETS.map(wallet => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.name} ({wallet.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='to-address' className='text-right'>
                  To Address
                </Label>
                <Input
                  id='to-address'
                  placeholder='Recipient address'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='amount' className='text-right'>
                  Amount
                </Label>
                <Input
                  id='amount'
                  type='number'
                  placeholder='0.00'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  Description
                </Label>
                <Textarea
                  id='description'
                  placeholder='Optional description'
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' onClick={handleCreateTransaction}>
                Create Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transactions List - Dynamic Data */}
      <div className='space-y-6'>
        {filteredTransactions.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-500'>No transactions found</div>
          </div>
        ) : (
          <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'>
            {/* Table Header */}
            <div className='grid grid-cols-12 gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-2.5 text-xs font-medium text-gray-500'>
              <div className='col-span-2'>Type</div>
              <div className='col-span-3'>Asset(s)</div>
              <div className='col-span-2'>Amount</div>
              <div className='col-span-2'>Status</div>
              <div className='col-span-3'>Description</div>
            </div>

            {/* Transaction Rows */}
            <div className='divide-y divide-gray-100'>
              {filteredTransactions.map((transaction) => {
                const wallet = MOCK_WALLETS.find(w => w.id === transaction.fromWallet || w.id === transaction.toWallet);
                return (
                  <div key={transaction.id} className='grid grid-cols-12 gap-3 px-4 py-3 transition-colors hover:bg-gray-50'>
                    <div className='col-span-2 flex items-center gap-2'>
                      <div className={`flex h-6 w-6 items-center justify-center rounded-md ${
                        transaction.type === 'receive' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'receive' ? (
                          <ArrowDownRight className='h-3 w-3 text-green-600' />
                        ) : (
                          <ArrowUpRight className='h-3 w-3 text-red-600' />
                        )}
                      </div>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {transaction.type === 'receive' ? 'Transfer in' : 'Transfer out'}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className='col-span-3 flex items-center gap-2'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-md bg-blue-100'>
                        <div className='flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white'>
                          {transaction.currency.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {transaction.amount} {transaction.currency}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {formatCurrency(transaction.usdValue)}
                        </div>
                      </div>
                    </div>

                    <div className='col-span-2 flex items-center'>
                      <div>
                        <div className='text-sm font-semibold text-gray-900'>
                          {formatCurrency(transaction.usdValue)}
                        </div>
                        <div className='text-xs text-gray-500'>
                          Fee: {formatCurrency(transaction.feeUsd || 0)}
                        </div>
                      </div>
                    </div>

                    <div className='col-span-2 flex items-center'>
                      <Badge
                        variant={transaction.status === 'completed' ? 'default' : 
                                transaction.status === 'pending' ? 'secondary' : 
                                transaction.status === 'approved' ? 'outline' : 'destructive'}
                        className='text-xs'
                      >
                        {transaction.status}
                      </Badge>
                    </div>

                    <div className='col-span-3 flex items-center'>
                      <div>
                        <div className='text-sm font-medium text-gray-900 truncate'>
                          {transaction.description || 'No description'}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {wallet?.name || 'Unknown wallet'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className='mt-8 flex items-center justify-center gap-2'>
          <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
            <ChevronDown className='h-4 w-4 rotate-90' />
          </Button>
          <Button
            variant='default'
            size='sm'
            className='h-8 w-8 bg-gray-900 p-0'
          >
            1
          </Button>
          <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
            2
          </Button>
          <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
            3
          </Button>
          <span className='text-gray-400'>...</span>
          <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
            16
          </Button>
          <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
            <ChevronDown className='h-4 w-4 -rotate-90' />
          </Button>
        </div>
      </div>

      {/* Transaction Details Dialog */}
      {selectedTransaction && (
        <Dialog
          open={!!selectedTransaction}
          onOpenChange={() => setSelectedTransaction(null)}
        >
          <DialogContent className='sm:max-w-[700px]'>
            <DialogHeader>
              <DialogTitle className='flex items-center'>
                {getStatusIcon(selectedTransaction.status)}
                <span className='ml-2'>Transaction Details</span>
              </DialogTitle>
              <DialogDescription>
                Complete information about transaction {selectedTransaction.id}
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-6'>
              {/* Basic Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label>Transaction ID</Label>
                  <p className='rounded bg-slate-100 p-2 font-mono text-sm dark:bg-slate-800'>
                    {selectedTransaction.id}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className='mt-1'>
                    <Badge
                      variant={
                        selectedTransaction.status === 'completed'
                          ? 'default'
                          : selectedTransaction.status === 'pending'
                            ? 'secondary'
                            : selectedTransaction.status === 'approved'
                              ? 'outline'
                              : 'destructive'
                      }
                    >
                      {selectedTransaction.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Type</Label>
                  <div className='mt-1 flex items-center space-x-2'>
                    {selectedTransaction.type === 'send' ? (
                      <ArrowUpRight className='h-4 w-4 text-red-500' />
                    ) : (
                      <ArrowDownRight className='h-4 w-4 text-green-500' />
                    )}
                    <span className='capitalize'>
                      {selectedTransaction.type}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge
                    variant={
                      selectedTransaction.priority === 'high'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {selectedTransaction.priority}
                  </Badge>
                </div>
              </div>

              {/* Amount Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label>Amount</Label>
                  <p className='text-lg font-semibold'>
                    {selectedTransaction.amount} {selectedTransaction.currency}
                  </p>
                </div>
                <div>
                  <Label>USD Value</Label>
                  <p className='text-lg font-semibold'>
                    {formatCurrency(selectedTransaction.usdValue)}
                  </p>
                </div>
                <div>
                  <Label>Fee</Label>
                  <p className='text-sm'>
                    {selectedTransaction.fee} {selectedTransaction.currency}
                  </p>
                </div>
                <div>
                  <Label>Fee (USD)</Label>
                  <p className='text-sm'>
                    {formatCurrency(selectedTransaction.feeUsd)}
                  </p>
                </div>
              </div>

              {/* Addresses */}
              <div className='space-y-3'>
                <div>
                  <Label>From Address</Label>
                  <div className='mt-1 flex items-center space-x-2'>
                    <code className='flex-1 rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800'>
                      {selectedTransaction.fromAddress}
                    </code>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        copyToClipboard(selectedTransaction.fromAddress)
                      }
                    >
                      <Copy className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>To Address</Label>
                  <div className='mt-1 flex items-center space-x-2'>
                    <code className='flex-1 rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800'>
                      {selectedTransaction.toAddress}
                    </code>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        copyToClipboard(selectedTransaction.toAddress)
                      }
                    >
                      <Copy className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Blockchain Info */}
              {selectedTransaction.txHash && (
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label>Transaction Hash</Label>
                    <div className='mt-1 flex items-center space-x-2'>
                      <code className='flex-1 rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800'>
                        {selectedTransaction.txHash}
                      </code>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          copyToClipboard(selectedTransaction.txHash!)
                        }
                      >
                        <Copy className='h-3 w-3' />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Block Height</Label>
                    <p className='mt-1 font-mono text-sm'>
                      {selectedTransaction.blockHeight?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label>Confirmations</Label>
                    <p className='mt-1 font-mono text-sm'>
                      {selectedTransaction.confirmations}
                    </p>
                  </div>
                </div>
              )}

              {/* Approval Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label>Approvals</Label>
                  <p className='text-sm'>
                    {selectedTransaction.currentApprovals} of{' '}
                    {selectedTransaction.requiredApprovals} required
                  </p>
                </div>
                <div>
                  <Label>Created By</Label>
                  <p className='text-sm'>{selectedTransaction.createdBy}</p>
                </div>
                <div>
                  <Label>Created At</Label>
                  <p className='text-sm'>
                    {new Date(selectedTransaction.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Updated At</Label>
                  <p className='text-sm'>
                    {new Date(selectedTransaction.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              {selectedTransaction.description && (
                <div>
                  <Label>Description</Label>
                  <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
                    {selectedTransaction.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {selectedTransaction.tags &&
                selectedTransaction.tags.length > 0 && (
                  <div>
                    <Label>Tags</Label>
                    <div className='mt-1 flex flex-wrap gap-2'>
                      {selectedTransaction.tags.map(
                        (tag: string, index: number) => (
                          <Badge key={index} variant='outline'>
                            {tag}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setSelectedTransaction(null)}
              >
                Close
              </Button>
              {selectedTransaction.status === 'pending' && (
                <div className='flex space-x-2'>
                  <Button
                    variant='outline'
                    onClick={() =>
                      handleRejectTransaction(selectedTransaction.id)
                    }
                    className='border-red-300 text-red-600'
                  >
                    <X className='mr-2 h-4 w-4' />
                    Reject
                  </Button>
                  <Button
                    onClick={() =>
                      handleApproveTransaction(selectedTransaction.id)
                    }
                    className='bg-green-600 hover:bg-green-700'
                  >
                    <Check className='mr-2 h-4 w-4' />
                    Approve
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsPageContent />
    </Suspense>
  )
}
