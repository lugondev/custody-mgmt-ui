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
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Bot,
  TrendingUp,
  Target,
  Zap,
  Brain,
  Shield,
  AlertTriangle,
  Send,
  Sparkles,
  Settings,
  MessageSquare,
  Lightbulb,
  Activity,
  DollarSign,
  TrendingDown,
} from 'lucide-react'
import { PortfolioOverview, MarketNewsAnalysis, AIRebalancing } from '@/components/ai'
import { mockPortfolio, mockMarketNews, mockAIAnalysis } from '@/lib/mock-portfolio-data'

interface AIInsight {
  id: string
  type: 'opportunity' | 'risk' | 'optimization' | 'alert'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  category: string
  actionable: boolean
  timestamp: string
}

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: string
}

/**
 * AI-Powered Portfolio Management Page
 * Provides AI-driven insights, recommendations, and portfolio optimization
 */
export default function PortfoxAIPage() {
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m Portfox AI, your intelligent portfolio assistant. I\'ve analyzed your current portfolio and market conditions. How can I help you optimize your investments today?',
      timestamp: new Date().toISOString(),
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Portfolio and AI data
  const portfolio = mockPortfolio
  const marketNews = mockMarketNews
  const aiAnalysis = mockAIAnalysis

  // Mock AI insights data
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'DeFi Yield Opportunity Detected',
      description: 'Current market conditions suggest a 12.5% APY opportunity in ETH staking with minimal risk exposure.',
      confidence: 87,
      impact: 'high',
      category: 'Yield Farming',
      actionable: true,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'risk',
      title: 'Portfolio Concentration Risk',
      description: 'Your Bitcoin allocation (65%) exceeds recommended diversification limits. Consider rebalancing.',
      confidence: 92,
      impact: 'medium',
      category: 'Risk Management',
      actionable: true,
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      type: 'optimization',
      title: 'Gas Fee Optimization',
      description: 'Scheduling transactions during low-traffic periods could save up to 40% on gas fees.',
      confidence: 78,
      impact: 'medium',
      category: 'Cost Optimization',
      actionable: true,
      timestamp: new Date().toISOString(),
    },
    {
      id: '4',
      type: 'alert',
      title: 'Market Volatility Alert',
      description: 'Unusual trading volume detected in SOL. Consider position monitoring.',
      confidence: 85,
      impact: 'high',
      category: 'Market Analysis',
      actionable: false,
      timestamp: new Date().toISOString(),
    },
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className='h-5 w-5 text-green-600' />
      case 'risk':
        return <AlertTriangle className='h-5 w-5 text-red-600' />
      case 'optimization':
        return <Zap className='h-5 w-5 text-blue-600' />
      case 'alert':
        return <Activity className='h-5 w-5 text-orange-600' />
      default:
        return <Brain className='h-5 w-5 text-gray-600' />
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    }

    setChatMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsAnalyzing(true)

    // Simulate AI response with portfolio context
    setTimeout(() => {
      let aiResponseContent = ''
      
      if (newMessage.toLowerCase().includes('bitcoin') || newMessage.toLowerCase().includes('btc')) {
        aiResponseContent = `Based on your current Bitcoin allocation of 62.9% (${(portfolio.totalValue * 0.629).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}), I recommend reducing this to 45-50% to minimize concentration risk. Recent institutional adoption is positive, but taking some profits at current levels would be prudent.`
      } else if (newMessage.toLowerCase().includes('rebalance')) {
        aiResponseContent = `I've analyzed your portfolio and recommend these key changes: 1) Reduce BTC from 62.9% to 48%, 2) Increase ETH from 18% to 28%, 3) Maintain SOL at current levels, 4) Slightly increase BNB allocation. This would improve your risk-adjusted returns by an estimated 8-12%.`
      } else {
        aiResponseContent = `Based on your portfolio analysis, I recommend considering a 15% reallocation from BTC to ETH to improve diversification. Current market sentiment is bullish for both assets, but ETH shows stronger fundamentals post-merge. Your portfolio value of ${portfolio.totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} has good growth potential with better allocation.`
      }
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date().toISOString(),
      }
      setChatMessages(prev => [...prev, aiResponse])
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleRefreshPortfolio = () => {
    // Simulate refresh - in real app would fetch new data
    console.log('Refreshing portfolio data...')
  }

  const handleExecuteRebalance = (recommendations: any[]) => {
    console.log('Executing rebalancing recommendations:', recommendations)
    // Here you would integrate with actual trading API
  }

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='space-y-6 px-4'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 flex items-center'>
            <Bot className='mr-3 h-7 w-7 text-blue-600' />
            Portfox AI
          </h1>
          <p className='mt-1 text-gray-600'>
            AI-powered portfolio insights and optimization recommendations
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <Badge variant='outline' className='border-blue-200 bg-blue-50 text-blue-700'>
            <Sparkles className='mr-1 h-3 w-3' />
            AI Active
          </Badge>
            <Button 
            className='bg-blue-600 hover:bg-blue-700'
            onClick={() => window.location.href = '/dashboard/portfox-ai/settings'}
            >
            <Settings className='mr-2 h-4 w-4' />
            AI Settings
            </Button>
        </div>
      </div>

      {/* AI Performance Summary */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-blue-700'>
              Portfolio Value
            </CardTitle>
            <DollarSign className='h-4 w-4 text-blue-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-900'>
              {portfolio.totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
            </div>
            <p className='text-xs text-blue-600 flex items-center'>
              {portfolio.totalChangePercent24h >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {portfolio.totalChangePercent24h >= 0 ? '+' : ''}{portfolio.totalChangePercent24h.toFixed(2)}% today
            </p>
          </CardContent>
        </Card>

        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-green-50 to-green-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-green-700'>
              AI Confidence
            </CardTitle>
            <Brain className='h-4 w-4 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-900'>
              {Math.round(aiAnalysis.analysis.rebalancingRecommendations.reduce((acc, rec) => acc + rec.confidence, 0) / aiAnalysis.analysis.rebalancingRecommendations.length)}%
            </div>
            <p className='text-xs text-green-600'>High confidence insights</p>
          </CardContent>
        </Card>

        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-purple-700'>
              Risk Score
            </CardTitle>
            <Shield className='h-4 w-4 text-purple-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-purple-900'>{portfolio.riskScore}/10</div>
            <p className='text-xs text-purple-600'>
              {portfolio.riskScore <= 3.5 ? 'Conservative' : 
               portfolio.riskScore <= 7 ? 'Moderate' : 'Aggressive'} risk level
            </p>
          </CardContent>
        </Card>

        <Card className='border border-gray-200 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-orange-700'>
              Market Sentiment
            </CardTitle>
            <Target className='h-4 w-4 text-orange-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-900 capitalize'>
              {aiAnalysis.analysis.marketSentiment.overall}
            </div>
            <p className='text-xs text-orange-600'>{marketNews.length} news analyzed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue='portfolio' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='portfolio'>Portfolio</TabsTrigger>
          <TabsTrigger value='insights'>AI Insights</TabsTrigger>
          <TabsTrigger value='rebalancing'>Rebalancing</TabsTrigger>
          <TabsTrigger value='news'>Market News</TabsTrigger>
          <TabsTrigger value='chat'>AI Assistant</TabsTrigger>
        </TabsList>

        {/* Portfolio Overview Tab */}
        <TabsContent value='portfolio' className='space-y-6'>
          <PortfolioOverview
            portfolio={portfolio}
            onRebalance={() => {
              const rebalanceTab = document.querySelector('[value="rebalancing"]') as HTMLElement
              rebalanceTab?.click()
            }}
            onRefresh={handleRefreshPortfolio}
          />
        </TabsContent>

        {/* Rebalancing Tab */}
        <TabsContent value='rebalancing' className='space-y-6'>
          <AIRebalancing
            aiAnalysis={aiAnalysis}
            portfolio={portfolio}
            onExecuteRebalance={handleExecuteRebalance}
          />
        </TabsContent>

        {/* Market News Tab */}
        <TabsContent value='news' className='space-y-6'>
          <MarketNewsAnalysis
            news={marketNews}
            aiAnalysis={aiAnalysis}
            onNewsClick={handleNewsClick}
          />
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value='insights' className='space-y-6'>
          <Card className='border border-gray-200 rounded-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center text-lg font-semibold text-gray-900'>
                <Lightbulb className='mr-2 h-5 w-5 text-blue-600' />
                AI-Generated Insights
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Real-time analysis of your portfolio with actionable insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {aiInsights.map(insight => (
                  <div
                    key={insight.id}
                    className='flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer transition-colors'
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <div className='flex-shrink-0 mt-1'>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className='text-sm font-medium text-gray-900'>
                          {insight.title}
                        </h4>
                        <div className='flex items-center space-x-2'>
                          <Badge
                            variant={insight.impact === 'high' ? 'default' : 'outline'}
                            className={
                              insight.impact === 'high'
                                ? 'bg-red-100 text-red-700 border-red-200'
                                : insight.impact === 'medium'
                                ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                : 'bg-green-100 text-green-700 border-green-200'
                            }
                          >
                            {insight.impact} impact
                          </Badge>
                          <div className='text-xs text-gray-500'>
                            {insight.confidence}% confidence
                          </div>
                        </div>
                      </div>
                      <p className='text-sm text-gray-600 mb-2'>
                        {insight.description}
                      </p>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs text-gray-500'>
                          {insight.category}
                        </span>
                        {insight.actionable && (
                          <Button size='sm' variant='outline' className='text-xs'>
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Chat Assistant Tab */}
        <TabsContent value='chat' className='space-y-6'>
          <Card className='border border-gray-200 rounded-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center text-lg font-semibold text-gray-900'>
                <MessageSquare className='mr-2 h-5 w-5 text-blue-600' />
                AI Assistant Chat
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Ask questions about your portfolio, market trends, or investment strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col h-96'>
                {/* Chat Messages */}
                <div className='flex-1 overflow-y-auto space-y-4 mb-4'>
                  {chatMessages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className='text-sm'>{message.content}</p>
                        <p className='text-xs mt-1 opacity-70'>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isAnalyzing && (
                    <div className='flex justify-start'>
                      <div className='bg-gray-100 text-gray-900 px-4 py-2 rounded-lg'>
                        <div className='flex items-center space-x-2'>
                          <div className='animate-pulse flex space-x-1'>
                            <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
                            <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
                            <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
                          </div>
                          <span className='text-sm'>AI is analyzing your portfolio...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className='flex items-center space-x-2'>
                  <Textarea
                    placeholder='Ask me about your portfolio, market trends, or investment strategies...'
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className='flex-1 min-h-0 border-gray-200 rounded-xl'
                    rows={2}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isAnalyzing}
                    className='bg-blue-600 hover:bg-blue-700'
                  >
                    <Send className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insight Detail Dialog */}
      {selectedInsight && (
        <Dialog
          open={!!selectedInsight}
          onOpenChange={() => setSelectedInsight(null)}
        >
          <DialogContent className='sm:max-w-[600px] border border-gray-200 rounded-2xl'>
            <DialogHeader>
              <DialogTitle className='flex items-center text-lg font-semibold text-gray-900'>
                {getInsightIcon(selectedInsight.type)}
                <span className='ml-2'>{selectedInsight.title}</span>
              </DialogTitle>
              <DialogDescription className='text-gray-600'>
                Detailed analysis and recommended actions
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              <div>
                <Label className='text-sm font-medium text-gray-700'>Description</Label>
                <p className='mt-1 text-sm text-gray-900'>{selectedInsight.description}</p>
              </div>
              
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-sm font-medium text-gray-700'>Confidence Level</Label>
                  <div className='mt-1'>
                    <Progress value={selectedInsight.confidence} className='h-2' />
                    <span className='text-sm text-gray-600 mt-1'>
                      {selectedInsight.confidence}%
                    </span>
                  </div>
                </div>
                <div>
                  <Label className='text-sm font-medium text-gray-700'>Impact Level</Label>
                  <Badge
                    className={
                      selectedInsight.impact === 'high'
                        ? 'bg-red-100 text-red-700 border-red-200'
                        : selectedInsight.impact === 'medium'
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        : 'bg-green-100 text-green-700 border-green-200'
                    }
                  >
                    {selectedInsight.impact} impact
                  </Badge>
                </div>
              </div>

              <div>
                <Label className='text-sm font-medium text-gray-700'>Category</Label>
                <p className='mt-1 text-sm text-gray-900'>{selectedInsight.category}</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setSelectedInsight(null)}
                className='border-gray-200 text-gray-700 hover:bg-gray-50'
              >
                Close
              </Button>
              {selectedInsight.actionable && (
                <Button className='bg-blue-600 hover:bg-blue-700'>
                  Take Action
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
