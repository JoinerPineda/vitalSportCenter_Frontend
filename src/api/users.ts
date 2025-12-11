// Usuarios API (Admin)
import { apiClient } from './client'
import { User } from '../types/api'

export const usersApi = {
  async getAll(filters?: {
    search?: string
    role?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<{ users: User[]; pagination: any }> {
    const params = new URLSearchParams()
    if (filters?.search) params.append('search', filters.search)
    if (filters?.role) params.append('role', filters.role)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))

    const query = params.toString()
    return apiClient.get<{ users: User[]; pagination: any }>(
      `/users${query ? '?' + query : ''}`
    )
  },

  async getById(id: string): Promise<{ user: User }> {
    return apiClient.get<{ user: User }>(`/users/${id}`)
  },

  async update(id: string, data: any): Promise<{ user: User }> {
    return apiClient.put<{ user: User }>(`/users/${id}`, data)
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/users/${id}`)
  },
}
