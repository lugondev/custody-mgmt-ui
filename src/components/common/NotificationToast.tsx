'use client'

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

/**
 * Hook to use toast notifications
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

/**
 * Toast provider component
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    }
    
    setToasts(prev => [...prev, newToast])

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const clearToasts = () => {
    setToasts([])
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

/**
 * Toast container component
 */
function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

/**
 * Individual toast item component
 */
function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      removeToast(toast.id)
    }, 200)
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />
      default:
        return <Info className="h-5 w-5 text-slate-600" />
    }
  }

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-white border-slate-200'
    }
  }

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4 shadow-lg transition-all duration-200 ease-in-out',
        getBackgroundColor(),
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0',
        isLeaving && 'translate-x-full opacity-0'
      )}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-slate-900">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="mt-1 text-sm text-slate-600">
              {toast.message}
            </p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/**
 * Utility functions for common toast types
 */
export const toast = {
  success: (title: string, message?: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({ type: 'success', title, ...(message && { message }), ...options })
  },
  
  error: (title: string, message?: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({ type: 'error', title, ...(message && { message }), ...options })
  },
  
  warning: (title: string, message?: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({ type: 'warning', title, ...(message && { message }), ...options })
  },
  
  info: (title: string, message?: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({ type: 'info', title, ...(message && { message }), ...options })
  },
}

/**
 * Hook for common toast notifications
 */
export function useNotifications() {
  const { addToast } = useToast()

  return {
    success: (title: string, message?: string, options?: Partial<Toast>) => {
      addToast({ type: 'success', title, ...(message && { message }), ...options })
    },
    
    error: (title: string, message?: string, options?: Partial<Toast>) => {
      addToast({ type: 'error', title, ...(message && { message }), ...options })
    },
    
    warning: (title: string, message?: string, options?: Partial<Toast>) => {
      addToast({ type: 'warning', title, ...(message && { message }), ...options })
    },
    
    info: (title: string, message?: string, options?: Partial<Toast>) => {
      addToast({ type: 'info', title, ...(message && { message }), ...options })
    },
    
    // Common notification patterns
    saveSuccess: () => {
      addToast({
        type: 'success',
        title: 'Saved successfully',
        message: 'Your changes have been saved.',
      })
    },
    
    deleteSuccess: (itemName?: string) => {
      addToast({
        type: 'success',
        title: 'Deleted successfully',
        message: itemName ? `${itemName} has been deleted.` : 'Item has been deleted.',
      })
    },
    
    createSuccess: (itemName?: string) => {
      addToast({
        type: 'success',
        title: 'Created successfully',
        message: itemName ? `${itemName} has been created.` : 'Item has been created.',
      })
    },
    
    updateSuccess: (itemName?: string) => {
      addToast({
        type: 'success',
        title: 'Updated successfully',
        message: itemName ? `${itemName} has been updated.` : 'Item has been updated.',
      })
    },
    
    networkError: () => {
      addToast({
        type: 'error',
        title: 'Network error',
        message: 'Please check your internet connection and try again.',
        duration: 7000,
      })
    },
    
    validationError: (message?: string) => {
      addToast({
        type: 'error',
        title: 'Validation error',
        message: message || 'Please check your input and try again.',
      })
    },
    
    permissionError: () => {
      addToast({
        type: 'error',
        title: 'Permission denied',
        message: 'You do not have permission to perform this action.',
      })
    },
    
    transactionPending: (txId?: string) => {
      addToast({
        type: 'info',
        title: 'Transaction pending',
        message: txId ? `Transaction ${txId} is being processed.` : 'Your transaction is being processed.',
        duration: 10000,
      })
    },
    
    transactionSuccess: (txId?: string) => {
      addToast({
        type: 'success',
        title: 'Transaction confirmed',
        message: txId ? `Transaction ${txId} has been confirmed.` : 'Your transaction has been confirmed.',
      })
    },
    
    transactionFailed: (reason?: string) => {
      addToast({
        type: 'error',
        title: 'Transaction failed',
        message: reason || 'Your transaction could not be processed.',
        duration: 10000,
      })
    },
  }
}

export default ToastProvider