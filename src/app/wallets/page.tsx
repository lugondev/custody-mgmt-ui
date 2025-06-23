'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { WalletList, WalletFilters, WalletStats, CreateWalletDialog } from '@/components/wallets';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function WalletsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    network: 'all'
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wallets</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage and monitor all cryptocurrency wallets
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Wallet
          </Button>
        </div>

        {/* Wallet Statistics */}
        <WalletStats />

        {/* Filters */}
        <WalletFilters filters={filters} onFiltersChange={setFilters} />

        {/* Wallet List */}
        <WalletList filters={filters} />

        {/* Create Wallet Dialog */}
        <CreateWalletDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
        />
      </div>
    </AppLayout>
  );
}