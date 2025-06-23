import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'secondary'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'md', variant = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-4 py-3 text-base',
    }

    const variantClasses = {
      default: 'border-input focus-visible:ring-ring',
      primary: 'border-primary-color focus-visible:ring-primary-color',
      secondary: 'border-secondary-color focus-visible:ring-secondary-color',
    }

    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-lg border bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
