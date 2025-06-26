/**
 * Sidebar Component
 * Responsive navigation sidebar with collapsible functionality
 */

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Wallet,
  ArrowLeftRight,
  Settings,
  BarChart3,
  Stars,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  FileText,
  CheckSquare,
  AlertTriangle,
  Globe,
  UserCheck,
  ClipboardList,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES, APP_CONFIG } from '@/constants'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<any>
  badge?: string
}

const navigationItems: NavItem[] = [
  {
    label: 'Home',
    href: ROUTES.dashboard,
    icon: Home,
  },
  {
    label: 'Assets',
    href: '/dashboard/wallets',
    icon: Wallet,
  },
  {
    label: 'Transactions',
    href: '/dashboard/transactions',
    icon: ArrowLeftRight,
  },
  {
    label: 'Analytics',
    href: ROUTES.analytics,
    icon: BarChart3,
  },
  {
    label: 'Portfox AI',
    href: '/dashboard/portfox-ai',
    icon: Stars,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    label: 'Team',
    href: '/dashboard/team',
    icon: UserCheck,
  },
  {
    label: 'Approvals',
    href: '/dashboard/approvals',
    icon: CheckSquare,
  },
  {
    label: 'Audit',
    href: '/dashboard/audit',
    icon: ClipboardList,
  },
  {
    label: 'Compliance',
    href: '/dashboard/compliance',
    icon: AlertTriangle,
  },
  {
    label: 'Security',
    href: '/dashboard/security',
    icon: Shield,
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
  },
  {
    label: 'API',
    href: '/dashboard/api',
    icon: Globe,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

/**
 * Sidebar navigation component with responsive design
 * Supports collapsed state and active route highlighting
 */
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-neutral-200 bg-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo and Toggle */}
      <div className='flex items-center justify-between border-b border-neutral-200 p-4'>
        {!collapsed && (
          <div className='flex items-center space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600'>
              <Wallet className='h-5 w-5 text-white' />
            </div>
            <span className='text-sm font-semibold text-neutral-900'>
              {APP_CONFIG.name.split(' ')[0]}
            </span>
          </div>
        )}

        <Button
          variant='ghost'
          size='sm'
          onClick={onToggle}
          className='h-auto p-1.5'
        >
          {collapsed ? (
            <ChevronRight className='h-4 w-4' />
          ) : (
            <ChevronLeft className='h-4 w-4' />
          )}
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className='flex-1 space-y-1 p-4'>
        {navigationItems.map(item => {
          const isActive =
            pathname === item.href ||
            (item.href !== ROUTES.dashboard && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                'hover:bg-neutral-50',
                isActive
                  ? 'bg-primary-gradient text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900',
                collapsed && 'justify-center px-2'
              )}
            >
              <item.icon
                className={cn(
                  'flex-shrink-0',
                  collapsed ? 'h-5 w-5' : 'h-5 w-5',
                  isActive ? 'text-white' : 'text-current'
                )}
              />

              {!collapsed && (
                <>
                  <span className='flex-1'>{item.label}</span>
                  {item.badge && (
                    <span className='flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-error px-1.5 py-0.5 text-xs text-white'>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className='border-t border-neutral-200 p-4'>
        <div
          className={cn(
            'flex cursor-pointer items-center space-x-3 rounded-lg p-2 hover:bg-neutral-100',
            collapsed && 'justify-center'
          )}
        >
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary-100'>
            <span className='text-sm font-medium text-primary-700'>JS</span>
          </div>
          {!collapsed && (
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium text-neutral-900'>
                John Smith
              </p>
              <p className='truncate text-xs text-neutral-500'>Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
