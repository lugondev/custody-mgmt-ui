'use client'

import { PortfolioOverview } from '@/components/dashboard/PortfolioOverview'
import { AssetDistribution } from '@/components/dashboard/AssetDistribution'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import PendingTransactionCard from '@/components/dashboard/PendingTransactionCard'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { MetricCards } from '@/components/dashboard/MetricCards'
import { AssetsList } from '@/components/dashboard/AssetsList'

/**
 * Main dashboard page component
 * Displays comprehensive portfolio overview and key metrics
 */
export default function DashboardPage() {
  return (
    <div className='space-y-6 px-4'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-900'>Dashboard</h1>
          <p className='mt-1 text-neutral-600'>
            Welcome back, John. Here's your portfolio overview.
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Key Metrics and Overview - 3 Elements in One Row */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
        {/* Portfolio Overview - Takes 2 columns */}
        <div className='lg:col-span-2'>
          <div className='transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'>
            <PortfolioOverview />
          </div>
        </div>

        {/* Four Metric Cards - 2x2 Grid */}
        <div className='lg:col-span-2'>
          <MetricCards showOnlyOthers={true} />
        </div>
      </div>

      {/* Assets Information */}
      <div className='w-full'>
        <AssetsList />
      </div>

      {/* Asset Distribution - Full Width */}
      <div className='w-full'>
        <AssetDistribution />
      </div>

      {/* Transactions Section - Optimized Layout */}
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-4'>
        {/* Recent Transactions - Takes most space */}
        <div className='xl:col-span-3'>
          <RecentTransactions />
        </div>

        {/* Pending Actions - Sidebar on larger screens */}
        <div className='xl:col-span-1'>
          <PendingTransactionCard />
        </div>
      </div>
    </div>
  )
}
