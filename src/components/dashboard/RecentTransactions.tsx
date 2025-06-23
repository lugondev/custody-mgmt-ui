/**
 * Recent Transactions Component
 * Displays the latest transactions with status and details following Figma design
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import { MOCK_TRANSACTIONS } from '@/lib/mock-data'
import Image from 'next/image'

/**
 * Component displaying recent transaction history following Figma design
 */
export function RecentTransactions() {
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 5)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount)
  }

  const formatCryptoAmount = (amount: number, currency: string) => {
    const cryptoAmount = amount / 50000 // Mock conversion rate
    return `${cryptoAmount.toFixed(2)} ${currency}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return (
          <div className='w-10 h-10 rounded-full bg-red-50 flex items-center justify-center'>
            <ArrowUpRight className='h-5 w-5 text-red-500' />
          </div>
        )
      case 'receive':
        return (
          <div className='w-10 h-10 rounded-full bg-green-50 flex items-center justify-center'>
            <ArrowDownLeft className='h-5 w-5 text-green-500' />
          </div>
        )
      default:
        return (
          <div className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center'>
            <ArrowRight className='h-5 w-5 text-gray-500' />
          </div>
        )
    }
  }

  const getCryptoIcon = (currency: string): string => {
    const iconMap: { [key: string]: string } = {
      BTC: '/crypto-icons/btc-icon.svg',
      ETH: '/crypto-icons/eth-icon.svg',
      BNB: '/crypto-icons/bnb-icon.svg',
      SOL: '/crypto-icons/sol-icon.svg',
      USDT: '/crypto-icons/btc-icon.svg', // Fallback
    }
    return iconMap[currency] || '/crypto-icons/btc-icon.svg'
  }

  const getPortfolioIcon = (portfolio: string) => {
    if (portfolio.toLowerCase().includes('binance')) {
      return '/crypto-icons/bnb-icon.svg'
    }
    return '/crypto-icons/btc-icon.svg' // Fallback
  }

  const getPnLDisplay = (_amount: number, _type: string) => {
    const pnl = Math.random() * 2000 // Mock P/L calculation
    const percentage = Math.random() * 20
    const isPositive = Math.random() > 0.5
    
    return {
      amount: isPositive ? `$${pnl.toFixed(0)}` : `$${pnl.toFixed(2)}`,
      percentage: `${isPositive ? '+' : ''}${percentage.toFixed(2)}%`,
      isPositive
    }
  }

  return (
    <Card className='border border-gray-200 rounded-2xl'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Transactions
            </CardTitle>
          </div>
          <Button 
            variant='ghost' 
            size='sm'
            className='text-blue-600 hover:text-blue-700 font-medium'
          >
            View full transactions
            <ChevronRight className='ml-1 h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='p-0'>
        {/* Date Section */}
        <div className='px-6 py-3'>
          <h3 className='text-sm font-medium text-gray-600'>May 6, 2025</h3>
        </div>

        {/* Table */}
        <div className='border border-gray-200 rounded-xl mx-6 mb-6 overflow-hidden'>
          {/* Table Header */}
          <div className='grid grid-cols-12 gap-4 px-6 py-4 bg-white border-b border-gray-200'>
            <div className='col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wide'>
              Type
            </div>
            <div className='col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wide'>
              Asset(s)
            </div>
            <div className='col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wide text-right'>
              Current Value
            </div>
            <div className='col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wide text-right'>
              P/L
            </div>
            <div className='col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wide'>
              Portfolio
            </div>
          </div>

          {/* Table Rows */}
          {recentTransactions.map((transaction, index) => {
            const pnl = getPnLDisplay(transaction.amount, transaction.type)
            return (
              <div
                key={transaction.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
                  index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Type Column - 3 cols */}
                <div className='col-span-3 flex items-center gap-3'>
                  {getTypeIcon(transaction.type)}
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium text-gray-900 truncate'>
                      {transaction.type === 'send' ? 'Roll out' : transaction.type === 'receive' ? 'Roll in' : 'Transfer in'}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>
                      {transaction.type === 'send' ? 'Moved from Binance to MetaMask' : 'Received from KuCoin to SafePal'}
                    </p>
                  </div>
                </div>

                {/* Asset Column - 2 cols */}
                <div className='col-span-2 flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full overflow-hidden flex-shrink-0'>
                    <Image
                      src={getCryptoIcon(transaction.currency)}
                      alt={transaction.currency}
                      width={32}
                      height={32}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium text-gray-900 truncate'>
                      {formatCryptoAmount(transaction.amount, transaction.currency)}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>
                      $48,350
                    </p>
                  </div>
                </div>

                {/* Current Value Column - 2 cols */}
                <div className='col-span-2 flex items-center justify-end'>
                  <p className='text-sm font-semibold text-gray-900'>
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>

                {/* P/L Column - 2 cols */}
                <div className='col-span-2 flex items-center justify-end gap-2'>
                  <div className='text-right'>
                    <p className={`text-sm font-medium ${
                      pnl.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {pnl.amount}
                    </p>
                    <div className='flex items-center justify-end gap-1'>
                      <div className={`w-0 h-0 border-l-[3px] border-r-[3px] border-transparent ${
                        pnl.isPositive 
                          ? 'border-b-[4px] border-b-green-500' 
                          : 'border-t-[4px] border-t-red-500'
                      }`} />
                      <span className={`text-xs font-medium ${
                        pnl.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {pnl.percentage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Portfolio Column - 3 cols */}
                <div className='col-span-3 flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-full overflow-hidden flex-shrink-0'>
                    <Image
                      src={getPortfolioIcon(transaction.fromWallet || transaction.toWallet || 'Binance')}
                      alt='Portfolio'
                      width={24}
                      height={24}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium text-gray-900 truncate'>
                      {transaction.fromWallet || 'Binance'}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>
                      Binance Funding
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {recentTransactions.length === 0 && (
            <div className='py-12 text-center'>
              <ArrowUpRight className='mx-auto mb-3 h-12 w-12 text-gray-300' />
              <p className='text-gray-600'>No recent transactions</p>
              <p className='text-sm text-gray-500'>
                Your transaction history will appear here
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentTransactions
