'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Wallet, MoreHorizontal, Eye, Edit, Trash2, Copy, ExternalLink } from 'lucide-react';
import { MOCK_WALLETS } from '@/lib/mock-data';

interface WalletListProps {
  filters: {
    search: string;
    status: string;
    type: string;
    network: string;
  };
}

/**
 * Component to display and manage the list of wallets
 * Includes filtering, sorting, and action capabilities
 */
export function WalletList({ filters }: WalletListProps) {
  const [sortBy, setSortBy] = useState<'name' | 'balance' | 'usdValue' | 'createdAt'>('usdValue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Truncate address helper
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  // Filter and sort wallets
  const filteredAndSortedWallets = useMemo(() => {
    let filtered = MOCK_WALLETS.filter(wallet => {
      const matchesSearch = wallet.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           wallet.address.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || wallet.status === filters.status;
      const matchesType = filters.type === 'all' || wallet.type === filters.type;
      const matchesNetwork = filters.network === 'all' || wallet.network === filters.network;
      
      return matchesSearch && matchesStatus && matchesType && matchesNetwork;
    });

    // Sort wallets
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [filters, sortBy, sortOrder]);

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'maintenance': return 'destructive';
      default: return 'secondary';
    }
  };

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    return type === 'hot' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200' :
           'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="w-5 h-5 mr-2 text-blue-600" />
            Wallet List
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {filteredAndSortedWallets.length} wallets
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredAndSortedWallets.length === 0 ? (
          <div className="text-center py-8">
            <Wallet className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300">No wallets found</p>
            <p className="text-sm text-slate-500">Try adjusting your filters</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => handleSort('name')}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Address</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => handleSort('balance')}
                >
                  Balance {sortBy === 'balance' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => handleSort('usdValue')}
                >
                  USD Value {sortBy === 'usdValue' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedWallets.map((wallet) => (
                <TableRow key={wallet.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{wallet.name}</p>
                      <p className="text-xs text-slate-500">
                        Created {new Date(wallet.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeBadgeColor(wallet.type)}>
                      {wallet.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{wallet.network}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">
                        {truncateAddress(wallet.address)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(wallet.address)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {wallet.balance} {wallet.currency}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{formatCurrency(wallet.usdValue)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(wallet.status)}>
                      {wallet.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Wallet
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on Explorer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Wallet
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}