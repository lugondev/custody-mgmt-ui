'use client'

import { useState, useEffect, useCallback } from 'react'
import { User, AuthState } from '@/types'
import { getAuthToken, getStoredUser, setStoredUser, removeAuthToken, removeStoredUser, isTokenExpired } from '@/lib/auth'
import { apiClient } from '@/lib/api'

/**
 * Custom hook for authentication management
 * Provides authentication state and methods
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  /**
   * Initialize authentication state on mount
   */
  useEffect(() => {
    initializeAuth()
  }, [])

  /**
   * Initialize authentication state from stored data
   */
  const initializeAuth = useCallback(async () => {
    try {
      const token = getAuthToken()
      const storedUser = getStoredUser()

      if (!token || !storedUser) {
        setAuthState(prev => ({ ...prev, isLoading: false }))
        return
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        await logout()
        return
      }

      // Verify token with server
      const user = await apiClient.get<User>('/auth/me')
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      await logout()
    }
  }, [])

  /**
   * Login user with email and password
   * @param email - User email
   * @param password - User password
   * @returns Promise with login result
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await apiClient.post<{ user: User; token: string }>('/auth/login', {
        email,
        password,
      })

      const { user, token } = response

      // Store auth data
      localStorage.setItem('auth_token', token)
      setStoredUser(user)

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      return { success: true, user }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Register new user
   * @param userData - User registration data
   * @returns Promise with registration result
   */
  const register = useCallback(async (userData: {
    name: string
    email: string
    password: string
  }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await apiClient.post<{ user: User; token: string }>('/auth/register', userData)
      const { user, token } = response

      // Store auth data
      localStorage.setItem('auth_token', token)
      setStoredUser(user)

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      return { success: true, user }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Logout user and clear auth data
   */
  const logout = useCallback(async () => {
    try {
      // Call logout endpoint if authenticated
      if (authState.isAuthenticated) {
        await apiClient.post('/auth/logout')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage
      removeAuthToken()
      removeStoredUser()

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    }
  }, [authState.isAuthenticated])

  /**
   * Update user profile
   * @param userData - Updated user data
   * @returns Promise with update result
   */
  const updateProfile = useCallback(async (userData: Partial<User>) => {
    try {
      const updatedUser = await apiClient.put<User>('/users/profile', userData)
      
      setStoredUser(updatedUser)
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }))

      return { success: true, user: updatedUser }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Profile update failed'
      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Change user password
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @returns Promise with change result
   */
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      await apiClient.post('/users/change-password', {
        currentPassword,
        newPassword,
      })

      return { success: true }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password change failed'
      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Request password reset
   * @param email - User email
   * @returns Promise with request result
   */
  const forgotPassword = useCallback(async (email: string) => {
    try {
      await apiClient.post('/auth/forgot-password', { email })
      return { success: true }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password reset request failed'
      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Reset password with token
   * @param token - Reset token
   * @param newPassword - New password
   * @returns Promise with reset result
   */
  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    try {
      await apiClient.post('/auth/reset-password', { token, password: newPassword })
      return { success: true }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password reset failed'
      return { success: false, error: errorMessage }
    }
  }, [])

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshAuth: initializeAuth,
  }
}