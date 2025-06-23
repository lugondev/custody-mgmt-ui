/**
 * Quick Actions Component
 * Provides quick access to common actions from the dashboard
 */

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Send,
  Download,
  Upload,
  Wallet,
  Users,
  Settings,
  ChevronDown
} from 'lucide-react';

/**
 * Quick actions dropdown for common dashboard operations
 */
export function QuickActions() {
  const handleAction = (action: string) => {
    console.log(`Executing action: ${action}`);
    // TODO: Implement actual action handlers
  };

  return (
    <div className="flex items-center gap-3">
      {/* Primary Actions */}
      <Button 
        onClick={() => handleAction('new-transaction')}
        className="bg-primary-600 hover:bg-primary-700"
      >
        <Send className="w-4 h-4 mr-2" />
        New Transaction
      </Button>

      {/* Secondary Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Quick Actions
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Wallet Actions</DropdownMenuLabel>
          
          <DropdownMenuItem onClick={() => handleAction('add-wallet')}>
            <Wallet className="w-4 h-4 mr-2" />
            Add New Wallet
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleAction('import-wallet')}>
            <Upload className="w-4 h-4 mr-2" />
            Import Wallet
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleAction('export-data')}>
            <Download className="w-4 h-4 mr-2" />
            Export Portfolio Data
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel>User Management</DropdownMenuLabel>
          
          <DropdownMenuItem onClick={() => handleAction('invite-user')}>
            <Users className="w-4 h-4 mr-2" />
            Invite Team Member
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleAction('settings')}>
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default QuickActions;