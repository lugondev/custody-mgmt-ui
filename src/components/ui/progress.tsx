"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    size?: "sm" | "md" | "lg"
    variant?: "default" | "success" | "warning" | "error" | "info"
  }
>(({ className, value, size = "md", variant = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  const variantClasses = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info",
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-secondary",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          variantClasses[variant]
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
