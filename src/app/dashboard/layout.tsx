'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'


import {
  CreditCard,
  Home,
  Menu,
  Settings,
  TrendingUp,
  Wallet,
  Stars,
  ChevronRight,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'

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
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Assets', href: '/dashboard/wallets', icon: Wallet },
    { name: 'Transactions', href: '/dashboard/transactions', icon: CreditCard },
    { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
    { name: 'Portfox AI', href: '/dashboard/portfox-ai', icon: Stars },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]



  return (
    <div className='box-border flex min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950'>
      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:static lg:inset-0 lg:translate-x-0'
        )}
      >
        <div className='flex h-full flex-col px-4 py-6'>
          {/* Logo */}
          <div className='mb-8 flex items-center space-x-2'>
            <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500'>
              <div className='h-4 w-6 rounded-sm bg-white'></div>
            </div>
            <span className='text-lg font-semibold text-gray-900'>
              Custody MGMT
            </span>
          </div>

          {/* Navigation */}
          <nav className='flex-1 space-y-1'>
            {navigation.map(item => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center justify-between rounded-full px-4 py-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <div className='flex items-center'>
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5',
                        isActive ? 'text-white' : 'text-gray-400'
                      )}
                    />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className='h-4 w-4 text-white' />}
                </Link>
              )
            })}
          </nav>

          {/* Trade smarter with Portfox AI Modal */}
          <div className='relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-4 text-white'>
            {/* Background pattern */}
            <div className='absolute inset-0 opacity-10'>
              <div className='absolute left-4 top-4 h-8 w-8 rounded-full bg-white/20'></div>
              <div className='absolute right-6 top-8 h-6 w-6 rounded-full bg-white/15'></div>
              <div className='absolute bottom-6 left-8 h-4 w-4 rounded-full bg-white/25'></div>
              <div className='absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/10'></div>
            </div>

            <div className='relative z-10'>
              <h3 className='mb-2 text-lg font-semibold'>
                Trade smarter with Portfox AI
              </h3>
              <p className='mb-4 text-sm leading-relaxed text-green-100'>
                Automate trades based on user-defined criteria, using AI
                algorithms.
              </p>
              <button className='rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/30'>
                Coming soon
              </button>
            </div>
          </div>

          {/* Help & First step */}
          <div className='mt-4 flex cursor-pointer items-center text-gray-500 transition-colors duration-200 hover:text-gray-700'>
            <Settings className='mr-2 h-4 w-4' />
            <span className='text-sm'>Help & First step</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full max-w-full flex-1 overflow-x-hidden lg:pl-0'>
        {/* Header */}
        <div className='sticky top-0 z-40 w-full max-w-full overflow-x-hidden'>
          <Header sidebarCollapsed={false} />
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
        <main className='w-full max-w-full overflow-x-hidden p-6'>
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
  )
}
