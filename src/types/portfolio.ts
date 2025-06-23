export interface Asset {
  symbol: string
  name: string
  currentPrice: number
  priceChange24h: number
  priceChangePercent24h: number
  amount: number
  value: number
  allocation: number
  icon?: string
}

export interface Portfolio {
  id: string
  name: string
  totalValue: number
  totalChange24h: number
  totalChangePercent24h: number
  assets: Asset[]
  lastUpdated: string
  riskScore: number
  diversificationScore: number
}

export interface MarketNews {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  sentiment: 'positive' | 'negative' | 'neutral'
  relevantAssets: string[]
  impact: 'high' | 'medium' | 'low'
  url: string
}

export interface AIAnalysis {
  id: string
  portfolioId: string
  analysis: {
    riskAssessment: {
      score: number
      level: 'conservative' | 'moderate' | 'aggressive'
      factors: string[]
    }
    diversification: {
      score: number
      overweightedAssets: string[]
      underweightedAssets: string[]
      suggestions: string[]
    }
    marketSentiment: {
      overall: 'bullish' | 'bearish' | 'neutral'
      assetSentiments: Record<string, 'bullish' | 'bearish' | 'neutral'>
    }
    rebalancingRecommendations: {
      action: 'buy' | 'sell' | 'hold'
      asset: string
      currentAllocation: number
      recommendedAllocation: number
      reason: string
      confidence: number
      timeframe: string
    }[]
  }
  newsImpact: {
    newsId: string
    impactedAssets: string[]
    recommendation: string
    urgency: 'low' | 'medium' | 'high'
  }[]
  generatedAt: string
}

export interface AutoRebalanceSettings {
  enabled: boolean
  threshold: number // percentage deviation that triggers rebalancing
  targetAllocations: Record<string, number>
  rebalanceFrequency: 'daily' | 'weekly' | 'monthly'
  excludeAssets: string[]
  maxSingleTradeSize: number
}
