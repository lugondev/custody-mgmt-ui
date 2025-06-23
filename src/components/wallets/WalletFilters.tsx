'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { NETWORK_TYPES } from '@/constants';

interface WalletFiltersProps {
  filters: {
    search: string;
    status: string;
    type: string;
    network: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function WalletFilters({ filters, onFiltersChange }: WalletFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search wallets..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hot">Hot Wallet</SelectItem>
              <SelectItem value="cold">Cold Wallet</SelectItem>
            </SelectContent>
          </Select>

          {/* Network Filter */}
          <Select value={filters.network} onValueChange={(value) => updateFilter('network', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Networks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Networks</SelectItem>
              {NETWORK_TYPES.map((network) => (
                <SelectItem key={network} value={network}>
                  {network}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}