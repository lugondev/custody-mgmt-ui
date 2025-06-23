import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Newspaper,
  Brain,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'
import { MarketNews, AIAnalysis } from '@/types/portfolio'

interface MarketNewsAnalysisProps {
  news: MarketNews[]
  aiAnalysis: AIAnalysis
  onNewsClick: (url: string) => void
}

export function MarketNewsAnalysis({ news, aiAnalysis, onNewsClick }: MarketNewsAnalysisProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'negative':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Market News */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
            <Newspaper className="mr-2 h-5 w-5 text-blue-600" />
            Market News & Analysis
          </CardTitle>
          <p className="text-sm text-gray-600">
            Latest news affecting your portfolio assets
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onNewsClick(item.url)}
              >
                <div className="flex-shrink-0 mt-1">
                  {getSentimentIcon(item.sentiment)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-2 ml-4">
                      {getImpactIcon(item.impact)}
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="outline"
                        className={getSentimentColor(item.sentiment)}
                      >
                        {item.sentiment}
                      </Badge>
                      
                      <div className="flex items-center space-x-1">
                        {item.relevantAssets.map((asset) => (
                          <Badge key={asset} variant="outline" className="text-xs">
                            {asset}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatTimeAgo(item.publishedAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI News Impact Analysis */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
            <Brain className="mr-2 h-5 w-5 text-blue-600" />
            AI News Impact Analysis
          </CardTitle>
          <p className="text-sm text-gray-600">
            How current news affects your portfolio recommendations
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAnalysis.newsImpact.map((impact, index) => {
              const relatedNews = news.find(n => n.id === impact.newsId)
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 bg-blue-50"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        Impact on {impact.impactedAssets.join(', ')}
                      </h4>
                      <Badge
                        variant="outline"
                        className={getUrgencyColor(impact.urgency)}
                      >
                        {impact.urgency} urgency
                      </Badge>
                    </div>
                    
                    {relatedNews && (
                      <p className="text-xs text-gray-600 mb-2">
                        Related to: {relatedNews.title}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded border border-blue-200">
                      💡 {impact.recommendation}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
