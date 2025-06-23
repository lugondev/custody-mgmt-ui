import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * API client configuration using Axios
 * Provides centralized HTTP client with interceptors
 */
class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.handleUnauthorized()
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * Get authentication token from storage
   * @returns Auth token or null
   */
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  /**
   * Handle unauthorized access
   */
  private handleUnauthorized(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
  }

  /**
   * GET request
   * @param url - Request URL
   * @param config - Axios config
   * @returns Promise with response data
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  /**
   * POST request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Axios config
   * @returns Promise with response data
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  /**
   * PUT request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Axios config
   * @returns Promise with response data
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  /**
   * DELETE request
   * @param url - Request URL
   * @param config - Axios config
   * @returns Promise with response data
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
export default apiClient