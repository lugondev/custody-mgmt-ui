'use client'

import React, { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
} from 'lucide-react'

export interface Column<T> {
  key: keyof T | string
  title: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: T, index: number) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  title?: string
  description?: string
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  showPagination?: boolean
  loading?: boolean
  emptyMessage?: string
  className?: string
  onRowClick?: (row: T, index: number) => void
}

type SortDirection = 'asc' | 'desc' | null

/**
 * Reusable data table component with sorting, filtering, and pagination
 */
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  description,
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize = 10,
  showPagination = true,
  loading = false,
  emptyMessage = 'No data available',
  className,
  onRowClick,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Record<string, string>>({})

  /**
   * Filter data based on search term and column filters
   */
  const filteredData = useMemo(() => {
    let filtered = [...data]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply column filters
    Object.entries(filters).forEach(([columnKey, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter((row) =>
          String(row[columnKey]).toLowerCase().includes(filterValue.toLowerCase())
        )
      }
    })

    return filtered
  }, [data, searchTerm, filters])

  /**
   * Sort filtered data
   */
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0

      const comparison = aValue < bValue ? -1 : 1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortColumn, sortDirection])

  /**
   * Paginate sorted data
   */
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, pageSize, showPagination])

  /**
   * Calculate pagination info
   */
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, sortedData.length)

  /**
   * Handle column sort
   */
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortDirection(null)
        setSortColumn(null)
      } else {
        setSortDirection('asc')
      }
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  /**
   * Handle column filter
   */
  const handleFilter = (columnKey: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value,
    }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  /**
   * Get sort icon for column
   */
  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="h-4 w-4" />
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="h-4 w-4" />
    }
    return <ArrowUpDown className="h-4 w-4" />
  }

  /**
   * Get cell value
   */
  const getCellValue = (row: T, column: Column<T>, index: number) => {
    const value = typeof column.key === 'string' ? row[column.key] : row[column.key as keyof T]
    
    if (column.render) {
      return column.render(value, row, index)
    }
    
    return value
  }

  /**
   * Reset all filters and search
   */
  const resetFilters = () => {
    setSearchTerm('')
    setFilters({})
    setSortColumn(null)
    setSortDirection(null)
    setCurrentPage(1)
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some(Boolean) || sortColumn

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            {searchable && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
            
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
          
          {/* Column Filters */}
          {columns.some(col => col.filterable) && (
            <div className="flex flex-wrap gap-2">
              {columns
                .filter(col => col.filterable)
                .map((column) => {
                  const columnKey = String(column.key)
                  return (
                    <div key={columnKey} className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">{column.title}:</span>
                      <Input
                        placeholder={`Filter ${column.title.toLowerCase()}`}
                        value={filters[columnKey] || ''}
                        onChange={(e) => handleFilter(columnKey, e.target.value)}
                        className="w-32"
                      />
                    </div>
                  )
                })
              }
            </div>
          )}
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => {
                  const columnKey = String(column.key)
                  return (
                    <TableHead
                      key={columnKey}
                      className={`${column.width ? `w-[${column.width}]` : ''} ${
                        column.align === 'center'
                          ? 'text-center'
                          : column.align === 'right'
                          ? 'text-right'
                          : 'text-left'
                      }`}
                    >
                      {column.sortable ? (
                        <Button
                          variant="ghost"
                          onClick={() => handleSort(columnKey)}
                          className="h-auto p-0 font-medium hover:bg-transparent"
                        >
                          {column.title}
                          {getSortIcon(columnKey)}
                        </Button>
                      ) : (
                        column.title
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8 text-slate-500">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow
                    key={index}
                    className={onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {columns.map((column) => {
                      const columnKey = String(column.key)
                      return (
                        <TableCell
                          key={columnKey}
                          className={`${
                            column.align === 'center'
                              ? 'text-center'
                              : column.align === 'right'
                              ? 'text-right'
                              : 'text-left'
                          }`}
                        >
                          {getCellValue(row, column, index)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-600">
              Showing {startItem} to {endItem} of {sortedData.length} results
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                <span className="text-sm">Page</span>
                <Select
                  value={String(currentPage)}
                  onValueChange={(value) => setCurrentPage(Number(value))}
                >
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <SelectItem key={page} value={String(page)}>
                        {page}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm">of {totalPages}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DataTable