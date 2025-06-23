"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    thickness?: "thin" | "medium" | "thick"
  }
>(({ className, orientation = "horizontal", thickness = "thin", decorative, ...props }, ref) => {
  const thicknessClasses = {
    thin: orientation === "horizontal" ? "h-px" : "w-px",
    medium: orientation === "horizontal" ? "h-0.5" : "w-0.5",
    thick: orientation === "horizontal" ? "h-1" : "w-1",
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      {...(decorative !== undefined && { decorative })}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        thicknessClasses[thickness],
        orientation === "horizontal" ? "w-full" : "h-full",
        className
      )}
      {...props}
    />
  )
})
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
