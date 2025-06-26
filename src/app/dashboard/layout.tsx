'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ToastProvider } from '@/components/common/NotificationToast'

/**
 * Dashboard layout component with sidebar navigation and header
 * Provides consistent layout structure for all dashboard pages
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)



  return (
    <ToastProvider>
      <div className='flex h-screen bg-neutral-50'>
        {/* Desktop Sidebar */}
        <div className='hidden lg:block'>
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-50 transform bg-white transition-transform duration-300 ease-in-out lg:hidden',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <Sidebar 
            collapsed={false} 
            onToggle={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content Area */}
         <div className='flex flex-1 flex-col overflow-hidden'>
           {/* Header */}
           <div className='relative'>
             <Header sidebarCollapsed={sidebarCollapsed} />
             {/* Mobile Menu Button */}
             <div className='absolute left-4 top-4 lg:hidden'>
               <Button
                 variant='ghost'
                 size='sm'
                 onClick={() => setSidebarOpen(true)}
               >
                 <Menu className='h-5 w-5' />
               </Button>
             </div>
           </div>

          {/* Page Content */}
          <main className='flex-1 overflow-y-auto bg-white p-6'>
            <div className='container mx-auto'>{children}</div>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className='fixed inset-0 z-40 bg-black/50 lg:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ToastProvider>
  )
}
