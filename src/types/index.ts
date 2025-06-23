/**
 * Global TypeScript type definitions
 * Centralized type definitions for the custody management system
 */

// User and Authentication types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  department?: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin?: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  permissions: string[]
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
}

export type UserRole = 'admin' | 'manager' | 'officer' | 'viewer'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Custody Case types
export interface CustodyCase {
  id: string
  caseNumber: string
  title: string
  description: string
  status: CaseStatus
  priority: CasePriority
  assignedTo: string
  assignedUser?: User
  startDate: string
  endDate?: string
  custodian: CustodyPerson
  subject: CustodyPerson
  documents: Document[]
  notes: CaseNote[]
  createdAt: string
  updatedAt: string
}

export type CaseStatus = 'active' | 'pending' | 'closed' | 'suspended'
export type CasePriority = 'low' | 'medium' | 'high' | 'urgent'

export interface CustodyPerson {
  id: string
  firstName: string
  lastName: string
  fullName: string
  dateOfBirth: string
  ssn: string
  address: Address
  phone: string
  email?: string
  emergencyContact?: EmergencyContact
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

// Document types
export interface Document {
  id: string
  title: string
  description?: string
  type: DocumentType
  fileName: string
  fileSize: number
  mimeType: string
  url: string
  caseId: string
  uploadedBy: string
  uploadedUser?: User
  createdAt: string
  updatedAt: string
}

export type DocumentType = 'legal' | 'medical' | 'financial' | 'personal' | 'court_order' | 'report' | 'other'

// Case Note types
export interface CaseNote {
  id: string
  content: string
  type: NoteType
  caseId: string
  authorId: string
  author?: User
  isPrivate: boolean
  createdAt: string
  updatedAt: string
}

export type NoteType = 'general' | 'incident' | 'meeting' | 'phone_call' | 'court_hearing' | 'status_update'

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Search and Filter types
export interface SearchFilters {
  status?: CaseStatus[]
  priority?: CasePriority[]
  assignedTo?: string[]
  dateRange?: {
    from?: string
    to?: string
  }
  documentType?: DocumentType[]
}

export interface SearchParams {
  query?: string
  filters?: SearchFilters
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Dashboard types
export interface DashboardStats {
  totalCases: number
  activeCases: number
  pendingCases: number
  closedCases: number
  highPriorityCases: number
  recentActivity: ActivityItem[]
}

export interface Analytics {
  portfolio: {
    totalValue: number
    totalAssets: number
    change24h: number
    changePercent24h: number
    breakdown: {
      currency: string
      value: number
      percentage: number
      change24h: number
    }[]
  }
  transactions: {
    total: number
    pending: number
    completed: number
    failed: number
    rejected: number
    approved: number
    volume24h: number
    volumeChange24h: number
    avgTransactionValue: number
    largestTransaction: number
  }
  wallets: {
    total: number
    active: number
    inactive: number
    locked: number
    hot: number
    cold: number
  }
  security: {
    pendingApprovals: number
    failedLogins24h: number
    activeApiKeys: number
    lastSecurityAudit: string
  }
  pendingActions: {
    approvals: number
    reviews: number
    alerts: number
    notifications: number
  }
  performance: {
    uptime: number
    avgResponseTime: number
    transactionSuccessRate: number
    systemLoad: number
  }
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: ActivityType
  description: string
  caseId?: string
  caseNumber?: string
  userId: string
  user?: User
  createdAt: string
}

export type ActivityType = 'case_created' | 'case_updated' | 'case_closed' | 'document_uploaded' | 'note_added' | 'status_changed'

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'date' | 'file' | 'checkbox'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: any
}

export interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  touched: Record<string, boolean>
}

// Notification types
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  userId: string
  caseId?: string
  createdAt: string
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'case_update' | 'document_upload' | 'deadline_reminder'

// Wallet and Transaction types
export interface Wallet {
  id: string
  name: string
  address: string
  network: string
  currency: string
  balance: number
  usdValue: number
  status: 'active' | 'inactive' | 'frozen'
  type: 'hot' | 'cold'
  description?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
  lastActivity: string
  owner: string
  approvers: string[]
  threshold: number
  isActive: boolean
  metadata: {
    provider: string
    derivationPath: string
    publicKey: string
  }
  transactions: number
  qrCode?: string
}

export interface TransactionApprover {
  userId: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: string | null
  comment: string | null
}

export interface Transaction {
  id: string
  type: 'send' | 'receive'
  status: 'pending' | 'approved' | 'completed' | 'rejected' | 'failed'
  amount: number
  currency: string
  usdValue: number
  fromWallet?: string
  fromAddress?: string
  toWallet?: string
  toAddress: string
  fee: number
  feeUsd: number
  txHash: string
  blockHeight: number | null
  confirmations: number
  requiredApprovals: number
  currentApprovals: number
  approvers: TransactionApprover[]
  createdBy: string
  createdAt: string
  updatedAt: string
  description?: string
  tags: string[]
  priority: 'low' | 'medium' | 'high'
}

// Settings types
export interface SystemSettings {
  general: {
    siteName: string
    siteDescription: string
    version: string
    environment: string
    timezone: string
    dateFormat: string
    timeFormat: string
    language: string
    currency: string
    maintenanceMode: boolean
    debugMode: boolean
    logoUrl: string
    faviconUrl: string
    supportEmail: string
    supportPhone: string
    companyName: string
    companyAddress: string
  }
  security: {
    sessionTimeout: number
    maxLoginAttempts: number
    lockoutDuration: number
    passwordMinLength: number
    passwordMaxLength: number
    passwordRequireSpecialChars: boolean
    passwordRequireNumbers: boolean
    passwordRequireUppercase: boolean
    passwordRequireLowercase: boolean
    passwordExpiryDays: number
    passwordHistoryCount: number
    twoFactorRequired: boolean
    twoFactorMethods: string[]
    ipWhitelistEnabled: boolean
    allowedIPs: string[]
    apiKeyExpiryDays: number
    maxApiKeysPerUser: number
    encryptionAlgorithm: string
    hashingAlgorithm: string
    saltRounds: number
    jwtExpiryHours: number
    refreshTokenExpiryDays: number
    auditLogRetentionDays: number
    securityHeaders: {
      hsts: boolean
      csp: boolean
      xssProtection: boolean
      frameOptions: string
      contentTypeOptions: boolean
    }
  }
  notifications: {
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
    slackEnabled: boolean
    webhookEnabled: boolean
    telegramEnabled: boolean
    emailSettings: {
      provider: string
      smtpHost: string
      smtpPort: number
      smtpUser: string
      smtpPassword: string
      fromEmail: string
      fromName: string
      replyToEmail: string
      maxRetries: number
      retryDelay: number
      transactionAlerts: boolean
      securityAlerts: boolean
      systemUpdates: boolean
      dailyReports: boolean
    }
    smsSettings: {
      provider: string
      accountSid: string
      authToken: string
      fromNumber: string
      maxRetries: number
    }
    pushSettings: {
      provider: string
      serverKey: string
      vapidKey: string
      approvalRequests: boolean
      lowBalanceAlerts: boolean
      failedTransactions: boolean
      systemMaintenance: boolean
    }
    webhookSettings: {
      maxRetries: number
      retryDelay: number
      timeout: number
      signatureSecret: string
    }
    defaultChannels: {
      transactionCreated: string[]
      transactionApproved: string[]
      transactionRejected: string[]
      securityAlert: string[]
      walletCreated: string[]
      lowBalance: string[]
      systemMaintenance: string[]
    }
  }
  limits: {
    maxWalletsPerUser: number
    maxTransactionAmount: number
    dailyTransactionLimit: number
    monthlyTransactionLimit: number
    maxPendingTransactions: number
    maxApproversPerWorkflow: number
    maxWorkflowSteps: number
    apiRateLimit: number
    apiRateLimitWindow: number
    maxApiRequestSize: number
    maxFileUploadSize: number
    maxReportRetentionDays: number
  }
}

export interface ApiKey {
  id: string
  name: string
  key: string
  permissions: readonly string[]
  lastUsed: string | null
  createdAt: string
  status: 'active' | 'inactive'
}

export interface SecuritySettings {
  twoFactorAuth: {
    enabled: boolean
    method: string
    backupCodes: number
    lastUsed: string
  }
  apiKeys: readonly ApiKey[]
  ipWhitelist: {
    enabled: boolean
    addresses: readonly string[]
  }
  loginSessions: readonly {
    id: string
    userId: string
    device: string
    deviceType: string
    location: string
    ipAddress: string
    loginTime: string
    startTime: string
    lastActivity: string
    userAgent: string
    status: string
  }[]
  activeSessions: readonly {
    id: string;
    userId: string;
    device: string;
    deviceType: string;
    location: string;
    ipAddress: string;
    loginTime: string;
    startTime: string;
    lastActivity: string;
    userAgent: string;
    status: string;
    current: boolean;
  }[];
  auditLogs: readonly {
    id: string;
    userId: string;
    action: string;
    resource: string;
    timestamp: string;
    ipAddress: string;
    userAgent: string;
    details: string;
    status: string;
  }[];
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  generatedAt: string;
  size: string;
  format: string;
  data?: any;
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description: string;
  rules: {
    condition: string;
    requiredApprovals: number;
    approvers: readonly string[];
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'suspended'
  avatar?: string
  department: string
  lastLogin?: string
  permissions: string[]
  createdAt: string
  employeeId: string
  position: string
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'executive'
  salary: {
    amount: number
    currency: string
    frequency: 'hourly' | 'monthly' | 'annual'
  }
  skills: string[]
  certifications: string[]
  workLocation: string
  reportingTo: string | null
  directReports: string[]
  emergencyContact: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  workSchedule: {
    type: 'full-time' | 'part-time' | 'contract'
    hoursPerWeek: number
    workDays: string[]
    startTime: string
    endTime: string
    timezone: string
  }
  performance: {
    lastReviewDate: string
    nextReviewDate: string
    rating: 'poor' | 'fair' | 'good' | 'excellent' | 'outstanding'
    goals: string[]
    achievements: string[]
  }
  benefits: {
    healthInsurance: boolean
    dentalInsurance: boolean
    visionInsurance: boolean
    retirement401k: boolean
    paidTimeOff: number
    sickLeave: number
    stockOptions?: boolean
    lifeInsurance?: boolean
    disabilityInsurance?: boolean
  }
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}