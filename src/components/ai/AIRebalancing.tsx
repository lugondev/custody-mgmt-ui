import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  PieChart,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Zap,
  BarChart3,
  Shield
} from 'lucide-react'
import { AIAnalysis, Portfolio } from '@/types/portfolio'

interface AIRebalancingProps {
  aiAnalysis: AIAnalysis
  portfolio: Portfolio
  onExecuteRebalance: (recommendations: any[]) => void
}

export function AIRebalancing({ aiAnalysis, portfolio, onExecuteRebalance }: AIRebalancingProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null)
  const [showExecuteDialog, setShowExecuteDialog] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'buy':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />
      case 'sell':
        return <ArrowDownRight className="h-4 w-4 text-red-600" />
      case 'hold':
        return <Eye className="h-4 w-4 text-blue-600" />
      default:
        return <PieChart className="h-4 w-4 text-purple-600" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'buy':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'sell':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'hold':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-purple-100 text-purple-700 border-purple-200'
    }
  }

  const calculateTradeAmount = (recommendation: any) => {
    const currentValue = portfolio.totalValue * (recommendation.currentAllocation / 100)
    const targetValue = portfolio.totalValue * (recommendation.recommendedAllocation / 100)
    return targetValue - currentValue
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'conservative':
        return 'text-green-600'
      case 'moderate':
        return 'text-yellow-600'
      case 'aggressive':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const handleExecuteAll = () => {
    onExecuteRebalance(aiAnalysis.analysis.rebalancingRecommendations)
    setShowExecuteDialog(false)
  }

  return (
    <div className="space-y-6">
      {/* Risk & Diversification Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
              <Shield className="mr-2 h-5 w-5 text-blue-600" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Risk Level</span>
                <Badge className={`${getRiskLevelColor(aiAnalysis.analysis.riskAssessment.level)} bg-opacity-10`}>
                  {aiAnalysis.analysis.riskAssessment.level}
                </Badge>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Risk Score</span>
                  <span className="font-medium">{aiAnalysis.analysis.riskAssessment.score}/10</span>
                </div>
                <Progress value={aiAnalysis.analysis.riskAssessment.score * 10} className="h-2" />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Risk Factors</h4>
                <ul className="space-y-1">
                  {aiAnalysis.analysis.riskAssessment.factors.map((factor, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
              Diversification Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Diversification Score</span>
                  <span className="font-medium">{aiAnalysis.analysis.diversification.score}/10</span>
                </div>
                <Progress value={aiAnalysis.analysis.diversification.score * 10} className="h-2" />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Issues & Suggestions</h4>
                <div className="space-y-2">
                  {aiAnalysis.analysis.diversification.overweightedAssets.length > 0 && (
                    <div className="text-xs">
                      <span className="text-red-600 font-medium">Overweighted: </span>
                      <span className="text-gray-600">{aiAnalysis.analysis.diversification.overweightedAssets.join(', ')}</span>
                    </div>
                  )}
                  {aiAnalysis.analysis.diversification.underweightedAssets.length > 0 && (
                    <div className="text-xs">
                      <span className="text-blue-600 font-medium">Consider adding: </span>
                      <span className="text-gray-600">{aiAnalysis.analysis.diversification.underweightedAssets.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">AI Suggestions</h4>
                <ul className="space-y-1">
                  {aiAnalysis.analysis.diversification.suggestions.slice(0, 2).map((suggestion, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rebalancing Recommendations */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
              <Target className="mr-2 h-5 w-5 text-blue-600" />
              AI Rebalancing Recommendations
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Optimized portfolio adjustments based on market analysis
            </p>
          </div>
          <Button
            onClick={() => setShowExecuteDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Zap className="mr-2 h-4 w-4" />
            Execute All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAnalysis.analysis.rebalancingRecommendations.map((rec, index) => {
              const tradeAmount = calculateTradeAmount(rec)
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedRecommendation(rec)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getActionIcon(rec.action)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {rec.action.toUpperCase()} {rec.asset}
                        </h4>
                        <Badge variant="outline" className={getActionColor(rec.action)}>
                          {rec.action}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {rec.reason}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Current:</span> {rec.currentAllocation.toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">Target:</span> {rec.recommendedAllocation.toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> {formatCurrency(Math.abs(tradeAmount))}
                        </div>
                        <div>
                          <span className="font-medium">Confidence:</span> {rec.confidence}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {rec.recommendedAllocation.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {rec.timeframe}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Market Sentiment Overview */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Market Sentiment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Overall Market</span>
                <Badge 
                  className={
                    aiAnalysis.analysis.marketSentiment.overall === 'bullish' 
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : aiAnalysis.analysis.marketSentiment.overall === 'bearish'
                      ? 'bg-red-100 text-red-700 border-red-200'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }
                >
                  {aiAnalysis.analysis.marketSentiment.overall}
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Asset Sentiments</h4>
              <div className="space-y-2">
                {Object.entries(aiAnalysis.analysis.marketSentiment.assetSentiments).map(([asset, sentiment]) => (
                  <div key={asset} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{asset}</span>
                    <Badge 
                      variant="outline"
                      className={
                        sentiment === 'bullish' 
                          ? 'border-green-200 text-green-700'
                          : sentiment === 'bearish'
                          ? 'border-red-200 text-red-700'
                          : 'border-gray-200 text-gray-700'
                      }
                    >
                      {sentiment}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Execute Dialog */}
      <Dialog open={showExecuteDialog} onOpenChange={setShowExecuteDialog}>
        <DialogContent className="sm:max-w-[600px] border border-gray-200 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg font-semibold text-gray-900">
              <Calculator className="mr-2 h-5 w-5 text-blue-600" />
              Execute AI Rebalancing
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Review and confirm the AI-recommended portfolio rebalancing
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Rebalancing Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Total Recommendations:</span>
                  <span className="font-medium ml-1">{aiAnalysis.analysis.rebalancingRecommendations.length}</span>
                </div>
                <div>
                  <span className="text-blue-700">Average Confidence:</span>
                  <span className="font-medium ml-1">
                    {Math.round(aiAnalysis.analysis.rebalancingRecommendations.reduce((acc, rec) => acc + rec.confidence, 0) / aiAnalysis.analysis.rebalancingRecommendations.length)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {aiAnalysis.analysis.rebalancingRecommendations.map((rec, index) => {
                const tradeAmount = calculateTradeAmount(rec)
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(rec.action)}
                      <span className="text-sm font-medium">{rec.action.toUpperCase()} {rec.asset}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(Math.abs(tradeAmount))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowExecuteDialog(false)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExecuteAll}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              Execute Rebalancing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recommendation Detail Dialog */}
      {selectedRecommendation && (
        <Dialog
          open={!!selectedRecommendation}
          onOpenChange={() => setSelectedRecommendation(null)}
        >
          <DialogContent className="sm:max-w-[600px] border border-gray-200 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center text-lg font-semibold text-gray-900">
                {getActionIcon(selectedRecommendation.action)}
                <span className="ml-2">{selectedRecommendation.action.toUpperCase()} {selectedRecommendation.asset}</span>
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Detailed recommendation analysis and execution plan
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Reasoning</h4>
                <p className="text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {selectedRecommendation.reason}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Allocation</h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedRecommendation.currentAllocation.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Allocation</h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedRecommendation.recommendedAllocation.toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Confidence Level</h4>
                  <Progress value={selectedRecommendation.confidence} className="h-2 mb-1" />
                  <span className="text-sm text-gray-600">{selectedRecommendation.confidence}%</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Timeframe</h4>
                  <div className="text-sm text-gray-900">
                    {selectedRecommendation.timeframe}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Trade Amount</h4>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(Math.abs(calculateTradeAmount(selectedRecommendation)))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedRecommendation(null)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Execute This Trade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
