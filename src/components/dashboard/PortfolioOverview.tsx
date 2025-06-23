import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { TrendingUp, Eye, Plus } from 'lucide-react'
import { MOCK_ANALYTICS } from '@/lib/mock-data'

/**
 * Portfolio overview with performance chart
 */
export function PortfolioOverview() {
  return (
    <Card
      className='shadow-lg'
      style={{
        borderRadius: '16px',
        background: '#019877',
        boxShadow: '0px 12px 24px 0px rgba(0, 0, 0, 0.1)',
        borderTop: '4px solid #019877',
        borderLeft: '0.5px solid #e5e7eb',
        borderRight: '0.5px solid #e5e7eb',
        borderBottom: '0.25px solid #e5e7eb',
      }}
    >
      <CardHeader className='px-4 pb-4 pt-4'>
        <div className='flex items-center justify-center'>
          <CardTitle className='text-base font-semibold text-white'>
            Overview
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className='px-0 pb-2'>
        {/* Portfolio Info Container - matching Figma design */}
        <div
          className='mx-4 mb-6 rounded-xl bg-white'
          style={{ borderRadius: '12px' }}
        >
          <div className='flex items-center justify-between px-4 py-4'>
            {/* Portfolio count section */}
            <div
              className='flex flex-col items-center justify-center rounded-lg bg-gray-100 px-2 py-2'
              style={{ borderRadius: '8px', height: '70px' }}
            >
              <div
                className='text-2xl font-medium leading-tight text-gray-900'
                style={{ letterSpacing: '-3%' }}
              >
                {MOCK_ANALYTICS.portfolio.totalAssets}
              </div>
              <div
                className='text-xs font-normal text-gray-500'
                style={{ letterSpacing: '-2%' }}
              >
                Portfolio
              </div>
            </div>

            {/* Portfolio Performance Chart */}
            <div className='h-19 relative mx-4 flex-1'>
              <ResponsiveContainer width='100%' height={76}>
                <AreaChart
                  data={MOCK_ANALYTICS.portfolio.breakdown.map((item, index) => ({ value: item.percentage, index }))}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#4FD98E' stopOpacity={0.3} />
                      <stop
                        offset='95%'
                        stopColor='#019877'
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type='monotone'
                    dataKey='value'
                    stroke='#019877'
                    strokeWidth={2}
                    fill='url(#colorValue)'
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Portfolio value section */}
          <div className='px-4 pb-1'>
            <div className='mb-1 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <p
                  className='text-3xl font-medium text-gray-900'
                  style={{ letterSpacing: '-3%' }}
                >
                  ${MOCK_ANALYTICS.portfolio.totalValue.toLocaleString()}
                </p>
                <Eye className='h-5 w-5 text-gray-500' />
              </div>
            </div>
            <div
              className='mb-4 text-sm font-normal text-gray-500'
              style={{ letterSpacing: '-2%' }}
            >
              Total Worth
            </div>
          </div>

          {/* Change indicator section */}
          <div className='flex items-center justify-between border-t border-gray-200 px-4 py-4'>
            <div className='flex items-center gap-2'>
              <Plus className='h-4 w-4 text-green-600' />
              <span
                className='text-sm font-medium text-green-600'
                style={{ letterSpacing: '-2%' }}
              >
                +${MOCK_ANALYTICS.portfolio.change24h.toLocaleString()}
              </span>
            </div>
            <div className='flex flex-1 items-center justify-end'>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <TrendingUp className='h-4 w-4 text-green-600' />
                  <span
                    className='text-sm font-medium text-green-600'
                    style={{ letterSpacing: '-2%' }}
                  >
                    +{MOCK_ANALYTICS.portfolio.changePercent24h}%
                  </span>
                </div>
                <div
                  className='flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2'
                  style={{ borderRadius: '8px', height: '32px' }}
                >
                  <span className='text-sm font-semibold text-gray-600'>
                    24h
                  </span>
                  <svg
                    className='h-4 w-4 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.67}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remove chart and quick stats to match Figma design */}
      </CardContent>
    </Card>
  )
}

export default PortfolioOverview
