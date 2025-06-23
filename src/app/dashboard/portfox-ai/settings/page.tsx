'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Settings,
  Shield,
  AlertTriangle,
  Save,
  RotateCcw,
  TrendingUp,
  Zap,
  PieChart,
} from 'lucide-react'
import { AutoRebalanceSettings } from '@/types/portfolio'
import { mockPortfolio } from '@/lib/mock-portfolio-data'

/**
 * Portfolio AI Settings Page
 * Configure auto-rebalancing, risk management, and AI preferences
 */
export default function PortfolioSettingsPage() {
  const [settings, setSettings] = useState<AutoRebalanceSettings>({
    enabled: true,
    threshold: 5, // 5% deviation
    targetAllocations: {
      BTC: 48,
      ETH: 28,
      SOL: 12,
      BNB: 12,
    },
    rebalanceFrequency: 'weekly',
    excludeAssets: [],
    maxSingleTradeSize: 10000,
  })

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const portfolio = mockPortfolio

  const updateSetting = (key: keyof AutoRebalanceSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }))
    setHasUnsavedChanges(true)
  }

  const updateTargetAllocation = (asset: string, value: number) => {
    const newAllocations = {
      ...settings.targetAllocations,
      [asset]: value,
    }
    
    setSettings(prev => ({
      ...prev,
      targetAllocations: newAllocations,
    }))
    setHasUnsavedChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setHasUnsavedChanges(false)
  }

  const handleReset = () => {
    setSettings({
      enabled: true,
      threshold: 5,
      targetAllocations: {
        BTC: 48,
        ETH: 28,
        SOL: 12,
        BNB: 12,
      },
      rebalanceFrequency: 'weekly',
      excludeAssets: [],
      maxSingleTradeSize: 10000,
    })
    setHasUnsavedChanges(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getTotalAllocation = () => {
    return Object.values(settings.targetAllocations).reduce((sum, val) => sum + val, 0)
  }

  const getAllocationDifference = (asset: string) => {
    const currentAsset = portfolio.assets.find(a => a.symbol === asset)
    if (!currentAsset) return 0
    const targetAllocation = settings.targetAllocations[asset]
    if (targetAllocation === undefined) return 0
    return targetAllocation - currentAsset.allocation
  }

  return (
    <div className="space-y-6 px-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="mr-3 h-7 w-7 text-blue-600" />
            Portfolio AI Settings
          </h1>
          <p className="mt-1 text-gray-600">
            Configure automatic rebalancing and AI portfolio management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">
              <AlertTriangle className="mr-1 h-3 w-3" />
              Unsaved changes
            </Badge>
          )}
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isSaving}
            className="border-gray-200"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="rebalancing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rebalancing">Auto Rebalancing</TabsTrigger>
          <TabsTrigger value="allocations">Target Allocations</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="preferences">AI Preferences</TabsTrigger>
        </TabsList>

        {/* Auto Rebalancing Settings */}
        <TabsContent value="rebalancing" className="space-y-6">
          <Card className="border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                <Zap className="mr-2 h-5 w-5 text-blue-600" />
                Automatic Rebalancing
              </CardTitle>
              <p className="text-sm text-gray-600">
                Configure when and how your portfolio should be automatically rebalanced
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    Enable Auto Rebalancing
                  </Label>
                  <p className="text-sm text-gray-600">
                    Automatically rebalance portfolio when allocations drift from targets
                  </p>
                </div>
                <Switch
                  checked={settings.enabled}
                  onCheckedChange={(checked) => updateSetting('enabled', checked)}
                />
              </div>

              {settings.enabled && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-900 mb-2 block">
                        Rebalancing Threshold
                      </Label>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          min="1"
                          max="20"
                          value={settings.threshold}
                          onChange={(e) => updateSetting('threshold', Number(e.target.value))}
                          className="border-gray-200"
                        />
                        <p className="text-xs text-gray-500">
                          Rebalance when any asset deviates by more than {settings.threshold}% from target
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-900 mb-2 block">
                        Rebalancing Frequency
                      </Label>
                      <Select
                        value={settings.rebalanceFrequency}
                        onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                          updateSetting('rebalanceFrequency', value)
                        }
                      >
                        <SelectTrigger className="border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-900 mb-2 block">
                      Maximum Single Trade Size
                    </Label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={settings.maxSingleTradeSize}
                        onChange={(e) => updateSetting('maxSingleTradeSize', Number(e.target.value))}
                        className="border-gray-200"
                      />
                      <p className="text-xs text-gray-500">
                        Maximum value for a single rebalancing trade: {formatCurrency(settings.maxSingleTradeSize)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Target Allocations */}
        <TabsContent value="allocations" className="space-y-6">
          <Card className="border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                <PieChart className="mr-2 h-5 w-5 text-blue-600" />
                Target Asset Allocations
              </CardTitle>
              <p className="text-sm text-gray-600">
                Set your desired portfolio allocation for each asset
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(settings.targetAllocations).map(([asset, allocation]) => {
                  const currentAsset = portfolio.assets.find(a => a.symbol === asset)
                  const difference = getAllocationDifference(asset)
                  
                  return (
                    <div key={asset} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={currentAsset?.icon ? `/crypto-icons/${currentAsset.icon}` : '/placeholder-avatar.jpg'}
                            alt={asset}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{asset}</h4>
                            <p className="text-xs text-gray-500">
                              Current: {currentAsset?.allocation.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              Target: {allocation}%
                            </div>
                            <div className={`text-xs ${
                              Math.abs(difference) > settings.threshold
                                ? 'text-red-600'
                                : 'text-green-600'
                            }`}>
                              {difference > 0 ? '+' : ''}{difference.toFixed(1)}% difference
                            </div>
                          </div>
                          <div className="w-20">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={allocation}
                              onChange={(e) => updateTargetAllocation(asset, Number(e.target.value))}
                              className="text-sm border-gray-200"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Current vs Target</span>
                          <span>{allocation}%</span>
                        </div>
                        <Progress 
                          value={allocation} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Total Allocation</span>
                  <span className={`text-sm font-semibold ${
                    getTotalAllocation() === 100 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getTotalAllocation()}%
                  </span>
                </div>
                {getTotalAllocation() !== 100 && (
                  <p className="text-xs text-red-600 mt-1">
                    Total allocation must equal 100%
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Management */}
        <TabsContent value="risk" className="space-y-6">
          <Card className="border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                <Shield className="mr-2 h-5 w-5 text-blue-600" />
                Risk Management
              </CardTitle>
              <p className="text-sm text-gray-600">
                Configure risk limits and safety measures
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Portfolio Risk Metrics</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Risk Score</span>
                      <Badge variant="outline" className="border-yellow-200 text-yellow-700">
                        {portfolio.riskScore}/10
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Diversification Score</span>
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        {portfolio.diversificationScore}/10
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Max Asset Concentration</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.max(...portfolio.assets.map(a => a.allocation)).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Risk Limits</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-600">Max Single Asset %</Label>
                      <Input
                        type="number"
                        min="10"
                        max="80"
                        defaultValue="50"
                        className="mt-1 border-gray-200"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600">Daily Loss Limit %</Label>
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        defaultValue="5"
                        className="mt-1 border-gray-200"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600">Stop Loss Trigger %</Label>
                      <Input
                        type="number"
                        min="5"
                        max="30"
                        defaultValue="15"
                        className="mt-1 border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                AI Preferences
              </CardTitle>
              <p className="text-sm text-gray-600">
                Customize AI behavior and trading preferences
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      AI Trading Mode
                    </Label>
                    <p className="text-sm text-gray-600">
                      How aggressive should AI be with trading decisions
                    </p>
                  </div>
                  <Select defaultValue="moderate">
                    <SelectTrigger className="w-32 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      News-Based Trading
                    </Label>
                    <p className="text-sm text-gray-600">
                      Allow AI to trade based on news sentiment analysis
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Technical Analysis
                    </Label>
                    <p className="text-sm text-gray-600">
                      Use technical indicators for trading decisions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Social Sentiment
                    </Label>
                    <p className="text-sm text-gray-600">
                      Consider social media sentiment in trading decisions
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Real-time Notifications
                    </Label>
                    <p className="text-sm text-gray-600">
                      Receive notifications about AI trading actions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
