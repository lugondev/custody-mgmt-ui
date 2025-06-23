import { z } from 'zod'

/**
 * Common validation schemas for forms
 * Using Zod for type-safe validation
 */

// Base schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email format')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')

export const phoneSchema = z
  .string()
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format')

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// User profile schemas
export const updateProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  avatar: z.string().url().optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Custody case schemas
export const custodyPersonSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format (XXX-XX-XXXX)'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: phoneSchema,
  email: emailSchema.optional(),
})

export const custodyCaseSchema = z.object({
  caseNumber: z.string().min(1, 'Case number is required'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['active', 'pending', 'closed', 'suspended']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  custodian: custodyPersonSchema,
  subject: custodyPersonSchema,
})

export const updateCaseStatusSchema = z.object({
  status: z.enum(['active', 'pending', 'closed', 'suspended']),
  notes: z.string().optional(),
})

// Document schemas
export const documentSchema = z.object({
  title: z.string().min(1, 'Document title is required'),
  description: z.string().optional(),
  type: z.enum(['legal', 'medical', 'financial', 'personal', 'other']),
  file: z.instanceof(File, { message: 'File is required' }),
})

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  filters: z.object({
    status: z.array(z.string()).optional(),
    priority: z.array(z.string()).optional(),
    assignedTo: z.array(z.string()).optional(),
    dateRange: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
    }).optional(),
  }).optional(),
})

// Export types
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type CustodyPersonFormData = z.infer<typeof custodyPersonSchema>
export type CustodyCaseFormData = z.infer<typeof custodyCaseSchema>
export type UpdateCaseStatusFormData = z.infer<typeof updateCaseStatusSchema>
export type DocumentFormData = z.infer<typeof documentSchema>
export type SearchFormData = z.infer<typeof searchSchema>