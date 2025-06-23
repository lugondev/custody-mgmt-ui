/**
 * Pending Actions Component
 * Displays pending transactions and approvals requiring attention
 */


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Send,
  Download,
} from 'lucide-react'
import { getMockPendingTransactions } from '@/lib/mock-data'

/**
 * Component showing pending actions requiring user attention
 */
export function PendingActions() {
  const pendingTransactions = getMockPendingTransactions().slice(0, 5)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffInHours = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 60 * 60)
    )

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <Send className='h-4 w-4' />
      case 'receive':
        return <Download className='h-4 w-4' />
      default:
        return <ArrowRight className='h-4 w-4' />
    }
  }

  const handleApprove = (transactionId: string) => {
    console.log(`Approving transaction: ${transactionId}`)
    // TODO: Implement approval logic
  }

  const handleReject = (transactionId: string) => {
    console.log(`Rejecting transaction: ${transactionId}`)
    // TODO: Implement rejection logic
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5' />
              Pending Actions
            </CardTitle>
            <CardDescription>
              {pendingTransactions.length} transactions awaiting approval
            </CardDescription>
          </div>
          {pendingTransactions.length > 0 && (
            <Badge
              variant='outline'
              className='border-orange-200 bg-orange-50 text-orange-700'
            >
              <AlertTriangle className='mr-1 h-3 w-3' />
              Attention Required
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        {pendingTransactions.length === 0 ? (
          <div className='py-4 text-center'>
            <CheckCircle className='mx-auto mb-2 h-8 w-8 text-green-500' />
            <p className='text-neutral-600 text-sm'>No pending actions</p>
            <p className='text-xs text-neutral-500'>
              All up to date
            </p>
          </div>
        ) : (
          <div className='space-y-3'>
            {pendingTransactions.slice(0, 3).map(transaction => (
              <div
                key={transaction.id}
                className='rounded-lg p-3 transition-colors hover:bg-neutral-50/50 border border-neutral-100'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <div className='flex items-center gap-2 min-w-0 flex-1'>
                    <div className='rounded-full bg-neutral-50 p-1 flex-shrink-0'>
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='font-medium text-neutral-900 text-sm truncate'>
                        {transaction.type === 'send' ? 'Outgoing' : 'Incoming'}
                      </p>
                      <p className='text-xs text-neutral-500 truncate'>
                        {transaction.currency} • {formatTimeAgo(transaction.createdAt)}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant='outline'
                    className={`text-xs h-5 px-1.5 flex-shrink-0 ${getPriorityColor(transaction.priority)}`}
                  >
                    {transaction.priority}
                  </Badge>
                </div>

                <div className='mb-3'>
                  <p className='text-sm font-semibold text-neutral-900'>
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className='text-xs text-neutral-500 truncate'>
                    To: {transaction.toAddress.slice(0, 6)}...{transaction.toAddress.slice(-4)}
                  </p>
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    size='sm'
                    onClick={() => handleApprove(transaction.id)}
                    className='flex-1 bg-green-600 hover:bg-green-700 h-7 text-xs'
                  >
                    <CheckCircle className='mr-1 h-3 w-3' />
                    Approve
                  </Button>

                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleReject(transaction.id)}
                    className='flex-1 border-red-200 text-red-600 hover:bg-red-50 h-7 text-xs'
                  >
                    <XCircle className='mr-1 h-3 w-3' />
                    Reject
                  </Button>
                </div>
              </div>
            ))}

            {pendingTransactions.length > 3 && (
              <div className='text-center'>
                <Button variant='ghost' size='sm' className='text-xs text-neutral-500'>
                  +{pendingTransactions.length - 3} more pending
                </Button>
              </div>
            )}

            <div className='border-t border-neutral-200 pt-3'>
              <Button variant='outline' size='sm' className='w-full text-xs'>
                View All
                <ArrowRight className='ml-1 h-3 w-3' />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PendingActions
