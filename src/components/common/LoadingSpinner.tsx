import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

/**
 * Loading spinner component
 * Displays a spinning loader with optional text
 * @param size - Size of the spinner (sm, md, lg)
 * @param className - Additional CSS classes
 * @param text - Optional loading text
 */
export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
          sizeClasses[size]
        )}
      />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  )
}

/**
 * Full page loading spinner
 * Covers the entire viewport with a loading spinner
 */
export function FullPageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}

/**
 * Inline loading spinner
 * Small spinner for inline loading states
 */
export function InlineLoader({ className }: { className?: string }) {
  return (
    <div className={cn('inline-flex items-center', className)}>
      <LoadingSpinner size="sm" />
    </div>
  )
}