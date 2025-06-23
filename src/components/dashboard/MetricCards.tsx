/**
 * Metric Cards Component
 * Displays key portfolio metrics in card format with Figma design
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Clock,
  ArrowDownRight,
  Eye,
  Plus,
} from 'lucide-react'
import { MOCK_ANALYTICS, MOCK_WALLETS } from '@/lib/mock-data'
import { getMockPendingTransactions } from '@/lib/mock-data'

interface MetricCardsProps {
  showOnlyTotal?: boolean
  showOnlyOthers?: boolean
}

/**
 * MetricCards component displaying key portfolio metrics
 */
export function MetricCards({ showOnlyTotal = false, showOnlyOthers = false }: MetricCardsProps = {}) {
  const pendingTransactions = getMockPendingTransactions()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const metrics = [
    {
      title: 'Total Worth',
      value: formatCurrency(MOCK_ANALYTICS.portfolio.totalValue),
      change: `+${MOCK_ANALYTICS.portfolio.change24h}%`,
      changeType: 'positive' as const,
      icon: Eye,
      showEyeIcon: true,
    },
    {
      title: 'Portfolio',
      value: MOCK_WALLETS.filter(w => w.status === 'active').length.toString(),
      change: `${MOCK_WALLETS.length} total`,
      changeType: 'neutral' as const,
      icon: Wallet,
      showEyeIcon: false,
    },
    {
      title: '24h Volume',
      value: formatCurrency(567000),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      showEyeIcon: false,
    },
    {
      title: 'Pending Transactions',
      value: pendingTransactions.length.toString(),
      change: 'Awaiting approval',
      changeType: 'warning' as const,
      icon: Clock,
      showEyeIcon: false,
    },
    {
      title: 'Total Transactions',
      value: '1,247',
      change: '+8 today',
      changeType: 'positive' as const,
      icon: DollarSign,
      showEyeIcon: false,
    },
  ]

  // Filter metrics based on props
  let filteredMetrics = metrics
  if (showOnlyTotal) {
    filteredMetrics = metrics.filter(metric => metric.title === 'Total Worth')
  } else if (showOnlyOthers) {
    filteredMetrics = metrics.filter(metric => metric.title !== 'Total Worth')
  }

  return (
    <div className={`grid gap-4 ${
      showOnlyTotal 
        ? 'grid-cols-1' 
        : showOnlyOthers 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }`}>
      {filteredMetrics.map((metric, index) => {
        const ChangeIcon =
          metric.changeType === 'positive'
            ? TrendingUp
            : metric.changeType === 'warning'
              ? ArrowDownRight
              : null

        // Special styling for the Total Worth card
        const isMainCard = metric.title === 'Total Worth'

        return (
          <Card
            key={index}
            className={`
              bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200
              ${isMainCard && showOnlyTotal ? 'bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-lg' : ''}
              ${isMainCard && !showOnlyTotal ? 'bg-gradient-to-br from-blue-50 to-white border-blue-100' : ''}
            `}
            style={{
              borderRadius: '16px',
            }}
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3 px-6 pt-6'>
              <CardTitle className={`text-sm font-medium ${
                isMainCard ? 'text-gray-600' : 'text-gray-700'
              }`}>
                {metric.title}
              </CardTitle>
              {/* Portfolio count badge for portfolio card */}
              {metric.title === 'Portfolio' && (
                <div className='bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-lg'>
                  {metric.value}
                </div>
              )}
            </CardHeader>
            <CardContent className='px-6 pb-6'>
              {/* Main value section */}
              <div className='flex items-center justify-between mb-3'>
                <div className={`text-2xl font-bold ${
                  isMainCard ? 'text-gray-900' : 'text-gray-800'
                }`}>
                  {metric.title === 'Portfolio' ? '' : metric.value}
                </div>
                {metric.showEyeIcon && (
                  <Eye className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors' />
                )}
              </div>
              
              {/* Change indicator */}
              <div className='flex items-center gap-2'>
                {metric.changeType === 'positive' && (
                  <div className='flex items-center gap-1 text-green-600'>
                    <Plus className='h-3 w-3' />
                    <span className='text-sm font-medium'>{metric.change}</span>
                  </div>
                )}
                {metric.changeType === 'neutral' && (
                  <span className='text-sm text-gray-500'>{metric.change}</span>
                )}
                {metric.changeType === 'warning' && (
                  <span className='text-sm text-orange-600 font-medium'>{metric.change}</span>
                )}
                
                {/* Trending icon for positive changes */}
                {metric.changeType === 'positive' && ChangeIcon && (
                  <ChangeIcon className='h-4 w-4 text-green-600' />
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default MetricCards
