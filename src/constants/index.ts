/**
 * Design System Constants
 * Contains color palette, spacing, and other design tokens
 */

// Color Palette
export const COLORS = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#1E40AF', // Primary brand color
    700: '#1D4ED8',
    800: '#1E3A8A',
    900: '#1E3A8A',
  },
  secondary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669', // Secondary brand color
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

// Spacing Scale
export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Border Radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// Shadows
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Animation Durations
export const ANIMATION = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// Application Constants
export const APP_CONFIG = {
  name: 'Custody Management System',
  description: 'A comprehensive custody management application',
  version: '1.0.0',
  sidebar: {
    width: '240px',
    collapsedWidth: '64px',
  },
  header: {
    height: '64px',
  },
} as const;

// Navigation Routes
export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  analytics: '/dashboard/analytics',
  wallets: '/wallets',
  walletCreate: '/wallets/create',
  walletDetails: (id: string) => `/wallets/${id}`,
  transactions: '/transactions',
  transactionCreate: '/transactions/create',
  transactionDetails: (id: string) => `/transactions/${id}`,
  transactionApprove: (id: string) => `/transactions/${id}/approve`,
  pendingApprovals: '/transactions/pending',
  users: '/users',
  userDetails: (id: string) => `/users/${id}`,
  roles: '/roles',
  settings: '/settings',
  securitySettings: '/settings/security',
  workflowSettings: '/settings/approval-workflows',
  portfoxAI: '/portfox-ai',
} as const;

// Status Types
export const STATUS_TYPES = {
  transaction: {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected',
    completed: 'completed',
    failed: 'failed',
  },
  wallet: {
    active: 'active',
    inactive: 'inactive',
    suspended: 'suspended',
  },
  user: {
    active: 'active',
    inactive: 'inactive',
    pending: 'pending',
  },
} as const;

// Currency Types
export const CURRENCIES = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  USDT: 'Tether',
  USDC: 'USD Coin',
  BNB: 'Binance Coin',
} as const;

// Network Types
export const NETWORKS = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  binance: 'Binance Smart Chain',
  polygon: 'Polygon',
} as const;

// Network types array for filters
export const NETWORK_TYPES = Object.keys(NETWORKS) as Array<keyof typeof NETWORKS>;

// Currency types for wallets
export const CURRENCY_TYPES = ['BTC', 'ETH', 'BNB', 'MATIC', 'USDT', 'USDC'] as const;
export type CurrencyType = typeof CURRENCY_TYPES[number];