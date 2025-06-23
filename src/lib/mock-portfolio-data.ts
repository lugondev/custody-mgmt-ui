import { Portfolio, MarketNews, AIAnalysis } from '@/types/portfolio'

// Mock portfolio data
export const mockPortfolio: Portfolio = {
  id: 'portfolio-1',
  name: 'Main Portfolio',
  totalValue: 125000,
  totalChange24h: 2500,
  totalChangePercent24h: 2.04,
  lastUpdated: new Date().toISOString(),
  riskScore: 6.8,
  diversificationScore: 7.2,
  assets: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 42500,
      priceChange24h: 850,
      priceChangePercent24h: 2.04,
      amount: 1.85,
      value: 78625,
      allocation: 62.9,
      icon: 'btc-icon.svg'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 2650,
      priceChange24h: 120,
      priceChangePercent24h: 4.74,
      amount: 8.5,
      value: 22525,
      allocation: 18.0,
      icon: 'eth-icon.svg'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      currentPrice: 95,
      priceChange24h: -2.5,
      priceChangePercent24h: -2.56,
      amount: 120,
      value: 11400,
      allocation: 9.1,
      icon: 'sol-icon.svg'
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      currentPrice: 310,
      priceChange24h: 15,
      priceChangePercent24h: 5.08,
      amount: 40,
      value: 12400,
      allocation: 9.9,
      icon: 'bnb-icon.svg'
    }
  ]
}

// Mock market news data
export const mockMarketNews: MarketNews[] = [
  {
    id: 'news-1',
    title: 'Bitcoin ETF Approval Drives Institutional Adoption',
    summary: 'Major financial institutions are increasing Bitcoin allocations following recent ETF approvals, signaling stronger institutional confidence.',
    source: 'CryptoNews',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    sentiment: 'positive',
    relevantAssets: ['BTC'],
    impact: 'high',
    url: '#'
  },
  {
    id: 'news-2',
    title: 'Ethereum Merge Creates Deflationary Pressure',
    summary: 'Post-merge Ethereum shows deflationary characteristics with reduced supply issuance, potentially supporting long-term price appreciation.',
    source: 'DeFi Daily',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    sentiment: 'positive',
    relevantAssets: ['ETH'],
    impact: 'medium',
    url: '#'
  },
  {
    id: 'news-3',
    title: 'Solana Network Congestion Raises Concerns',
    summary: 'Recent network congestion on Solana during high-traffic periods has raised questions about scalability solutions.',
    source: 'Blockchain Today',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    sentiment: 'negative',
    relevantAssets: ['SOL'],
    impact: 'medium',
    url: '#'
  },
  {
    id: 'news-4',
    title: 'BNB Chain Ecosystem Expansion Accelerates',
    summary: 'Binance Smart Chain sees significant growth in DeFi protocols and NFT marketplaces, driving utility demand for BNB.',
    source: 'DeFi Pulse',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    sentiment: 'positive',
    relevantAssets: ['BNB'],
    impact: 'medium',
    url: '#'
  },
  {
    id: 'news-5',
    title: 'Federal Reserve Signals Potential Rate Cuts',
    summary: 'Fed officials hint at possible interest rate reductions, which could boost risk asset demand including cryptocurrencies.',
    source: 'Financial Times',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    sentiment: 'positive',
    relevantAssets: ['BTC', 'ETH', 'SOL', 'BNB'],
    impact: 'high',
    url: '#'
  }
]

// Mock AI analysis data
export const mockAIAnalysis: AIAnalysis = {
  id: 'analysis-1',
  portfolioId: 'portfolio-1',
  analysis: {
    riskAssessment: {
      score: 6.8,
      level: 'moderate',
      factors: [
        'High Bitcoin concentration (62.9%)',
        'Moderate correlation between assets',
        'Exposure to regulatory risks',
        'Strong institutional backing for major holdings'
      ]
    },
    diversification: {
      score: 7.2,
      overweightedAssets: ['BTC'],
      underweightedAssets: ['ETH', 'Alternative L1s'],
      suggestions: [
        'Reduce Bitcoin allocation to 45-50%',
        'Increase Ethereum exposure to 25-30%',
        'Consider adding DeFi tokens for better diversification',
        'Add stablecoin allocation for risk management'
      ]
    },
    marketSentiment: {
      overall: 'bullish',
      assetSentiments: {
        BTC: 'bullish',
        ETH: 'bullish',
        SOL: 'neutral',
        BNB: 'bullish'
      }
    },
    rebalancingRecommendations: [
      {
        action: 'sell',
        asset: 'BTC',
        currentAllocation: 62.9,
        recommendedAllocation: 48.0,
        reason: 'Reduce concentration risk and take profits at current resistance levels. Bitcoin dominance is historically high.',
        confidence: 85,
        timeframe: '2-4 weeks'
      },
      {
        action: 'buy',
        asset: 'ETH',
        currentAllocation: 18.0,
        recommendedAllocation: 28.0,
        reason: 'Ethereum shows strong fundamentals post-merge. Increasing institutional adoption and DeFi growth support higher allocation.',
        confidence: 82,
        timeframe: '1-3 weeks'
      },
      {
        action: 'hold',
        asset: 'SOL',
        currentAllocation: 9.1,
        recommendedAllocation: 12.0,
        reason: 'Despite network issues, Solana ecosystem continues to grow. Slight increase recommended once technical issues are resolved.',
        confidence: 70,
        timeframe: '4-8 weeks'
      },
      {
        action: 'hold',
        asset: 'BNB',
        currentAllocation: 9.9,
        recommendedAllocation: 12.0,
        reason: 'BNB ecosystem expansion supports current price levels. Moderate increase recommended for better exchange exposure.',
        confidence: 75,
        timeframe: '2-6 weeks'
      }
    ]
  },
  newsImpact: [
    {
      newsId: 'news-1',
      impactedAssets: ['BTC'],
      recommendation: 'Consider partial profit-taking as institutional demand may already be priced in',
      urgency: 'medium'
    },
    {
      newsId: 'news-2',
      impactedAssets: ['ETH'],
      recommendation: 'Increase ETH allocation to capitalize on deflationary dynamics',
      urgency: 'high'
    },
    {
      newsId: 'news-3',
      impactedAssets: ['SOL'],
      recommendation: 'Monitor closely, consider reducing position if issues persist',
      urgency: 'medium'
    },
    {
      newsId: 'news-5',
      impactedAssets: ['BTC', 'ETH', 'SOL', 'BNB'],
      recommendation: 'Rate cuts generally positive for crypto, maintain current risk exposure',
      urgency: 'low'
    }
  ],
  generatedAt: new Date().toISOString()
}
