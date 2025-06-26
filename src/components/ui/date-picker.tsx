'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DateRange {
  from?: Date
  to?: Date
}

interface DatePickerWithRangeProps {
  className?: string
  date?: DateRange | undefined
  onDateChange?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange
}: DatePickerWithRangeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [fromDate, setFromDate] = useState(date?.from?.toISOString().split('T')[0] || '')
  const [toDate, setToDate] = useState(date?.to?.toISOString().split('T')[0] || '')

  const handleApply = () => {
    const newDate: DateRange = {}
    if (fromDate) {
      newDate.from = new Date(fromDate)
    }
    if (toDate) {
      newDate.to = new Date(toDate)
    }
    onDateChange?.(newDate)
    setIsOpen(false)
  }

  const formatDateRange = () => {
    if (!date?.from) return 'Pick a date range'
    if (!date?.to) return date.from.toLocaleDateString()
    return `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="from-date" className="text-sm font-medium">
                From
              </label>
              <Input
                id="from-date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="to-date" className="text-sm font-medium">
                To
              </label>
              <Input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleApply} size="sm">
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}