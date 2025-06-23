'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Send,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';
import { getMockPendingTransactions, getMockUserById } from '@/lib/mock-data';
import Link from 'next/link';

/**
 * Format currency value to USD
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format time ago from timestamp
 */
const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
};

/**
 * Get priority color classes
 */
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-red-200 text-red-700 bg-red-50';
    case 'medium':
      return 'border-yellow-200 text-yellow-700 bg-yellow-50';
    case 'low':
      return 'border-green-200 text-green-700 bg-green-50';
    default:
      return 'border-neutral-200 text-neutral-700 bg-neutral-50';
  }
};

/**
 * Get transaction type icon
 */
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'send':
      return <ArrowUpRight className='h-3 w-3' />;
    case 'receive':
      return <ArrowDownRight className='h-3 w-3' />;
    default:
      return <Send className='h-3 w-3' />;
  }
};

/**
 * Handle transaction approval
 */
const handleApprove = (transactionId: string) => {
  console.log('Approving transaction:', transactionId);
  // TODO: Implement actual approval logic
};

/**
 * Handle transaction rejection
 */
const handleReject = (transactionId: string) => {
  console.log('Rejecting transaction:', transactionId);
  // TODO: Implement actual rejection logic
};

/**
 * Pending Transaction Card component for dashboard
 * Shows a compact view with hover details for pending transactions
 */
export default function PendingTransactionCard() {
  const [_hoveredTransaction, setHoveredTransaction] = useState<string | null>(null);
  const pendingTransactions = getMockPendingTransactions();

  if (pendingTransactions.length === 0) {
    return (
      <Card className='bg-white border border-neutral-200 shadow-sm'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm font-medium text-neutral-900 flex items-center gap-2'>
            <Clock className='h-4 w-4 text-green-500' />
            Pending Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='py-4 text-center'>
            <CheckCircle className='mx-auto mb-2 h-8 w-8 text-green-500' />
            <p className='text-neutral-600 text-sm'>No pending transactions</p>
            <p className='text-xs text-neutral-500'>All up to date</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-sm font-medium text-neutral-900 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-yellow-500' />
            Pending Transactions
          </div>
          <Badge variant='secondary' className='text-xs'>
            {pendingTransactions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-0 space-y-2'>
        {/* Show first 2 transactions with hover details */}
        {pendingTransactions.slice(0, 2).map((transaction) => (
          <HoverCard key={transaction.id}>
            <HoverCardTrigger asChild>
              <div
                className='p-3 rounded-lg border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/50 cursor-pointer transition-all'
                onMouseEnter={() => setHoveredTransaction(transaction.id)}
                onMouseLeave={() => setHoveredTransaction(null)}
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2 min-w-0 flex-1'>
                    <div className='rounded-full bg-neutral-100 p-1 flex-shrink-0'>
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='font-medium text-sm text-neutral-900 truncate'>
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
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-neutral-900'>
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                  <div className='text-xs text-neutral-500'>
                    {transaction.currentApprovals}/{transaction.requiredApprovals} approvals
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className='w-80 p-4' side='left'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-semibold text-sm'>Transaction Details</h4>
                  <Badge
                    variant='outline'
                    className={`text-xs ${getPriorityColor(transaction.priority)}`}
                  >
                    {transaction.priority} priority
                  </Badge>
                </div>
                
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-500'>Amount:</span>
                    <span className='font-medium'>
                      {transaction.amount} {transaction.currency}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-500'>USD Value:</span>
                    <span className='font-medium'>{formatCurrency(transaction.usdValue)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-500'>To:</span>
                    <span className='font-mono text-xs'>
                      {transaction.toAddress.slice(0, 8)}...{transaction.toAddress.slice(-6)}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-500'>Created by:</span>
                    <span>{getMockUserById(transaction.createdBy)?.name || 'Unknown'}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-500'>Approvals:</span>
                    <span className={transaction.currentApprovals >= transaction.requiredApprovals ? 'text-green-600' : 'text-yellow-600'}>
                      {transaction.currentApprovals}/{transaction.requiredApprovals}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-2 pt-2 border-t border-neutral-100'>
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
            </HoverCardContent>
          </HoverCard>
        ))}

        {/* Show count if more than 2 transactions */}
        {pendingTransactions.length > 2 && (
          <div className='text-center py-2'>
            <p className='text-xs text-neutral-500'>
              +{pendingTransactions.length - 2} more pending
            </p>
          </div>
        )}

        {/* View all button */}
        <div className='pt-2 border-t border-neutral-100'>
          <Link href='/dashboard/transactions?status=pending'>
            <Button variant='ghost' size='sm' className='w-full text-xs text-neutral-600 hover:text-neutral-900'>
              View All Pending Transactions
              <ArrowRight className='ml-1 h-3 w-3' />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}