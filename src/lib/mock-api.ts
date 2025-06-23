/**
 * Mock API Client for Custody Management System
 * Provides realistic API simulation with filters, pagination, and error handling
 */

import type {
  User,
  Wallet,
  Transaction,
  ApiResponse,
  PaginatedResponse,
  SearchParams,
  DashboardStats,
  ActivityItem,
  Notification,
  SecuritySettings,
  Report,
  ApprovalWorkflow,
} from '@/types'

import {
  MOCK_USERS,
  MOCK_WALLETS,
  MOCK_TRANSACTIONS,
  MOCK_ANALYTICS,
  MOCK_NOTIFICATIONS,
  MOCK_SECURITY_SETTINGS,
  MOCK_REPORTS,
  MOCK_APPROVAL_WORKFLOWS,
  MOCK_SYSTEM_SETTINGS,
  MOCK_TEAM_MEMBERS,
  getMockWalletById,
  getMockTransactionById,
  getMockUserById,
  getMockTransactionsByWallet,
  getMockPendingTransactions,
} from './mock-data'

// API Response delay simulation
const API_DELAY = 300 // milliseconds

/**
 * Simulates API delay for realistic experience
 */
const delay = (ms: number = API_DELAY): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Creates a successful API response
 */
const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => {
  const response: ApiResponse<T> = {
    success: true,
    data,
  }
  if (message) {
    response.message = message
  }
  return response
}

/**
 * Creates an error API response
 */
const createErrorResponse = (error: string, errors?: Record<string, string[]>): ApiResponse => {
  const response: ApiResponse = {
    success: false,
    error,
  }
  if (errors) {
    response.errors = errors
  }
  return response
}

/**
 * Creates a paginated response
 */
const createPaginatedResponse = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)
  const total = data.length
  const totalPages = Math.ceil(total / limit)

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
  expiresIn: number
}

export const authApi = {
  /**
   * User login
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    await delay()

    const user = MOCK_USERS.find(u => u.email === credentials.email)
    
    if (!user) {
      return createErrorResponse('Invalid email or password')
    }

    // Simulate password validation (in real app, this would be hashed)
    if (credentials.password !== 'password123') {
      return createErrorResponse('Invalid email or password')
    }

    return createSuccessResponse({
      user,
      token: 'mock_jwt_token_' + Date.now(),
      expiresIn: 3600, // 1 hour
    }, 'Login successful')
  },

  /**
   * User logout
   */
  async logout(): Promise<ApiResponse<null>> {
    await delay(200)
    return createSuccessResponse(null, 'Logout successful')
  },

  /**
   * Refresh token
   */
  async refreshToken(): Promise<ApiResponse<{ token: string; expiresIn: number }>> {
    await delay(200)
    return createSuccessResponse({
      token: 'mock_jwt_token_' + Date.now(),
      expiresIn: 3600,
    })
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    await delay()
    const user = MOCK_USERS[0]
    if (!user) {
      return createErrorResponse('User not found')
    }
    return createSuccessResponse(user)
  },
}

// ============================================================================
// USERS API
// ============================================================================

export interface UserFilters {
  role?: string
  status?: string
  department?: string
  search?: string
}

export interface UserParams {
  query?: string
  filters?: UserFilters
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const usersApi = {
  /**
   * Get all users with filters and pagination
   */
  async getUsers(params: UserParams = {}): Promise<ApiResponse<PaginatedResponse<User>>> {
    await delay()

    // Convert team members to users
    let filteredUsers: User[] = MOCK_TEAM_MEMBERS.map(member => ({
      id: member.id,
      email: member.email,
      name: member.name,
      role: member.role as any,
      ...(member.avatar && { avatar: member.avatar }),
      phone: member.emergencyContact.phone,
      department: member.department,
      status: member.status,
      ...(member.lastLogin && { lastLogin: member.lastLogin }),
      createdAt: member.createdAt,
      updatedAt: member.createdAt, // Use createdAt as fallback
      isActive: member.status === 'active',
      permissions: member.permissions,
      preferences: {
        theme: 'light',
        language: 'en',
        timezone: member.workSchedule.timezone,
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
      },
    }))

    // Apply search filter
    if (params.query) {
      const searchTerm = params.query.toLowerCase()
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.department?.toLowerCase().includes(searchTerm)
      )
    }

    // Apply role filter
    if (params.filters?.role) {
      filteredUsers = filteredUsers.filter(user => user.role === params.filters?.role)
    }

    // Apply status filter
    if (params.filters?.status) {
      filteredUsers = filteredUsers.filter(user => user.status === params.filters?.status)
    }

    // Apply department filter
    if (params.filters?.department) {
      filteredUsers = filteredUsers.filter(user => user.department === params.filters?.department)
    }

    // Apply sorting
    if (params.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = (a as any)[params.sortBy!]
        const bValue = (b as any)[params.sortBy!]
        const order = params.sortOrder === 'desc' ? -1 : 1
        return aValue > bValue ? order : -order
      })
    }

    const paginatedResponse = createPaginatedResponse(
      filteredUsers,
      params.page || 1,
      params.limit || 10
    )

    return createSuccessResponse(paginatedResponse)
  },

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<ApiResponse<User>> {
    await delay()
    const user = getMockUserById(id)
    
    if (!user) {
      return createErrorResponse('User not found')
    }

    return createSuccessResponse(user)
  },

  /**
   * Create new user
   */
  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    await delay(800) // Longer delay for create operations

    // Simulate validation
    if (!userData.email || !userData.name) {
      return createErrorResponse('Validation failed', {
        email: userData.email ? [] : ['Email is required'],
        name: userData.name ? [] : ['Name is required'],
      })
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      email: userData.email,
      name: userData.name,
      role: userData.role || 'viewer',
      ...(userData.avatar && { avatar: userData.avatar }),
      ...(userData.phone && { phone: userData.phone }),
      ...(userData.department && { department: userData.department }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      status: 'active',
      permissions: [],
      preferences: {
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
      },
    }

    return createSuccessResponse(newUser, 'User created successfully')
  },

  /**
   * Update user
   */
  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    await delay(600)

    const existingUser = getMockUserById(id)
    if (!existingUser) {
      return createErrorResponse('User not found')
    }

    const updatedUser: User = {
      ...existingUser,
      ...userData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    return createSuccessResponse(updatedUser, 'User updated successfully')
  },

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<ApiResponse<null>> {
    await delay(400)

    const user = getMockUserById(id)
    if (!user) {
      return createErrorResponse('User not found')
    }

    return createSuccessResponse(null, 'User deleted successfully')
  },
}

// ============================================================================
// WALLETS API
// ============================================================================

export interface WalletFilters {
  network?: string
  currency?: string
  status?: string
  type?: string
  search?: string
}

export interface WalletParams {
  query?: string
  filters?: WalletFilters
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const walletsApi = {
  /**
   * Get all wallets with filters and pagination
   */
  async getWallets(params: WalletParams = {}): Promise<ApiResponse<PaginatedResponse<Wallet>>> {
    await delay()

    let filteredWallets = [...MOCK_WALLETS]

    // Apply search filter
    if (params.query) {
      const searchTerm = params.query.toLowerCase()
      filteredWallets = filteredWallets.filter(wallet => 
        wallet.name.toLowerCase().includes(searchTerm) ||
        wallet.address.toLowerCase().includes(searchTerm) ||
        wallet.currency.toLowerCase().includes(searchTerm)
      )
    }

    // Apply network filter
    if (params.filters?.network) {
      filteredWallets = filteredWallets.filter(wallet => wallet.network === params.filters?.network)
    }

    // Apply currency filter
    if (params.filters?.currency) {
      filteredWallets = filteredWallets.filter(wallet => wallet.currency === params.filters?.currency)
    }

    // Apply status filter
    if (params.filters?.status) {
      filteredWallets = filteredWallets.filter(wallet => wallet.status === params.filters?.status)
    }

    // Apply type filter
    if (params.filters?.type) {
      filteredWallets = filteredWallets.filter(wallet => wallet.type === params.filters?.type)
    }

    // Apply sorting
    if (params.sortBy) {
      filteredWallets.sort((a, b) => {
        const aValue = (a as any)[params.sortBy!]
        const bValue = (b as any)[params.sortBy!]
        const order = params.sortOrder === 'desc' ? -1 : 1
        return aValue > bValue ? order : -order
      })
    }

    const paginatedResponse = createPaginatedResponse(
      filteredWallets,
      params.page || 1,
      params.limit || 10
    )

    return createSuccessResponse(paginatedResponse)
  },

  /**
   * Get wallet by ID
   */
  async getWalletById(id: string): Promise<ApiResponse<Wallet>> {
    await delay()
    const wallet = getMockWalletById(id)
    
    if (!wallet) {
      return createErrorResponse('Wallet not found')
    }

    return createSuccessResponse(wallet)
  },

  /**
   * Get wallet balance
   */
  async getWalletBalance(id: string): Promise<ApiResponse<{ balance: number; usdValue: number }>> {
    await delay(200)
    const wallet = getMockWalletById(id)
    
    if (!wallet) {
      return createErrorResponse('Wallet not found')
    }

    return createSuccessResponse({
      balance: wallet.balance,
      usdValue: wallet.usdValue,
    })
  },

  /**
   * Get wallet transactions
   */
  async getWalletTransactions(
    id: string,
    params: SearchParams = {}
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    await delay()
    
    const wallet = getMockWalletById(id)
    if (!wallet) {
      return createErrorResponse('Wallet not found')
    }

    const transactions = getMockTransactionsByWallet(id)
    const paginatedResponse = createPaginatedResponse(
      transactions,
      params.page || 1,
      params.limit || 10
    )

    return createSuccessResponse(paginatedResponse)
  },

  /**
   * Create new wallet
   */
  async createWallet(walletData: Partial<Wallet>): Promise<ApiResponse<Wallet>> {
    await delay(1000) // Longer delay for wallet creation

    // Simulate validation
    if (!walletData.name || !walletData.network || !walletData.currency) {
      return createErrorResponse('Validation failed', {
        name: walletData.name ? [] : ['Name is required'],
        network: walletData.network ? [] : ['Network is required'],
        currency: walletData.currency ? [] : ['Currency is required'],
      })
    }

    const newWallet: Wallet = {
      id: 'wallet-' + Date.now(),
      name: walletData.name,
      address: '0x' + Math.random().toString(16).substr(2, 40), // Mock address
      network: walletData.network,
      currency: walletData.currency,
      balance: 0,
      usdValue: 0,
      status: 'active',
      type: walletData.type || 'hot',
      ...(walletData.description && { description: walletData.description }),
      ...(walletData.tags && { tags: walletData.tags }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      owner: 'user-1',
      approvers: ['user-1'],
      threshold: 1,
      isActive: true,
      metadata: {
        provider: 'internal',
        derivationPath: "m/44'/0'/0'/0/0",
        publicKey: '0x' + Math.random().toString(16).substr(2, 64),
      },
      transactions: 0,
      ...(walletData.qrCode && { qrCode: walletData.qrCode }),
    }

    return createSuccessResponse(newWallet, 'Wallet created successfully')
  },

  /**
   * Update wallet
   */
  async updateWallet(id: string, walletData: Partial<Wallet>): Promise<ApiResponse<Wallet>> {
    await delay(600)

    const existingWallet = getMockWalletById(id)
    if (!existingWallet) {
      return createErrorResponse('Wallet not found')
    }

    const updatedWallet: Wallet = {
      ...existingWallet,
      ...walletData,
      id, // Ensure ID doesn't change
      lastActivity: new Date().toISOString(),
    }

    return createSuccessResponse(updatedWallet, 'Wallet updated successfully')
  },

  /**
   * Delete wallet
   */
  async deleteWallet(id: string): Promise<ApiResponse<null>> {
    await delay(400)

    const wallet = getMockWalletById(id)
    if (!wallet) {
      return createErrorResponse('Wallet not found')
    }

    return createSuccessResponse(null, 'Wallet deleted successfully')
  },
}

// ============================================================================
// TRANSACTIONS API
// ============================================================================

export interface TransactionFilters {
  status?: string
  type?: string
  currency?: string
  walletId?: string
  priority?: string
  dateRange?: {
    from?: string
    to?: string
  }
  amountRange?: {
    min?: number
    max?: number
  }
  search?: string
}

export interface TransactionParams {
  query?: string
  filters?: TransactionFilters
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const transactionsApi = {
  /**
   * Get all transactions with filters and pagination
   */
  async getTransactions(params: TransactionParams = {}): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    await delay()

    let filteredTransactions = [...MOCK_TRANSACTIONS]

    // Apply search filter
    if (params.query) {
      const searchTerm = params.query.toLowerCase()
      filteredTransactions = filteredTransactions.filter(tx => 
        tx.id.toLowerCase().includes(searchTerm) ||
        tx.description?.toLowerCase().includes(searchTerm) ||
        tx.toAddress.toLowerCase().includes(searchTerm) ||
        tx.fromAddress?.toLowerCase().includes(searchTerm)
      )
    }

    // Apply status filter
    if (params.filters?.status) {
      filteredTransactions = filteredTransactions.filter(tx => tx.status === params.filters?.status)
    }

    // Apply type filter
    if (params.filters?.type) {
      filteredTransactions = filteredTransactions.filter(tx => tx.type === params.filters?.type)
    }

    // Apply currency filter
    if (params.filters?.currency) {
      filteredTransactions = filteredTransactions.filter(tx => tx.currency === params.filters?.currency)
    }

    // Apply wallet filter
    if (params.filters?.walletId) {
      filteredTransactions = filteredTransactions.filter(tx => 
        tx.fromWallet === params.filters?.walletId || tx.toWallet === params.filters?.walletId
      )
    }

    // Apply priority filter
    if (params.filters?.priority) {
      filteredTransactions = filteredTransactions.filter(tx => tx.priority === params.filters?.priority)
    }

    // Apply date range filter
    if (params.filters?.dateRange?.from || params.filters?.dateRange?.to) {
      filteredTransactions = filteredTransactions.filter(tx => {
        const txDate = new Date(tx.createdAt)
        const fromDate = params.filters?.dateRange?.from ? new Date(params.filters.dateRange.from) : null
        const toDate = params.filters?.dateRange?.to ? new Date(params.filters.dateRange.to) : null
        
        if (fromDate && txDate < fromDate) return false
        if (toDate && txDate > toDate) return false
        return true
      })
    }

    // Apply amount range filter
    if (params.filters?.amountRange?.min !== undefined || params.filters?.amountRange?.max !== undefined) {
      filteredTransactions = filteredTransactions.filter(tx => {
        const min = params.filters?.amountRange?.min
        const max = params.filters?.amountRange?.max
        
        if (min !== undefined && tx.amount < min) return false
        if (max !== undefined && tx.amount > max) return false
        return true
      })
    }

    // Apply sorting
    if (params.sortBy) {
      filteredTransactions.sort((a, b) => {
        const aValue = (a as any)[params.sortBy!]
        const bValue = (b as any)[params.sortBy!]
        const order = params.sortOrder === 'desc' ? -1 : 1
        return aValue > bValue ? order : -order
      })
    }

    const paginatedResponse = createPaginatedResponse(
      filteredTransactions,
      params.page || 1,
      params.limit || 10
    )

    return createSuccessResponse(paginatedResponse)
  },

  /**
   * Get transaction by ID
   */
  async getTransactionById(id: string): Promise<ApiResponse<Transaction>> {
    await delay()
    const transaction = getMockTransactionById(id)
    
    if (!transaction) {
      return createErrorResponse('Transaction not found')
    }

    return createSuccessResponse(transaction)
  },

  /**
   * Get pending transactions
   */
  async getPendingTransactions(params: SearchParams = {}): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    await delay()
    
    const pendingTransactions = getMockPendingTransactions()
    const paginatedResponse = createPaginatedResponse(
      pendingTransactions,
      params.page || 1,
      params.limit || 10
    )

    return createSuccessResponse(paginatedResponse)
  },

  /**
   * Create new transaction
   */
  async createTransaction(transactionData: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    await delay(800)

    // Simulate validation
    if (!transactionData.amount || !transactionData.toAddress || !transactionData.currency) {
      return createErrorResponse('Validation failed', {
        amount: transactionData.amount ? [] : ['Amount is required'],
        toAddress: transactionData.toAddress ? [] : ['Destination address is required'],
        currency: transactionData.currency ? [] : ['Currency is required'],
      })
    }

    const newTransaction: Transaction = {
      id: 'tx-' + Date.now(),
      type: transactionData.type || 'send',
      status: 'pending',
      amount: transactionData.amount,
      currency: transactionData.currency,
      usdValue: transactionData.amount * 65000, // Mock USD conversion
      ...(transactionData.fromWallet && { fromWallet: transactionData.fromWallet }),
      ...(transactionData.fromAddress && { fromAddress: transactionData.fromAddress }),
      ...(transactionData.toWallet && { toWallet: transactionData.toWallet }),
      toAddress: transactionData.toAddress!,
      fee: transactionData.fee || 0.001,
      feeUsd: (transactionData.fee || 0.001) * 65000,
      txHash: '',
      blockHeight: null,
      confirmations: 0,
      requiredApprovals: transactionData.requiredApprovals || 2,
      currentApprovals: 0,
      approvers: [],
      createdBy: transactionData.createdBy || 'current-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(transactionData.description && { description: transactionData.description }),
      tags: transactionData.tags || [],
      priority: transactionData.priority || 'medium',
    }

    return createSuccessResponse(newTransaction, 'Transaction created successfully')
  },

  /**
   * Approve transaction
   */
  async approveTransaction(
    id: string,
    approval: { comment?: string }
  ): Promise<ApiResponse<Transaction>> {
    await delay(600)

    const transaction = getMockTransactionById(id)
    if (!transaction) {
      return createErrorResponse('Transaction not found')
    }

    if (transaction.status !== 'pending') {
      return createErrorResponse('Transaction is not pending approval')
    }

    // Simulate approval logic
    console.log('Approval comment:', approval.comment) // Use the approval parameter
    const updatedTransaction: Transaction = {
      ...transaction,
      currentApprovals: transaction.currentApprovals + 1,
      status: transaction.currentApprovals + 1 >= transaction.requiredApprovals ? 'approved' : 'pending',
      updatedAt: new Date().toISOString(),
    }

    return createSuccessResponse(updatedTransaction, 'Transaction approved successfully')
  },

  /**
   * Reject transaction
   */
  async rejectTransaction(
    id: string,
    rejection: { comment: string }
  ): Promise<ApiResponse<Transaction>> {
    await delay(600)

    const transaction = getMockTransactionById(id)
    if (!transaction) {
      return createErrorResponse('Transaction not found')
    }

    if (transaction.status !== 'pending') {
      return createErrorResponse('Transaction is not pending approval')
    }

    // Use the rejection parameter
    console.log('Rejection comment:', rejection.comment)
    const updatedTransaction: Transaction = {
      ...transaction,
      status: 'rejected',
      updatedAt: new Date().toISOString(),
    }

    return createSuccessResponse(updatedTransaction, 'Transaction rejected successfully')
  },

  /**
   * Execute transaction
   */
  async executeTransaction(id: string): Promise<ApiResponse<Transaction>> {
    await delay(1200) // Longer delay for execution

    const transaction = getMockTransactionById(id)
    if (!transaction) {
      return createErrorResponse('Transaction not found')
    }

    if (transaction.status !== 'approved') {
      return createErrorResponse('Transaction is not approved for execution')
    }

    const updatedTransaction: Transaction = {
      ...transaction,
      status: 'completed',
      txHash: '0x' + Math.random().toString(16).substr(2, 64),
      blockHeight: Math.floor(Math.random() * 1000000) + 19000000,
      confirmations: 1,
      updatedAt: new Date().toISOString(),
    }

    return createSuccessResponse(updatedTransaction, 'Transaction executed successfully')
  },
}

// ============================================================================
// DASHBOARD API
// ============================================================================

export const dashboardApi = {
  /**
   * Get dashboard analytics
   */
  async getAnalytics(): Promise<ApiResponse<typeof MOCK_ANALYTICS>> {
    await delay()
    return createSuccessResponse(MOCK_ANALYTICS)
  },

  /**
   * Get dashboard stats
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    await delay()
    
    const stats: DashboardStats = {
      totalCases: MOCK_WALLETS.length,
      activeCases: MOCK_WALLETS.filter(w => w.status === 'active').length,
      pendingCases: getMockPendingTransactions().length,
      closedCases: MOCK_TRANSACTIONS.filter(t => t.status === 'completed').length,
      highPriorityCases: MOCK_TRANSACTIONS.filter(t => t.priority === 'high').length,
      recentActivity: MOCK_ANALYTICS.recentActivity,
    }

    return createSuccessResponse(stats)
  },

  /**
   * Get recent activity
   */
  async getRecentActivity(limit: number = 10): Promise<ApiResponse<ActivityItem[]>> {
    await delay(200)
    return createSuccessResponse(MOCK_ANALYTICS.recentActivity.slice(0, limit))
  },
}

// ============================================================================
// NOTIFICATIONS API
// ============================================================================

export const notificationsApi = {
  /**
   * Get user notifications
   */
  async getNotifications(params: SearchParams = {}): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    await delay()
    
    const paginatedResponse = createPaginatedResponse(
      MOCK_NOTIFICATIONS,
      params.page || 1,
      params.limit || 10
    )

    return createSuccessResponse(paginatedResponse)
  },

  /**
   * Mark notification as read
   */
  async markAsRead(_id: string): Promise<ApiResponse<null>> {
    await delay(200)
    return createSuccessResponse(null, 'Notification marked as read')
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<ApiResponse<null>> {
    await delay(300)
    return createSuccessResponse(null, 'All notifications marked as read')
  },

  /**
   * Delete notification
   */
  async deleteNotification(_id: string): Promise<ApiResponse<null>> {
    await delay(200)
    return createSuccessResponse(null, 'Notification deleted')
  },
}

// ============================================================================
// SECURITY API
// ============================================================================

export const securityApi = {
  /**
   * Get security settings
   */
  async getSecuritySettings(): Promise<ApiResponse<SecuritySettings>> {
    await delay()
    return createSuccessResponse(MOCK_SECURITY_SETTINGS)
  },

  /**
   * Update security settings
   */
  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<ApiResponse<SecuritySettings>> {
    await delay(600)
    
    const updatedSettings = {
      ...MOCK_SECURITY_SETTINGS,
      ...settings,
    }

    return createSuccessResponse(updatedSettings, 'Security settings updated successfully')
  },

  /**
   * Enable 2FA
   */
  async enable2FA(): Promise<ApiResponse<{ qrCode: string; backupCodes: string[] }>> {
    await delay(800)
    
    return createSuccessResponse({
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PC9zdmc+',
      backupCodes: [
        '123456789',
        '987654321',
        '456789123',
        '789123456',
        '321654987',
        '654987321',
        '147258369',
        '963852741',
      ],
    })
  },

  /**
   * Disable 2FA
   */
  async disable2FA(): Promise<ApiResponse<null>> {
    await delay(400)
    return createSuccessResponse(null, '2FA disabled successfully')
  },

  /**
   * Create API key
   */
  async createApiKey(_data: { name: string; permissions: string[] }): Promise<ApiResponse<{ key: string; id: string }>> {
    await delay(600)
    
    return createSuccessResponse({
      id: 'api-' + Date.now(),
      key: 'ak_live_' + Math.random().toString(36).substr(2, 32),
    }, 'API key created successfully')
  },

  /**
   * Revoke API key
   */
  async revokeApiKey(_id: string): Promise<ApiResponse<null>> {
    await delay(300)
    return createSuccessResponse(null, 'API key revoked successfully')
  },

  /**
   * Get audit logs
   */
  async getAuditLogs(params: SearchParams = {}): Promise<ApiResponse<PaginatedResponse<any>>> {
    await delay()
    
    const paginatedResponse = createPaginatedResponse(
      [...MOCK_SECURITY_SETTINGS.auditLogs],
      params.page || 1,
      params.limit || 20
    )

    return createSuccessResponse(paginatedResponse)
  },
}

// ============================================================================
// REPORTS API
// ============================================================================

export const reportsApi = {
  /**
   * Get all reports
   */
  async getReports(params: SearchParams = {}): Promise<ApiResponse<PaginatedResponse<Report>>> {
    await delay()
    
    const paginatedResponse = createPaginatedResponse(
      MOCK_REPORTS,
      params.page || 1,
      params.limit || 10
    )

    return createSuccessResponse(paginatedResponse)
  },

  /**
   * Generate report
   */
  async generateReport(type: string, _params: any): Promise<ApiResponse<Report>> {
    await delay(2000) // Longer delay for report generation
    
    const newReport: Report = {
      id: 'report-' + Date.now(),
      name: `${type} Report`,
      description: `Generated ${type} report`,
      type,
      status: 'completed',
      generatedAt: new Date().toISOString(),
      size: '1.2 MB',
      format: 'PDF',
    }

    return createSuccessResponse(newReport, 'Report generated successfully')
  },

  /**
   * Download report
   */
  async downloadReport(id: string): Promise<ApiResponse<{ downloadUrl: string }>> {
    await delay(500)
    
    return createSuccessResponse({
      downloadUrl: `/api/reports/${id}/download`,
    })
  },
}

// ============================================================================
// SETTINGS API
// ============================================================================

export const settingsApi = {
  /**
   * Get system settings
   */
  async getSystemSettings(): Promise<ApiResponse<typeof MOCK_SYSTEM_SETTINGS>> {
    await delay()
    return createSuccessResponse(MOCK_SYSTEM_SETTINGS)
  },

  /**
   * Update system settings
   */
  async updateSystemSettings(settings: Partial<typeof MOCK_SYSTEM_SETTINGS>): Promise<ApiResponse<typeof MOCK_SYSTEM_SETTINGS>> {
    await delay(600)
    
    const updatedSettings = {
      ...MOCK_SYSTEM_SETTINGS,
      ...settings,
    }

    return createSuccessResponse(updatedSettings, 'System settings updated successfully')
  },

  /**
   * Get approval workflows
   */
  async getApprovalWorkflows(): Promise<ApiResponse<ApprovalWorkflow[]>> {
    await delay()
    return createSuccessResponse(MOCK_APPROVAL_WORKFLOWS)
  },

  /**
   * Create approval workflow
   */
  async createApprovalWorkflow(workflow: Partial<ApprovalWorkflow>): Promise<ApiResponse<ApprovalWorkflow>> {
    await delay(800)
    
    const newWorkflow: ApprovalWorkflow = {
      id: 'workflow-' + Date.now(),
      name: workflow.name || 'New Workflow',
      description: workflow.description || '',
      rules: workflow.rules || [],
      isActive: workflow.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return createSuccessResponse(newWorkflow, 'Approval workflow created successfully')
  },

  /**
   * Update approval workflow
   */
  async updateApprovalWorkflow(id: string, workflow: Partial<ApprovalWorkflow>): Promise<ApiResponse<ApprovalWorkflow>> {
    await delay(600)
    
    const existingWorkflow = MOCK_APPROVAL_WORKFLOWS.find(w => w.id === id)
    if (!existingWorkflow) {
      return createErrorResponse('Workflow not found')
    }

    const updatedWorkflow: ApprovalWorkflow = {
      ...existingWorkflow,
      ...workflow,
      id,
      updatedAt: new Date().toISOString(),
    }

    return createSuccessResponse(updatedWorkflow, 'Approval workflow updated successfully')
  },

  /**
   * Delete approval workflow
   */
  async deleteApprovalWorkflow(_id: string): Promise<ApiResponse<null>> {
    await delay(400)
    return createSuccessResponse(null, 'Approval workflow deleted successfully')
  },
}

// ============================================================================
// EXPORT ALL APIs
// ============================================================================

export const mockApi = {
  auth: authApi,
  users: usersApi,
  wallets: walletsApi,
  transactions: transactionsApi,
  dashboard: dashboardApi,
  notifications: notificationsApi,
  security: securityApi,
  reports: reportsApi,
  settings: settingsApi,
}

export default mockApi