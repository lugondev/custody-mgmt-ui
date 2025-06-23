/**
 * AppLayout Component
 * Main layout wrapper with sidebar and header for authenticated pages
 */

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main application layout component
 * Provides consistent layout structure with sidebar navigation and header
 */
export function AppLayout({ children, className }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header sidebarCollapsed={sidebarCollapsed} />
        
        {/* Page Content */}
        <main className={cn(
          "flex-1 overflow-y-auto bg-white p-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;