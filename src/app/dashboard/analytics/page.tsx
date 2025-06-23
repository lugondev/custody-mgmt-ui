'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp,
  DollarSign,
  Activity,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
} from 'lucide-react'

/**
 * Analytics Dashboard Page
 * Comprehensive financial analytics with charts and metrics
 */
export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  // Sample data for charts
  const transactionVolumeData = [
    { date: '2024-01-01', volume: 125000, transactions: 45, fees: 1250 },
    { date: '2024-01-02', volume: 98000, transactions: 38, fees: 980 },
    { date: '2024-01-03', volume: 156000, transactions: 52, fees: 1560 },
    { date: '2024-01-04', volume: 134000, transactions: 41, fees: 1340 },
    { date: '2024-01-05', volume: 187000, transactions: 67, fees: 1870 },
    { date: '2024-01-06', volume: 203000, transactions: 73, fees: 2030 },
    { date: '2024-01-07', volume: 176000, transactions: 59, fees: 1760 },
    { date: '2024-01-08', volume: 145000, transactions: 48, fees: 1450 },
    { date: '2024-01-09', volume: 167000, transactions: 55, fees: 1670 },
    { date: '2024-01-10', volume: 189000, transactions: 64, fees: 1890 },
    { date: '2024-01-11', volume: 234000, transactions: 78, fees: 2340 },
    { date: '2024-01-12', volume: 198000, transactions: 61, fees: 1980 },
    { date: '2024-01-13', volume: 156000, transactions: 49, fees: 1560 },
    { date: '2024-01-14', volume: 178000, transactions: 58, fees: 1780 },
  ]

  const portfolioPerformanceData = [
    { date: '2024-01-01', portfolio: 1000000, benchmark: 1000000 },
    { date: '2024-01-02', portfolio: 1025000, benchmark: 1015000 },
    { date: '2024-01-03', portfolio: 1045000, benchmark: 1028000 },
    { date: '2024-01-04', portfolio: 1038000, benchmark: 1032000 },
    { date: '2024-01-05', portfolio: 1067000, benchmark: 1041000 },
    { date: '2024-01-06', portfolio: 1089000, benchmark: 1055000 },
    { date: '2024-01-07', portfolio: 1076000, benchmark: 1048000 },
    { date: '2024-01-08', portfolio: 1098000, benchmark: 1062000 },
    { date: '2024-01-09', portfolio: 1123000, benchmark: 1078000 },
    { date: '2024-01-10', portfolio: 1145000, benchmark: 1089000 },
    { date: '2024-01-11', portfolio: 1167000, benchmark: 1095000 },
    { date: '2024-01-12', portfolio: 1189000, benchmark: 1108000 },
    { date: '2024-01-13', portfolio: 1178000, benchmark: 1102000 },
    { date: '2024-01-14', portfolio: 1203000, benchmark: 1115000 },
  ]

  const assetAllocationData = [
    { name: 'Bitcoin', value: 45, amount: 541500, color: '#f7931a' },
    { name: 'Ethereum', value: 25, amount: 300750, color: '#627eea' },
    { name: 'USDC', value: 15, amount: 180450, color: '#2775ca' },
    { name: 'Solana', value: 8, amount: 96240, color: '#9945ff' },
    { name: 'Cardano', value: 4, amount: 48120, color: '#0033ad' },
    { name: 'Others', value: 3, amount: 36090, color: '#64748b' },
  ]

  const monthlyGrowthData = [
    { month: 'Jan', growth: 12.5, volume: 2500000 },
    { month: 'Feb', growth: 8.3, volume: 2750000 },
    { month: 'Mar', growth: 15.7, volume: 3200000 },
    { month: 'Apr', growth: 6.2, volume: 3400000 },
    { month: 'May', growth: 18.9, volume: 4050000 },
    { month: 'Jun', growth: 11.4, volume: 4500000 },
  ]

  const topPerformersData = [
    { asset: 'SOL', change: 24.5, volume: 450000, price: 98.45 },
    { asset: 'ETH', change: 18.2, volume: 1200000, price: 2340.67 },
    { asset: 'BTC', change: 12.8, volume: 2100000, price: 43250.89 },
    { asset: 'ADA', change: 9.3, volume: 180000, price: 0.52 },
    { asset: 'DOT', change: -3.2, volume: 95000, price: 7.23 },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className='space-y-6 px-4'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-900'>Analytics Dashboard</h1>
          <p className='mt-1 text-neutral-600'>
            Comprehensive financial analytics and portfolio insights
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7d'>7 Days</SelectItem>
              <SelectItem value='30d'>30 Days</SelectItem>
              <SelectItem value='90d'>90 Days</SelectItem>
              <SelectItem value='1y'>1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' size='sm'>
            <Filter className='mr-2 h-4 w-4' />
            Filters
          </Button>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-blue-700'>
              Total Volume
            </CardTitle>
            <DollarSign className='h-4 w-4 text-blue-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-900'>$2.34M</div>
            <div className='flex items-center text-xs text-blue-600'>
              <ArrowUpRight className='mr-1 h-3 w-3' />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-green-200 bg-gradient-to-br from-green-50 to-green-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-green-700'>
              Portfolio Growth
            </CardTitle>
            <TrendingUp className='h-4 w-4 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-900'>+20.3%</div>
            <div className='flex items-center text-xs text-green-600'>
              <ArrowUpRight className='mr-1 h-3 w-3' />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-purple-700'>
              Active Wallets
            </CardTitle>
            <Users className='h-4 w-4 text-purple-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-purple-900'>847</div>
            <div className='flex items-center text-xs text-purple-600'>
              <ArrowUpRight className='mr-1 h-3 w-3' />
              <span>+5.7% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-orange-700'>
              Transactions
            </CardTitle>
            <Activity className='h-4 w-4 text-orange-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-900'>12,847</div>
            <div className='flex items-center text-xs text-orange-600'>
              <ArrowUpRight className='mr-1 h-3 w-3' />
              <span>+18.9% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue='overview' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='performance'>Performance</TabsTrigger>
          <TabsTrigger value='allocation'>Allocation</TabsTrigger>
          <TabsTrigger value='insights'>Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value='overview' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Transaction Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>
                  Daily transaction volume over the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <AreaChart data={transactionVolumeData}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='opacity-30'
                    />
                    <XAxis
                      dataKey='date'
                      tickFormatter={value =>
                        new Date(value).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      }
                      className='text-xs'
                    />
                    <YAxis
                      tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                      className='text-xs'
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        formatCurrency(value),
                        'Volume',
                      ]}
                      labelFormatter={label =>
                        new Date(label).toLocaleDateString()
                      }
                    />
                    <Area
                      type='monotone'
                      dataKey='volume'
                      stroke='#3b82f6'
                      fill='url(#volumeGradient)'
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient
                        id='volumeGradient'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#3b82f6'
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor='#3b82f6'
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth</CardTitle>
                <CardDescription>
                  Portfolio growth percentage by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={monthlyGrowthData}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='opacity-30'
                    />
                    <XAxis dataKey='month' className='text-xs' />
                    <YAxis
                      tickFormatter={value => `${value}%`}
                      className='text-xs'
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Growth']}
                    />
                    <Bar
                      dataKey='growth'
                      fill='#10b981'
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Assets</CardTitle>
              <CardDescription>
                Best performing assets in your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {topPerformersData.map(asset => (
                  <div
                    key={asset.asset}
                    className='flex items-center justify-between rounded-lg bg-neutral-50 p-4'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white'>
                        {asset.asset}
                      </div>
                      <div>
                        <div className='font-medium'>{asset.asset}</div>
                        <div className='text-sm text-neutral-600'>
                          Volume: {formatCurrency(asset.volume)}
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='font-medium'>
                        {formatCurrency(asset.price)}
                      </div>
                      <div
                        className={`flex items-center text-sm ${
                          asset.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {asset.change >= 0 ? (
                          <ArrowUpRight className='mr-1 h-3 w-3' />
                        ) : (
                          <ArrowDownRight className='mr-1 h-3 w-3' />
                        )}
                        {formatPercentage(asset.change)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value='performance' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance vs Benchmark</CardTitle>
              <CardDescription>
                Compare your portfolio performance against market benchmark
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={400}>
                <LineChart data={portfolioPerformanceData}>
                  <CartesianGrid strokeDasharray='3 3' className='opacity-30' />
                  <XAxis
                    dataKey='date'
                    tickFormatter={value =>
                      new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    }
                    className='text-xs'
                  />
                  <YAxis
                    tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                    className='text-xs'
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === 'portfolio' ? 'Portfolio' : 'Benchmark',
                    ]}
                    labelFormatter={label =>
                      new Date(label).toLocaleDateString()
                    }
                  />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='portfolio'
                    stroke='#3b82f6'
                    strokeWidth={3}
                    name='Portfolio'
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type='monotone'
                    dataKey='benchmark'
                    stroke='#64748b'
                    strokeWidth={2}
                    strokeDasharray='5 5'
                    name='Benchmark'
                    dot={{ fill: '#64748b', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Allocation Tab */}
        <TabsContent value='allocation' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Asset Allocation Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Current distribution of assets in your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Pie
                      data={assetAllocationData}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey='value'
                    >
                      {assetAllocationData.map(entry => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, props: any) => [
                        `${value}% (${formatCurrency(props.payload.amount)})`,
                        props.payload.name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Allocation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Allocation Details</CardTitle>
                <CardDescription>
                  Detailed breakdown of asset allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {assetAllocationData.map(asset => (
                    <div
                      key={asset.name}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className='h-4 w-4 rounded-full'
                          style={{ backgroundColor: asset.color }}
                        />
                        <span className='font-medium'>{asset.name}</span>
                      </div>
                      <div className='text-right'>
                        <div className='font-medium'>{asset.value}%</div>
                        <div className='text-sm text-neutral-600'>
                          {formatCurrency(asset.amount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value='insights' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>
                  AI-powered insights about your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <TrendingUp className='h-4 w-4 text-green-600' />
                    <span className='font-medium text-green-800'>
                      Strong Performance
                    </span>
                  </div>
                  <p className='text-sm text-green-700'>
                    Your portfolio is outperforming the benchmark by 7.9% this
                    month.
                  </p>
                </div>

                <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Activity className='h-4 w-4 text-blue-600' />
                    <span className='font-medium text-blue-800'>
                      High Activity
                    </span>
                  </div>
                  <p className='text-sm text-blue-700'>
                    Transaction volume increased by 18.9% compared to last
                    month.
                  </p>
                </div>

                <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Users className='h-4 w-4 text-orange-600' />
                    <span className='font-medium text-orange-800'>
                      Diversification
                    </span>
                  </div>
                  <p className='text-sm text-orange-700'>
                    Consider rebalancing - Bitcoin allocation is above
                    recommended 40%.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>
                  Portfolio risk assessment and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div>
                    <div className='mb-1 flex justify-between text-sm'>
                      <span>Risk Score</span>
                      <span className='font-medium'>7.2/10</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-neutral-200'>
                      <div
                        className='h-2 rounded-full bg-orange-500'
                        style={{ width: '72%' }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className='mb-1 flex justify-between text-sm'>
                      <span>Volatility</span>
                      <span className='font-medium'>Medium-High</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-neutral-200'>
                      <div
                        className='h-2 rounded-full bg-yellow-500'
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className='mb-1 flex justify-between text-sm'>
                      <span>Diversification</span>
                      <span className='font-medium'>Good</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-neutral-200'>
                      <div
                        className='h-2 rounded-full bg-green-500'
                        style={{ width: '78%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className='border-t pt-4'>
                  <h4 className='mb-2 font-medium'>Recommendations</h4>
                  <ul className='space-y-1 text-sm text-neutral-600'>
                    <li>• Consider reducing Bitcoin exposure to 35-40%</li>
                    <li>• Increase stablecoin allocation for stability</li>
                    <li>
                      • Monitor Solana position for profit-taking opportunities
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
