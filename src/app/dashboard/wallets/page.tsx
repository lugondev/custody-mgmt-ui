'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Wallet,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  QrCode,
  Shield,

  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { MOCK_WALLETS, getMockTransactionsByWallet } from '@/lib/mock-data';

/**
 * Wallets management page component
 * Displays wallet list, creation, and management functionality
 */
export default function WalletsPage() {
  const [wallets] = useState(MOCK_WALLETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const filteredWallets = wallets.filter((wallet) => {
    const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.currency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wallet.status === statusFilter;
    const matchesType = typeFilter === 'all' || wallet.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalValue = wallets.reduce((sum, wallet) => sum + wallet.usdValue, 0);
  const activeWallets = wallets.filter(w => w.status === 'active').length;
  const hotWallets = wallets.filter(w => w.type === 'hot').length;
  const coldWallets = wallets.filter(w => w.type === 'cold').length;

  const handleCreateWallet = () => {
    // Wallet creation logic would go here
    setIsCreateDialogOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 px-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Wallet Management</h1>
          <p className="mt-1 text-neutral-600">
            Manage your digital asset wallets and monitor balances
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Wallet</DialogTitle>
              <DialogDescription>
                Set up a new wallet for managing digital assets
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Wallet name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="currency" className="text-right">
                  Currency
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    <SelectItem value="USDT">Tether (USDT)</SelectItem>
                    <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot Wallet</SelectItem>
                    <SelectItem value="cold">Cold Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Optional description"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateWallet}>
                Create Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Value
            </CardTitle>
            <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {formatCurrency(totalValue)}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Across {wallets.length} wallets
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Active Wallets
            </CardTitle>
            <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {activeWallets}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              {((activeWallets / wallets.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Hot Wallets
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {hotWallets}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              For frequent transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Cold Wallets
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {coldWallets}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              For secure storage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Wallet Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Wallets</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by name, address, or currency..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="type-filter">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hot">Hot Wallet</SelectItem>
                  <SelectItem value="cold">Cold Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallets Table */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-blue-600" />
              Wallets ({filteredWallets.length})
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>USD Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWallets.map((wallet) => {
                const transactions = getMockTransactionsByWallet(wallet.id);
                return (
                  <TableRow key={wallet.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          wallet.type === 'hot' ? 'bg-orange-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="font-medium">{wallet.name}</p>
                          <p className="text-xs text-slate-500">{wallet.currency}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(wallet.address)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{wallet.balance}</p>
                        <p className="text-xs text-slate-500">{wallet.currency}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(wallet.usdValue)}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={wallet.type === 'hot' ? 'secondary' : 'outline'}>
                        {wallet.type} wallet
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        wallet.status === 'active' ? 'default' :
                        wallet.status === 'inactive' ? 'secondary' :
                        'destructive'
                      }>
                        {wallet.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">
                        {new Date(wallet.lastActivity).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        {transactions.length} transactions
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedWallet(wallet)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" />
                            Show QR Code
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyToClipboard(wallet.address)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Address
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Wallet
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Wallet
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Wallet Details Dialog */}
      {selectedWallet && (
        <Dialog open={!!selectedWallet} onOpenChange={() => setSelectedWallet(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                {selectedWallet.name}
              </DialogTitle>
              <DialogDescription>
                Detailed information about this wallet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Currency</Label>
                  <p className="text-sm font-medium">{selectedWallet.currency}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <Badge variant={selectedWallet.type === 'hot' ? 'secondary' : 'outline'}>
                    {selectedWallet.type} wallet
                  </Badge>
                </div>
                <div>
                  <Label>Balance</Label>
                  <p className="text-sm font-medium">
                    {selectedWallet.balance} {selectedWallet.currency}
                  </p>
                </div>
                <div>
                  <Label>USD Value</Label>
                  <p className="text-sm font-medium">
                    {formatCurrency(selectedWallet.usdValue)}
                  </p>
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded flex-1">
                    {selectedWallet.address}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(selectedWallet.address)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {selectedWallet.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Created</Label>
                  <p className="text-sm">
                    {new Date(selectedWallet.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Last Activity</Label>
                  <p className="text-sm">
                    {new Date(selectedWallet.lastActivity).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedWallet(null)}>
                Close
              </Button>
              <Button>
                Edit Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}