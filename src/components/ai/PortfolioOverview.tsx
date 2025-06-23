import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  RefreshCw
} from 'lucide-react'
import { Portfolio, Asset } from '@/types/portfolio'

interface PortfolioOverviewProps {
  portfolio: Portfolio
  onRebalance: () => void
  onRefresh: () => void
}

export function PortfolioOverview({ portfolio, onRebalance, onRefresh }: PortfolioOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`
  }

  const getAssetIcon = (asset: Asset) => {
    return asset.icon ? `/crypto-icons/${asset.icon}` : '/placeholder-avatar.jpg'
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Total Portfolio Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className="flex items-center text-xs">
              {portfolio.totalChangePercent24h >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
              )}
              <span className={portfolio.totalChangePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatPercent(portfolio.totalChangePercent24h)} ({formatCurrency(portfolio.totalChange24h)})
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Risk Score
            </CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {portfolio.riskScore}/10
            </div>
            <p className="text-xs text-purple-600">
              {portfolio.riskScore <= 3.5 ? 'Conservative' : 
               portfolio.riskScore <= 7 ? 'Moderate' : 'Aggressive'}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Diversification
            </CardTitle>
            <PieChart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {portfolio.diversificationScore}/10
            </div>
            <p className="text-xs text-green-600">
              {portfolio.diversificationScore >= 8 ? 'Excellent' :
               portfolio.diversificationScore >= 6 ? 'Good' : 'Needs improvement'}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">
              Total Assets
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {portfolio.assets.length}
            </div>
            <p className="text-xs text-orange-600">Active positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Asset Allocation
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Current portfolio distribution
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="border-gray-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={onRebalance}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              AI Rebalance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolio.assets.map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={getAssetIcon(asset)}
                      alt={asset.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {asset.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {asset.symbol}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {asset.amount.toFixed(4)} {asset.symbol}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(asset.value)}
                    </p>
                    <div className="flex items-center">
                      {asset.priceChangePercent24h >= 0 ? (
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs ${asset.priceChangePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercent(asset.priceChangePercent24h)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <p className="text-sm font-medium text-gray-900">
                      {asset.allocation.toFixed(1)}%
                    </p>
                    <div className="w-16 mt-1">
                      <Progress 
                        value={asset.allocation} 
                        className="h-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
