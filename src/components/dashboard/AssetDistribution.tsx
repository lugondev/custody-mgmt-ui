/**
 * Asset Distribution Component
 * Displays portfolio asset allocation with bar chart and pie chart
 */

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { ChevronRight } from 'lucide-react'

/**
 * Asset distribution visualization component
 */
export function AssetDistribution() {
  // Portfolio allocation data for bar chart
  const portfolioData = [
    {
      name: 'Binance',
      ETH: 600,
      BTC: 400,
      USDT: 300,
      Other: 100,
    },
    {
      name: 'OKX',
      ETH: 500,
      BTC: 350,
      USDT: 200,
      Other: 50,
    },
    {
      name: 'Coinex',
      ETH: 400,
      BTC: 300,
      USDT: 150,
      Other: 30,
    },
    {
      name: 'Metamask',
      ETH: 300,
      BTC: 200,
      USDT: 100,
      Other: 20,
    },
    {
      name: 'Trust Wallet',
      ETH: 250,
      BTC: 180,
      USDT: 80,
      Other: 10,
    },
  ]

  // Asset type allocation data for pie chart
  const assetTypeData = [
    {
      name: 'ETH',
      value: 2820,
      percentage: 38.34,
      color: '#10b981', // green-500
    },
    {
      name: 'BTC',
      value: 2450,
      percentage: 33.34,
      color: '#059669', // green-600
    },
    {
      name: 'USDT',
      value: 1810,
      percentage: 24.56,
      color: '#fbbf24', // yellow-400
    },
    {
      name: 'Other',
      value: 280,
      percentage: 0.1,
      color: '#f97316', // orange-500
    },
  ]

  // Legend data for bar chart
  const legendData = [
    { name: 'ETH', color: '#059669' },
    { name: 'BTC', color: '#10b981' },
    { name: 'USDT', color: '#fbbf24' },
    { name: 'Other', color: '#f97316' },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className='rounded-lg border border-neutral-200 bg-white p-3 shadow-lg'>
          <p className='font-medium text-neutral-900'>{data.name}</p>
          <p className='text-lg font-bold' style={{ color: data.color }}>
            {formatCurrency(data.value)}
          </p>
          <p className='text-sm text-neutral-600'>
            {data.percentage}% of portfolio
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className='border border-gray-200 shadow-sm'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Distribution
            </CardTitle>
            <CardDescription className='text-sm text-gray-500 mt-1'>
              Price change percentage in the last 24 hours
            </CardDescription>
          </div>
          <Button 
            variant='ghost' 
            size='sm' 
            className='text-gray-500 hover:text-gray-700 opacity-0'
          >
            View full charts
            <ChevronRight className='ml-1 h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Two charts side by side */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Asset Allocation by Portfolio - Bar Chart */}
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-4'>
              Asset Allocation by Portfolio
            </h3>
            
            <div className='h-64'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={portfolioData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' />
                  <XAxis 
                    dataKey='name' 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    domain={[0, 1400]}
                    ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
                  />
                  <Tooltip />
                  <Bar dataKey='ETH' stackId='a' fill='#059669' radius={[0, 0, 0, 0]} />
                  <Bar dataKey='BTC' stackId='a' fill='#10b981' radius={[0, 0, 0, 0]} />
                  <Bar dataKey='USDT' stackId='a' fill='#fbbf24' radius={[0, 0, 0, 0]} />
                  <Bar dataKey='Other' stackId='a' fill='#f97316' radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className='flex items-center gap-6 mt-4'>
              {legendData.map((item, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <div 
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='text-sm text-gray-600'>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Allocation by Asset Type - Pie Chart */}
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-4'>
              Asset Allocation by Asset Type
            </h3>
            
            <div className='h-64 relative mb-6'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart width={300} height={250}>
                  <Pie
                    data={assetTypeData}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey='value'
                  >
                    {assetTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center content */}
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <div className='text-center'>
                  <div className='w-8 h-8 rounded-full bg-gray-200 mx-auto mb-1'></div>
                  <div className='text-xs text-gray-500'>{assetTypeData[0]?.name || 'ETH'}</div>
                  <div className='text-lg font-bold text-gray-900'>
                    {formatCurrency(assetTypeData[0]?.value || 0)}
                  </div>
                  <div className='text-xs text-gray-500'>
                    {assetTypeData[0]?.percentage || 0}%
                  </div>
                </div>
              </div>
            </div>

            {/* Asset breakdown list */}
            <div className='space-y-3'>
              {assetTypeData.map((asset, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: asset.color }}
                    />
                    <span className='text-sm font-medium text-gray-900'>
                      {asset.name}
                    </span>
                  </div>
                  <span className='text-sm text-gray-600'>
                    ({asset.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AssetDistribution
