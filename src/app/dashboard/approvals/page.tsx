'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  Shield,
  Search,
  Eye,
  Check,
  X,
  History,
  Settings,
} from 'lucide-react'
import {
  MOCK_TRANSACTIONS,
  MOCK_APPROVAL_WORKFLOWS,
  getMockPendingTransactions,
} from '@/lib/mock-data'
// Types are imported from mock-data

/**
 * Approvals management page component
 * Displays pending approvals, workflow management, and approval history
 */
export default function ApprovalsPage() {
  const [pendingApprovals, setPendingApprovals] = useState(
    getMockPendingTransactions()
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedApproval, setSelectedApproval] = useState<any | null>(null)
  const [approvalComment, setApprovalComment] = useState('')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const filteredApprovals = pendingApprovals.filter(approval => {
    const matchesSearch =
      approval.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority =
      priorityFilter === 'all' || approval.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  const highPriorityCount = pendingApprovals.filter(
    a => a.priority === 'high'
  ).length
  const mediumPriorityCount = pendingApprovals.filter(
    a => a.priority === 'medium'
  ).length
  const lowPriorityCount = pendingApprovals.filter(
    a => a.priority === 'low'
  ).length
  const totalPendingValue = pendingApprovals.reduce(
    (sum, approval) => sum + approval.usdValue,
    0
  )

  const handleApprove = (approvalId: string) => {
    setPendingApprovals(prev =>
      prev.map(approval =>
        approval.id === approvalId
          ? {
              ...approval,
              status: 'approved',
              currentApprovals: approval.currentApprovals + 1,
              approvers: [
                ...approval.approvers,
                {
                  userId: 'current-user',
                  name: 'Current User',
                  action: 'approved',
                  timestamp: new Date().toISOString(),
                  comment: approvalComment,
                  status: 'approved' as const,
                },
              ],
            }
          : approval
      )
    )
    setApprovalComment('')
    setSelectedApproval(null)
  }

  const handleReject = (approvalId: string) => {
    setPendingApprovals(prev =>
      prev.map(approval =>
        approval.id === approvalId
          ? {
              ...approval,
              status: 'rejected',
              approvers: [
                ...approval.approvers,
                {
                  userId: 'current-user',
                  name: 'Current User',
                  action: 'rejected',
                  timestamp: new Date().toISOString(),
                  comment: approvalComment,
                  status: 'rejected' as const,
                },
              ],
            }
          : approval
      )
    )
    setApprovalComment('')
    setSelectedApproval(null)
  }

  const getApprovalWorkflow = (_amount: number) => {
    // Return the first active workflow for now
    // In a real implementation, this would match based on rules
    return MOCK_APPROVAL_WORKFLOWS.find(workflow => workflow.isActive)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className='space-y-6 px-4'>
      {/* Page Header - Matching dashboard styling */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Approval Management</h1>
          <p className='mt-1 text-gray-600'>
            Review and manage pending transaction approvals
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <Badge
            variant='outline'
            className='border-yellow-200 bg-yellow-50 text-yellow-700'
          >
            <Clock className='mr-1 h-3 w-3' />
            {pendingApprovals.length} Pending
          </Badge>
        </div>
      </div>

      {/* Summary Cards - Updated to match dashboard styling */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:border-red-800 dark:from-red-950 dark:to-red-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-red-700 dark:text-red-300'>
              High Priority
            </CardTitle>
            <AlertTriangle className='h-4 w-4 text-red-600 dark:text-red-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-900 dark:text-red-100'>
              {highPriorityCount}
            </div>
            <p className='text-xs text-red-600 dark:text-red-400'>
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:border-yellow-800 dark:from-yellow-950 dark:to-yellow-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-yellow-700 dark:text-yellow-300'>
              Medium Priority
            </CardTitle>
            <Clock className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-yellow-900 dark:text-yellow-100'>
              {mediumPriorityCount}
            </div>
            <p className='text-xs text-yellow-600 dark:text-yellow-400'>
              Standard review process
            </p>
          </CardContent>
        </Card>

        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:border-green-800 dark:from-green-950 dark:to-green-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-green-700 dark:text-green-300'>
              Low Priority
            </CardTitle>
            <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-900 dark:text-green-100'>
              {lowPriorityCount}
            </div>
            <p className='text-xs text-green-600 dark:text-green-400'>
              Routine approvals
            </p>
          </CardContent>
        </Card>

        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:border-blue-800 dark:from-blue-950 dark:to-blue-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-blue-700 dark:text-blue-300'>
              Total Value
            </CardTitle>
            <Shield className='h-4 w-4 text-blue-600 dark:text-blue-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-900 dark:text-blue-100'>
              {formatCurrency(totalPendingValue)}
            </div>
            <p className='text-xs text-blue-600 dark:text-blue-400'>
              Awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue='pending' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='pending'>Pending Approvals</TabsTrigger>
          <TabsTrigger value='workflows'>Approval Workflows</TabsTrigger>
          <TabsTrigger value='history'>Approval History</TabsTrigger>
        </TabsList>

        {/* Pending Approvals Tab */}
        <TabsContent value='pending' className='space-y-6'>
          {/* Filters */}
          <Card className='border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold text-gray-900'>Filter Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <div className='flex-1'>
                  <Label htmlFor='search' className='text-sm font-medium text-gray-700'>Search Approvals</Label>
                  <div className='relative'>
                    <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='search'
                      placeholder='Search by ID, description, or creator...'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='pl-10 border-gray-200 rounded-xl'
                    />
                  </div>
                </div>
                <div className='w-full sm:w-48'>
                  <Label htmlFor='priority-filter' className='text-sm font-medium text-gray-700'>Priority</Label>
                  <Select
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                  >
                    <SelectTrigger className='border-gray-200 rounded-xl'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Priorities</SelectItem>
                      <SelectItem value='high'>High Priority</SelectItem>
                      <SelectItem value='medium'>Medium Priority</SelectItem>
                      <SelectItem value='low'>Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals Table */}
          <Card className='border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center text-lg font-semibold text-gray-900'>
                <Users className='mr-2 h-5 w-5 text-blue-600' />
                Pending Approvals ({filteredApprovals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Approvals</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovals.map(approval => {
                    getApprovalWorkflow(approval.usdValue)
                    return (
                      <TableRow key={approval.id}>
                        <TableCell>
                          <div>
                            <p className='text-sm font-medium text-gray-900'>{approval.id}</p>
                            <p className='max-w-[200px] truncate text-xs text-gray-500'>
                              {approval.description || 'No description'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className='font-medium text-gray-900'>
                              {approval.amount} {approval.currency}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {formatCurrency(approval.usdValue)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPriorityColor(approval.priority)}
                          >
                            {approval.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center space-x-2'>
                            <div className='text-sm'>
                              <span
                                className={
                                  approval.currentApprovals >=
                                  approval.requiredApprovals
                                    ? 'text-green-600'
                                    : 'text-yellow-600'
                                }
                              >
                                {approval.currentApprovals}/
                                {approval.requiredApprovals}
                              </span>
                            </div>
                            <div className='flex -space-x-1'>
                              {approval.approvers
                                .slice(0, 3)
                                .map((approver: any, index: number) => (
                                  <Avatar
                                    key={index}
                                    className='h-6 w-6 border-2 border-white'
                                  >
                                    <AvatarFallback className='text-xs bg-gray-100 text-gray-700'>
                                      {(approver.name || '')
                                        .split(' ')
                                        .map((n: string) => n[0])
                                        .join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              {approval.approvers.length > 3 && (
                                <div className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 dark:bg-slate-700'>
                                  <span className='text-xs text-gray-700'>
                                    +{approval.approvers.length - 3}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center space-x-2'>
                            <Avatar className='h-6 w-6'>
                              <AvatarFallback className='text-xs bg-gray-100 text-gray-700'>
                                {(approval.createdBy || '')
                                  .split(' ')
                                  .map(n => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className='text-sm text-gray-900'>
                              {approval.createdBy}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className='text-sm text-gray-900'>
                              {new Date(
                                approval.createdAt
                              ).toLocaleDateString()}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {new Date(
                                approval.createdAt
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex items-center justify-end space-x-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => setSelectedApproval(approval)}
                              className='border-gray-200 text-gray-700 hover:bg-gray-50'
                            >
                              <Eye className='mr-1 h-3 w-3' />
                              Review
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approval Workflows Tab */}
        <TabsContent value='workflows' className='space-y-6'>
          <Card className='border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center text-lg font-semibold text-gray-900'>
                <Settings className='mr-2 h-5 w-5 text-blue-600' />
                Approval Workflows
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Configure approval requirements based on transaction amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {MOCK_APPROVAL_WORKFLOWS.map((workflow, index) => (
                  <div
                    key={index}
                    className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:bg-slate-800/50'
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-gray-900'>{workflow.name}</h4>
                        <p className='text-sm text-gray-600 dark:text-slate-300'>
                          {workflow.description}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-medium text-gray-900'>
                          {workflow.rules[0]?.requiredApprovals} approvals required
                        </p>
                        <div className='mt-1 flex items-center space-x-1'>
                          {workflow.rules[0]?.approvers.map((approver: string, approverIndex: number) => (
                            <Badge
                              key={approverIndex}
                              variant='outline'
                              className='text-xs border-gray-200'
                            >
                              {approver}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      {workflow.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approval History Tab */}
        <TabsContent value='history' className='space-y-6'>
          <Card className='border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center text-lg font-semibold text-gray-900'>
                <History className='mr-2 h-5 w-5 text-blue-600' />
                Recent Approval History
              </CardTitle>
              <CardDescription className='text-gray-600'>
                View completed approval decisions and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {MOCK_TRANSACTIONS.filter(
                  tx => tx.status === 'approved' || tx.status === 'rejected'
                )
                  .slice(0, 10)
                  .map(transaction => (
                    <div
                      key={transaction.id}
                      className='flex items-center justify-between rounded-lg border border-gray-200 p-4'
                    >
                      <div className='flex items-center space-x-3'>
                        {transaction.status === 'approved' ? (
                          <CheckCircle className='h-5 w-5 text-green-500' />
                        ) : (
                          <XCircle className='h-5 w-5 text-red-500' />
                        )}
                        <div>
                          <p className='text-sm font-medium text-gray-900'>
                            {transaction.id}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {transaction.amount} {transaction.currency} •{' '}
                            {formatCurrency(transaction.usdValue)}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <Badge
                          variant={
                            transaction.status === 'approved'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {transaction.status}
                        </Badge>
                        <p className='mt-1 text-xs text-gray-500'>
                          {new Date(transaction.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approval Review Dialog */}
      {selectedApproval && (
        <Dialog
          open={!!selectedApproval}
          onOpenChange={() => setSelectedApproval(null)}
        >
          <DialogContent className='sm:max-w-[600px] border border-gray-200 rounded-2xl'>
            <DialogHeader>
              <DialogTitle className='flex items-center text-lg font-semibold text-gray-900'>
                <Shield className='mr-2 h-5 w-5' />
                Review Approval Request
              </DialogTitle>
              <DialogDescription className='text-gray-600'>
                Transaction {selectedApproval.id} requires your approval
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-6'>
              {/* Transaction Details */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-sm font-medium text-gray-700'>Transaction ID</Label>
                  <p className='rounded bg-gray-100 p-2 font-mono text-sm text-gray-900 dark:bg-slate-800'>
                    {selectedApproval.id}
                  </p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-gray-700'>Priority</Label>
                  <Badge
                    className={getPriorityColor(selectedApproval.priority)}
                  >
                    {selectedApproval.priority}
                  </Badge>
                </div>
                <div>
                  <Label className='text-sm font-medium text-gray-700'>Amount</Label>
                  <p className='text-lg font-semibold text-gray-900'>
                    {selectedApproval.amount} {selectedApproval.currency}
                  </p>
                </div>
                <div>
                  <Label className='text-sm font-medium text-gray-700'>USD Value</Label>
                  <p className='text-lg font-semibold text-gray-900'>
                    {formatCurrency(selectedApproval.usdValue)}
                  </p>
                </div>
              </div>

              {/* Approval Progress */}
              <div>
                <Label className='text-sm font-medium text-gray-700'>Approval Progress</Label>
                <div className='mt-2'>
                  <div className='mb-2 flex items-center justify-between text-sm'>
                    <span className='text-gray-900'>
                      Approvals: {selectedApproval.currentApprovals} of{' '}
                      {selectedApproval.requiredApprovals}
                    </span>
                    <span className='text-gray-600'>
                      {Math.round(
                        (selectedApproval.currentApprovals /
                          selectedApproval.requiredApprovals) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-gray-200'>
                    <div
                      className='h-2 rounded-full bg-blue-600 transition-all duration-300'
                      style={{
                        width: `${(selectedApproval.currentApprovals / selectedApproval.requiredApprovals) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Existing Approvers */}
              {selectedApproval.approvers.length > 0 && (
                <div>
                  <Label className='text-sm font-medium text-gray-700'>Previous Approvals</Label>
                  <div className='mt-2 space-y-2'>
                    {selectedApproval.approvers.map(
                      (approver: any, index: number) => (
                        <div
                          key={index}
                          className='flex items-center justify-between rounded bg-gray-50 p-2 dark:bg-slate-800'
                        >
                          <div className='flex items-center space-x-2'>
                            <Avatar className='h-6 w-6'>
                              <AvatarFallback className='text-xs bg-gray-100 text-gray-700'>
                                {(approver.name || '')
                                  .split(' ')
                                  .map((n: string) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className='text-sm text-gray-900'>{approver.name}</span>
                          </div>
                          <div className='text-right'>
                            <Badge
                              variant={
                                approver.action === 'approved'
                                  ? 'default'
                                  : 'destructive'
                              }
                            >
                              {approver.action}
                            </Badge>
                            <p className='text-xs text-gray-500'>
                              {new Date(
                                approver.timestamp
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedApproval.description && (
                <div>
                  <Label className='text-sm font-medium text-gray-700'>Description</Label>
                  <p className='mt-1 text-sm text-gray-600 dark:text-slate-300'>
                    {selectedApproval.description}
                  </p>
                </div>
              )}

              {/* Comment Section */}
              <div>
                <Label htmlFor='comment' className='text-sm font-medium text-gray-700'>Approval Comment (Optional)</Label>
                <Textarea
                  id='comment'
                  placeholder='Add a comment about your decision...'
                  value={approvalComment}
                  onChange={e => setApprovalComment(e.target.value)}
                  className='mt-1 border-gray-200 rounded-xl'
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setSelectedApproval(null)}
                className='border-gray-200 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <div className='flex space-x-2'>
                <Button
                  variant='outline'
                  onClick={() => handleReject(selectedApproval.id)}
                  className='border-red-300 text-red-600 hover:bg-red-50'
                >
                  <X className='mr-2 h-4 w-4' />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedApproval.id)}
                  className='bg-green-600 hover:bg-green-700'
                >
                  <Check className='mr-2 h-4 w-4' />
                  Approve
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
