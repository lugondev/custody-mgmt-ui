'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

/**
 * Interface for individual asset data
 */
interface Asset {
  id: string
  name: string
  symbol: string
  amount: number
  price: number
  total: number
  avgBuy: number
  change24h: number
  pnl: number
  pnlPercentage: number
  iconPath: string
}

/**
 * Mock data for assets - matching Figma design
 */
const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.56,
    price: 44250.0,
    total: 1122.0,
    avgBuy: 41250.35,
    change24h: 8.5,
    pnl: 1680,
    pnlPercentage: 12.32,
    iconPath: '/crypto-icons/btc-icon.svg',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 0.56,
    price: 44250.0,
    total: 1122.0,
    avgBuy: 41250.35,
    change24h: 5.2,
    pnl: 400,
    pnlPercentage: 12.32,
    iconPath: '/crypto-icons/eth-icon.svg',
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    amount: 0.56,
    price: 44250.0,
    total: 1122.0,
    avgBuy: 41250.35,
    change24h: -0.5,
    pnl: 10,
    pnlPercentage: 12.32,
    iconPath: '/crypto-icons/sol-icon.svg',
  },
]

/**
 * Component for displaying individual asset row
 */
function AssetRow({ asset }: { asset: Asset }) {
  const isPositive = asset.change24h > 0
  const isPnlPositive = asset.pnl > 0

  return (
    <div className='hover:bg-gray-25 grid grid-cols-7 gap-4 border-b border-gray-50 px-4 py-3 transition-colors'>
      {/* Asset Name */}
      <div className='flex min-w-0 items-center gap-2.5'>
        <div className='bg-gray-25 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full'>
          <Image
            src={asset.iconPath}
            alt={`${asset.name} icon`}
            width={32}
            height={32}
            className='h-full w-full object-contain'
          />
        </div>
        <div className='min-w-0 flex-1'>
          <div className='text-sm font-medium text-gray-900'>{asset.name}</div>
          <div className='text-xs font-medium text-gray-500'>
            {asset.symbol}
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className='flex items-center justify-start'>
        <span className='text-sm font-medium text-gray-900'>
          {asset.amount.toFixed(2)} {asset.symbol}
        </span>
      </div>

      {/* 24H Change */}
      <div className='flex items-center justify-start'>
        <span
          className={cn(
            'text-sm font-medium',
            isPositive ? 'text-green-500' : 'text-red-500'
          )}
        >
          {isPositive ? '+' : ''}
          {asset.change24h.toFixed(1)}%
        </span>
      </div>

      {/* Price */}
      <div className='flex items-center justify-start'>
        <span className='text-sm font-medium text-gray-900'>
          ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Total */}
      <div className='flex items-center justify-start'>
        <span className='text-sm font-medium text-gray-900'>
          ${asset.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Avg Buy */}
      <div className='flex items-center justify-start'>
        <span className='text-sm font-medium text-gray-900'>
          ${asset.avgBuy.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* P/L */}
      <div className='flex items-center justify-start'>
        <div className='flex items-center gap-1.5'>
          <span
            className={cn(
              'text-sm font-medium',
              isPnlPositive ? 'text-green-500' : 'text-red-500'
            )}
          >
            $
            {Math.abs(asset.pnl).toLocaleString('en-US', {
              minimumFractionDigits: 0,
            })}
          </span>
          <div className='flex items-center gap-1'>
            <div
              className={cn(
                'h-0 w-0 border-l-[2px] border-r-[2px] border-l-transparent border-r-transparent',
                isPnlPositive
                  ? 'border-b-[3px] border-b-green-500'
                  : 'border-t-[3px] border-t-red-500'
              )}
            />
            <span
              className={cn(
                'text-xs font-medium',
                isPnlPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {asset.pnlPercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Main AssetsList component
 * Displays a table of user's cryptocurrency assets with their performance metrics
 */
export function AssetsList() {
  return (
    <Card className='w-full rounded-xl border border-gray-100 shadow-sm'>
      <CardHeader className='px-4 pb-4 pt-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold text-gray-900'>
            Assets
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='hover:bg-gray-25 h-7 border-gray-100 px-2.5 text-xs text-gray-600'
            >
              <RefreshCw className='mr-1.5 h-3 w-3' />
              This month
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='hover:bg-blue-25 h-7 px-2.5 text-xs text-blue-600 hover:text-blue-700'
            >
              See all
              <ChevronRight className='ml-1 h-3 w-3' />
            </Button>
          </div>
        </div>

        {/* Subtitle */}
        <p className='mt-1 text-xs text-gray-500'>
          Your crypto assets in your portfolio
        </p>
      </CardHeader>

      <CardContent className='p-0'>
        {/* Table Header */}
        <div className='bg-gray-25 grid grid-cols-7 gap-4 border-b border-gray-50 px-4 py-3'>
          <div className='text-xs font-medium text-gray-600'>Name</div>
          <div className='text-xs font-medium text-gray-600'>Amount</div>
          <div className='text-xs font-medium text-blue-600'>24H Change</div>
          <div className='text-xs font-medium text-gray-600'>Price</div>
          <div className='text-xs font-medium text-gray-600'>Total</div>
          <div className='text-xs font-medium text-gray-600'>Avg Buy</div>
          <div className='text-xs font-medium text-gray-600'>P/L</div>
        </div>

        {/* Table Body */}
        <div>
          {mockAssets.map(asset => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
