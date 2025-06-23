/**
 * Authentication utility functions
 * Handles token management and user authentication state
 */

import type { User, UserRole } from '@/types'

export type { User }

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

/**
 * Get authentication token from localStorage
 * @returns Auth token or null
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

/**
 * Set authentication token in localStorage
 * @param token - JWT token to store
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

/**
 * Remove authentication token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

/**
 * Get user data from localStorage
 * @returns User object or null
 */
export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user_data')
    return userData ? JSON.parse(userData) : null
  }
  return null
}

/**
 * Set user data in localStorage
 * @param user - User object to store
 */
export function setStoredUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_data', JSON.stringify(user))
  }
}

/**
 * Remove user data from localStorage
 */
export function removeStoredUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_data')
  }
}

/**
 * Check if user is authenticated
 * @returns Boolean indicating authentication status
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken()
  const user = getStoredUser()
  return !!(token && user)
}

/**
 * Decode JWT token (basic implementation)
 * @param token - JWT token to decode
 * @returns Decoded token payload or null
 */
export function decodeToken(token: string): any | null {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Check if token is expired
 * @param token - JWT token to check
 * @returns Boolean indicating if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) {
    return true
  }
  
  const currentTime = Date.now() / 1000
  return decoded.exp < currentTime
}

/**
 * Logout user by clearing all stored data
 */
export function logout(): void {
  removeAuthToken()
  removeStoredUser()
  
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

/**
 * Check user permissions
 * @param user - User object
 * @param requiredRole - Required role for access
 * @returns Boolean indicating if user has required permissions
 */
export function hasPermission(user: User | null, requiredRole: User['role']): boolean {
  if (!user) return false
  
  const roleHierarchy: Record<UserRole, number> = {
    viewer: 1,
    officer: 2,
    manager: 3,
    admin: 4,
  }
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
}