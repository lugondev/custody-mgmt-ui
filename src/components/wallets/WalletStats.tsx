'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Wallet, TrendingUp, Shield, Activity } from 'lucide-react';
import { MOCK_WALLETS } from '@/lib/mock-data';

export function WalletStats() {
  // Calculate statistics from mock data
  const totalWallets = MOCK_WALLETS.length;
  const activeWallets = MOCK_WALLETS.filter(w => w.status === 'active').length;
  const hotWallets = MOCK_WALLETS.filter(w => w.type === 'hot').length;
  const coldWallets = MOCK_WALLETS.filter(w => w.type === 'cold').length;
  
  const totalValue = MOCK_WALLETS.reduce((sum, wallet) => sum + wallet.usdValue, 0);
  const averageValue = totalValue / totalWallets;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Wallets',
      value: totalWallets.toString(),
      description: `${activeWallets} active`,
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      title: 'Total Value',
      value: formatCurrency(totalValue),
      description: `Avg: ${formatCurrency(averageValue)}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      title: 'Hot Wallets',
      value: hotWallets.toString(),
      description: `${((hotWallets / totalWallets) * 100).toFixed(1)}% of total`,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    },
    {
      title: 'Cold Wallets',
      value: coldWallets.toString(),
      description: `${((coldWallets / totalWallets) * 100).toFixed(1)}% of total`,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}