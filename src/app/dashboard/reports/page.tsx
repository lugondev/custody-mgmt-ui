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
import { Label } from '@/components/ui/label'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts'
import {
  FileText,
  Download,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  FileBarChart,
} from 'lucide-react'
import {
  MOCK_REPORTS,
  MOCK_ANALYTICS,
  MOCK_TRANSACTIONS,
  MOCK_WALLETS,
} from '@/lib/mock-data'

/**
 * Reports and analytics page component
 * Displays various reports, charts, and data insights
 */
export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedReport, setSelectedReport] = useState('overview')
  const [isGenerating, setIsGenerating] = useState(false)

  // Chart colors
  const COLORS = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#06b6d4',
  ]

  // Sample data for charts
  const transactionVolumeData = [
    { date: '2024-01-01', volume: 125000, count: 45 },
    { date: '2024-01-02', volume: 98000, count: 38 },
    { date: '2024-01-03', volume: 156000, count: 52 },
    { date: '2024-01-04', volume: 134000, count: 41 },
    { date: '2024-01-05', volume: 187000, count: 67 },
    { date: '2024-01-06', volume: 145000, count: 49 },
    { date: '2024-01-07', volume: 167000, count: 58 },
  ]

  const assetDistributionData = MOCK_ANALYTICS.portfolio.breakdown.map(
    (asset, index) => ({
      ...asset,
      color: COLORS[index % COLORS.length],
    })
  )

  const complianceData = [
    { category: 'KYC Compliance', completed: 95, total: 100 },
    { category: 'AML Checks', completed: 88, total: 92 },
    { category: 'Transaction Monitoring', completed: 100, total: 100 },
    { category: 'Risk Assessment', completed: 76, total: 80 },
  ]

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  const handleDownloadReport = (reportId: string) => {
    // Simulate download
    console.log(`Downloading report: ${reportId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }



  return (
    <div className='space-y-6 px-4'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-900'>Reports & Analytics</h1>
          <p className='mt-1 text-neutral-600'>
            Comprehensive insights and reporting for your custody operations
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7d'>Last 7 days</SelectItem>
              <SelectItem value='30d'>Last 30 days</SelectItem>
              <SelectItem value='90d'>Last 90 days</SelectItem>
              <SelectItem value='1y'>Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? (
              <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <FileText className='mr-2 h-4 w-4' />
            )}
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                  Total Volume
                </p>
                <p className='text-2xl font-bold text-blue-900 dark:text-blue-100'>
                  ${MOCK_ANALYTICS.portfolio.totalValue.toLocaleString()}
                </p>
                <div className='mt-1 flex items-center'>
                  <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-600'>
                    +{MOCK_ANALYTICS.portfolio.change24h}%
                  </span>
                </div>
              </div>
              <DollarSign className='h-8 w-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-green-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-green-600 dark:text-green-400'>
                  Active Wallets
                </p>
                <p className='text-2xl font-bold text-green-900 dark:text-green-100'>
                  {MOCK_WALLETS.filter(w => w.status === 'active').length}
                </p>
                <div className='mt-1 flex items-center'>
                  <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-600'>+2 this week</span>
                </div>
              </div>
              <Activity className='h-8 w-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-orange-600 dark:text-orange-400'>
                  Transactions
                </p>
                <p className='text-2xl font-bold text-orange-900 dark:text-orange-100'>
                  {MOCK_TRANSACTIONS.length}
                </p>
                <div className='mt-1 flex items-center'>
                  <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-600'>
                    +15% vs last month
                  </span>
                </div>
              </div>
              <BarChart3 className='h-8 w-8 text-orange-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-purple-600 dark:text-purple-400'>
                  Compliance Score
                </p>
                <p className='text-2xl font-bold text-purple-900 dark:text-purple-100'>
                  94.5%
                </p>
                <div className='mt-1 flex items-center'>
                  <CheckCircle className='mr-1 h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-600'>Excellent</span>
                </div>
              </div>
              <Shield className='h-8 w-8 text-purple-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedReport}
        onValueChange={setSelectedReport}
        className='space-y-6'
      >
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='transactions'>Transactions</TabsTrigger>
          <TabsTrigger value='compliance'>Compliance</TabsTrigger>
          <TabsTrigger value='performance'>Performance</TabsTrigger>
          <TabsTrigger value='custom'>Custom Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value='overview' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Transaction Volume Chart */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <LineChartIcon className='mr-2 h-5 w-5 text-blue-600' />
                  Transaction Volume Trend
                </CardTitle>
                <CardDescription>
                  Daily transaction volume over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <AreaChart data={transactionVolumeData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='date'
                      tickFormatter={value =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                    <YAxis
                      tickFormatter={value => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        'Volume',
                      ]}
                      labelFormatter={value =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                    <Area
                      type='monotone'
                      dataKey='volume'
                      stroke='#3b82f6'
                      fill='#3b82f6'
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Asset Distribution */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <PieChartIcon className='mr-2 h-5 w-5 text-green-600' />
                  Asset Distribution
                </CardTitle>
                <CardDescription>
                  Portfolio allocation by cryptocurrency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Pie
                      data={assetDistributionData}
                      cx='50%'
                      cy='50%'
                      outerRadius={80}
                      dataKey='value'
                      label={({ currency, percentage }) =>
                        `${currency} ${percentage}%`
                      }
                    >
                      {assetDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        'Value',
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Activity className='mr-2 h-5 w-5 text-orange-600' />
                Recent Activity Summary
              </CardTitle>
              <CardDescription>
                Latest system activities and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {MOCK_ANALYTICS.recentActivity
                  .slice(0, 5)
                  .map((activity, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                        <div>
                          <p className='text-sm font-medium'>
                            {activity.type}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {activity.user?.name || 'Unknown User'}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm'>
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </p>
                        <p className='text-xs text-slate-500'>
                          {new Date(activity.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value='transactions' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {/* Transaction Status Distribution */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='text-lg'>Transaction Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {[
                    {
                      status: 'Completed',
                      count: MOCK_TRANSACTIONS.filter(
                        t => t.status === 'completed'
                      ).length,
                      color: 'bg-green-500',
                    },
                    {
                      status: 'Pending',
                      count: MOCK_TRANSACTIONS.filter(
                        t => t.status === 'pending'
                      ).length,
                      color: 'bg-yellow-500',
                    },
                    {
                      status: 'Failed',
                      count: MOCK_TRANSACTIONS.filter(
                        t => t.status === 'failed'
                      ).length,
                      color: 'bg-red-500',
                    },
                  ].map(item => (
                    <div
                      key={item.status}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center space-x-2'>
                        <div
                          className={`h-3 w-3 rounded-full ${item.color}`}
                        ></div>
                        <span className='text-sm'>{item.status}</span>
                      </div>
                      <span className='font-medium'>{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transaction Types */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='text-lg'>Transaction Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {[
                    {
                      type: 'Outgoing',
                      count: MOCK_TRANSACTIONS.filter(
                        t => t.type === 'send'
                      ).length,
                      color: 'bg-blue-500',
                    },
                    {
                      type: 'Incoming',
                      count: MOCK_TRANSACTIONS.filter(
                        t => t.type === 'receive'
                      ).length,
                      color: 'bg-green-500',
                    },
                    {
                      type: 'Internal',
                      count: MOCK_TRANSACTIONS.filter(
                        t => t.type === 'send'
                      ).length,
                      color: 'bg-purple-500',
                    },
                  ].map(item => (
                    <div
                      key={item.type}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center space-x-2'>
                        <div
                          className={`h-3 w-3 rounded-full ${item.color}`}
                        ></div>
                        <span className='text-sm'>{item.type}</span>
                      </div>
                      <span className='font-medium'>{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Average Transaction Value */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='text-lg'>Average Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Avg Transaction</span>
                    <span className='font-medium'>
                      $
                      {(
                        MOCK_TRANSACTIONS.reduce(
                          (sum, t) => sum + t.usdValue,
                          0
                        ) / MOCK_TRANSACTIONS.length
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Largest Transaction</span>
                    <span className='font-medium'>
                      $
                      {Math.max(
                        ...MOCK_TRANSACTIONS.map(t => t.usdValue)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Total Fees</span>
                    <span className='font-medium'>
                      $
                      {MOCK_TRANSACTIONS.reduce(
                        (sum, t) => sum + (t.feeUsd || 0),
                        0
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Volume Chart */}
          <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <BarChart3 className='mr-2 h-5 w-5 text-blue-600' />
                Daily Transaction Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={400}>
                <BarChart data={transactionVolumeData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='date'
                    tickFormatter={value =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                  <YAxis
                    tickFormatter={value => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === 'volume'
                        ? `$${value.toLocaleString()}`
                        : value,
                      name === 'volume' ? 'Volume' : 'Count',
                    ]}
                    labelFormatter={value =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                  <Bar dataKey='volume' fill='#3b82f6' />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value='compliance' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Compliance Metrics */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Shield className='mr-2 h-5 w-5 text-green-600' />
                  Compliance Metrics
                </CardTitle>
                <CardDescription>
                  Current compliance status across all categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {complianceData.map((item, index) => (
                    <div key={index} className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>
                          {item.category}
                        </span>
                        <span className='text-sm text-slate-500'>
                          {item.completed}/{item.total}
                        </span>
                      </div>
                      <Progress
                        value={(item.completed / item.total) * 100}
                        className='h-2'
                      />
                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-slate-500'>
                          {((item.completed / item.total) * 100).toFixed(1)}%
                          Complete
                        </span>
                        {item.completed === item.total ? (
                          <CheckCircle className='h-3 w-3 text-green-500' />
                        ) : (
                          <AlertTriangle className='h-3 w-3 text-yellow-500' />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <AlertTriangle className='mr-2 h-5 w-5 text-orange-600' />
                  Risk Assessment
                </CardTitle>
                <CardDescription>
                  Current risk levels and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950'>
                    <div className='flex items-center space-x-2'>
                      <CheckCircle className='h-4 w-4 text-green-600' />
                      <span className='text-sm font-medium'>Low Risk</span>
                    </div>
                    <Badge className='bg-green-100 text-green-800'>85%</Badge>
                  </div>
                  <div className='flex items-center justify-between rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950'>
                    <div className='flex items-center space-x-2'>
                      <AlertTriangle className='h-4 w-4 text-yellow-600' />
                      <span className='text-sm font-medium'>Medium Risk</span>
                    </div>
                    <Badge className='bg-yellow-100 text-yellow-800'>12%</Badge>
                  </div>
                  <div className='flex items-center justify-between rounded-lg bg-red-50 p-3 dark:bg-red-950'>
                    <div className='flex items-center space-x-2'>
                      <AlertTriangle className='h-4 w-4 text-red-600' />
                      <span className='text-sm font-medium'>High Risk</span>
                    </div>
                    <Badge className='bg-red-100 text-red-800'>3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Reports */}
          <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <FileBarChart className='mr-2 h-5 w-5 text-purple-600' />
                Compliance Reports
              </CardTitle>
              <CardDescription>
                Generated compliance and audit reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_REPORTS.filter(
                    report => report.type === 'compliance'
                  ).map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <p className='font-medium'>{report.name}</p>
                        <p className='text-xs text-slate-500'>
                          {report.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>{report.type}</Badge>
                      </TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className='text-sm'>
                            {new Date(report.generatedAt).toLocaleDateString()}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {new Date(report.generatedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end space-x-2'>
                          <Button variant='outline' size='sm'>
                            <Eye className='h-3 w-3' />
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            <Download className='h-3 w-3' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value='performance' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {/* System Performance */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='text-lg'>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <div className='mb-1 flex items-center justify-between'>
                      <span className='text-sm'>CPU Usage</span>
                      <span className='text-sm font-medium'>23%</span>
                    </div>
                    <Progress value={23} className='h-2' />
                  </div>
                  <div>
                    <div className='mb-1 flex items-center justify-between'>
                      <span className='text-sm'>Memory Usage</span>
                      <span className='text-sm font-medium'>67%</span>
                    </div>
                    <Progress value={67} className='h-2' />
                  </div>
                  <div>
                    <div className='mb-1 flex items-center justify-between'>
                      <span className='text-sm'>Storage Usage</span>
                      <span className='text-sm font-medium'>45%</span>
                    </div>
                    <Progress value={45} className='h-2' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Performance */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='text-lg'>API Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Response Time</span>
                    <span className='font-medium'>145ms</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Success Rate</span>
                    <span className='font-medium'>99.8%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Requests/min</span>
                    <span className='font-medium'>1,247</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Error Rate</span>
                    <span className='font-medium'>0.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Performance */}
            <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
              <CardHeader>
                <CardTitle className='text-lg'>
                  Transaction Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Avg Processing Time</span>
                    <span className='font-medium'>2.3s</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Success Rate</span>
                    <span className='font-medium'>98.5%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Throughput</span>
                    <span className='font-medium'>450 TPS</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Queue Length</span>
                    <span className='font-medium'>12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Custom Reports Tab */}
        <TabsContent value='custom' className='space-y-6'>
          <Card className='bg-white/50 backdrop-blur-sm dark:bg-slate-900/50'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <FileText className='mr-2 h-5 w-5 text-blue-600' />
                Custom Reports
              </CardTitle>
              <CardDescription>
                Create and manage custom reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {/* Report Builder */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div>
                    <Label htmlFor='report-type'>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='transaction'>
                          Transaction Report
                        </SelectItem>
                        <SelectItem value='wallet'>Wallet Report</SelectItem>
                        <SelectItem value='user'>
                          User Activity Report
                        </SelectItem>
                        <SelectItem value='compliance'>
                          Compliance Report
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='date-range'>Date Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select range' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='7d'>Last 7 days</SelectItem>
                        <SelectItem value='30d'>Last 30 days</SelectItem>
                        <SelectItem value='90d'>Last 90 days</SelectItem>
                        <SelectItem value='custom'>Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='format'>Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select format' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='pdf'>PDF</SelectItem>
                        <SelectItem value='csv'>CSV</SelectItem>
                        <SelectItem value='xlsx'>Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className='w-full' onClick={handleGenerateReport}>
                  <FileText className='mr-2 h-4 w-4' />
                  Generate Custom Report
                </Button>
              </div>

              {/* Saved Reports */}
              <div className='mt-8'>
                <h3 className='mb-4 text-lg font-semibold'>Saved Reports</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_REPORTS.slice(0, 5).map(report => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <p className='font-medium'>{report.name}</p>
                          <p className='text-xs text-slate-500'>
                            {report.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{report.type}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell className='text-right'>
                          <div className='flex items-center justify-end space-x-2'>
                            <Button variant='outline' size='sm'>
                              <Eye className='h-3 w-3' />
                            </Button>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <Download className='h-3 w-3' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
