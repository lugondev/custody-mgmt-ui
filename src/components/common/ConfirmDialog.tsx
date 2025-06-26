'use client'

import React, { ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AlertTriangle, Trash2, Shield, LogOut, Settings } from 'lucide-react'

interface ConfirmDialogProps {
  children: ReactNode
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive' | 'warning'
  icon?: ReactNode
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}

interface ControlledConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive' | 'warning'
  icon?: ReactNode
  onConfirm: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
}

/**
 * Reusable confirmation dialog component
 */
export function ConfirmDialog({
  children,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  icon,
  onConfirm,
  disabled = false,
}: ConfirmDialogProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          confirmClass: 'bg-red-600 hover:bg-red-700 focus:ring-red-600',
          iconColor: 'text-red-600',
          defaultIcon: <Trash2 className="h-5 w-5" />,
        }
      case 'warning':
        return {
          confirmClass: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-600',
          iconColor: 'text-yellow-600',
          defaultIcon: <AlertTriangle className="h-5 w-5" />,
        }
      default:
        return {
          confirmClass: '',
          iconColor: 'text-blue-600',
          defaultIcon: <Shield className="h-5 w-5" />,
        }
    }
  }

  const styles = getVariantStyles()
  const displayIcon = icon || styles.defaultIcon

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={disabled}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {displayIcon && (
              <div className={`${styles.iconColor}`}>
                {displayIcon}
              </div>
            )}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={styles.confirmClass}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/**
 * Controlled confirmation dialog component that can be opened/closed via props
 */
export function ControlledConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  icon,
  onConfirm,
  loading = false,
  disabled = false,
}: ControlledConfirmDialogProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          confirmClass: 'bg-red-600 hover:bg-red-700 focus:ring-red-600',
          iconColor: 'text-red-600',
          defaultIcon: <Trash2 className="h-5 w-5" />,
        }
      case 'warning':
        return {
          confirmClass: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-600',
          iconColor: 'text-yellow-600',
          defaultIcon: <AlertTriangle className="h-5 w-5" />,
        }
      default:
        return {
          confirmClass: '',
          iconColor: 'text-blue-600',
          defaultIcon: <Shield className="h-5 w-5" />,
        }
    }
  }

  const styles = getVariantStyles()
  const displayIcon = icon || styles.defaultIcon

  const handleConfirm = async () => {
    await onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {displayIcon && (
              <div className={`${styles.iconColor}`}>
                {displayIcon}
              </div>
            )}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={styles.confirmClass}
            disabled={disabled || loading}
          >
            {loading ? 'Loading...' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/**
 * Pre-configured delete confirmation dialog
 */
export function DeleteConfirmDialog({
  children,
  itemName,
  onConfirm,
  disabled = false,
}: {
  children: ReactNode
  itemName: string
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <ConfirmDialog
      title="Delete Confirmation"
      description={`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
      confirmText="Delete"
      variant="destructive"
      onConfirm={onConfirm}
      disabled={disabled}
    >
      {children}
    </ConfirmDialog>
  )
}

/**
 * Pre-configured logout confirmation dialog
 */
export function LogoutConfirmDialog({
  children,
  onConfirm,
  disabled = false,
}: {
  children: ReactNode
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <ConfirmDialog
      title="Sign Out"
      description="Are you sure you want to sign out? You will need to sign in again to access your account."
      confirmText="Sign Out"
      variant="warning"
      icon={<LogOut className="h-5 w-5" />}
      onConfirm={onConfirm}
      disabled={disabled}
    >
      {children}
    </ConfirmDialog>
  )
}

/**
 * Pre-configured transaction approval dialog
 */
export function ApproveTransactionDialog({
  children,
  transactionId,
  amount,
  currency,
  onConfirm,
  disabled = false,
}: {
  children: ReactNode
  transactionId: string
  amount: string
  currency: string
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <ConfirmDialog
      title="Approve Transaction"
      description={`Are you sure you want to approve transaction ${transactionId} for ${amount} ${currency}? This action will process the transaction immediately.`}
      confirmText="Approve"
      variant="default"
      icon={<Shield className="h-5 w-5" />}
      onConfirm={onConfirm}
      disabled={disabled}
    >
      {children}
    </ConfirmDialog>
  )
}

/**
 * Pre-configured transaction rejection dialog
 */
export function RejectTransactionDialog({
  children,
  transactionId,
  onConfirm,
  disabled = false,
}: {
  children: ReactNode
  transactionId: string
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <ConfirmDialog
      title="Reject Transaction"
      description={`Are you sure you want to reject transaction ${transactionId}? This action cannot be undone and the transaction will be permanently declined.`}
      confirmText="Reject"
      variant="destructive"
      onConfirm={onConfirm}
      disabled={disabled}
    >
      {children}
    </ConfirmDialog>
  )
}

/**
 * Pre-configured settings reset dialog
 */
export function ResetSettingsDialog({
  children,
  settingsType,
  onConfirm,
  disabled = false,
}: {
  children: ReactNode
  settingsType: string
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <ConfirmDialog
      title="Reset Settings"
      description={`Are you sure you want to reset ${settingsType} to default values? This will overwrite your current configuration.`}
      confirmText="Reset"
      variant="warning"
      icon={<Settings className="h-5 w-5" />}
      onConfirm={onConfirm}
      disabled={disabled}
    >
      {children}
    </ConfirmDialog>
  )
}

/**
 * Pre-configured wallet creation dialog
 */
export function CreateWalletConfirmDialog({
  children,
  walletName,
  walletType,
  onConfirm,
  disabled = false,
}: {
  children: ReactNode
  walletName: string
  walletType: string
  onConfirm: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <ConfirmDialog
      title="Create Wallet"
      description={`Are you sure you want to create a new ${walletType} wallet named "${walletName}"? This will generate new cryptographic keys.`}
      confirmText="Create Wallet"
      variant="default"
      onConfirm={onConfirm}
      disabled={disabled}
    >
      {children}
    </ConfirmDialog>
  )
}

export default ConfirmDialog