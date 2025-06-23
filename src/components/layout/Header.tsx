/**
 * Header Component
 * Top navigation bar with user menu, notifications, and search
 */

import React from 'react';
import { 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Wallet,
  Layout,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
// import { cn } from '@/lib/utils';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

/**
 * Header component with search, notifications, and user menu
 * Adapts layout based on sidebar state
 */
export function Header({ sidebarCollapsed: _ }: HeaderProps) {
  const notificationCount = 3;

  return (
    <header className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100">
      {/* Left Section - Empty space where logo was */}
      <div className="flex items-center">
        {/* Logo moved to sidebar */}
      </div>

      {/* Center Section - Navigation Menu */}
      <div className="flex items-center space-x-6">
        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Wallet className="w-5 h-5 text-gray-500" />
            <span className="text-base font-medium text-gray-500">Portfolio</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Layout className="w-5 h-5 text-gray-500" />
            <span className="text-base font-medium text-gray-500">News</span>
          </button>
        </div>
        
        {/* Divider */}
        <div className="w-px h-6 bg-gray-200"></div>
        
        {/* All Portfolio Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Layers className="w-5 h-5 text-gray-900" />
              <span className="text-base font-medium text-gray-900">All Portfolio</span>
              <ChevronDown className="w-4 h-4 text-gray-900" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>Portfolio 1</DropdownMenuItem>
            <DropdownMenuItem>Portfolio 2</DropdownMenuItem>
            <DropdownMenuItem>Portfolio 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Section - Notifications and User Menu */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-50">
            <Bell className="w-6 h-6 text-gray-900" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-base font-medium">MN</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-gray-500">john.smith@company.com</p>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;