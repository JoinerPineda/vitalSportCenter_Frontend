// Autenticación API
import { apiClient } from './client'
import { AuthResponse, User } from '../types/api'

export const authApi = {
  async register(data: {
    name: string
    email: string
    password: string
  }): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data)
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', data)
  },

  async getCurrentUser(): Promise<{ user: User }> {
    return apiClient.get<{ user: User }>('/auth/me')
  },
}
