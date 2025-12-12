// Usuarios API (Admin)
import { apiClient } from './client'
import { User } from '../types/api'

export const usersApi = {
  async getAll(): Promise<User[]> {
    return apiClient.get<User[]>('/users')
  },

  async getById(id: string): Promise<User> {
    return apiClient.get<User>(`/users/${id}`)
  },

  async create(data: {
    name: string
    email: string
    password: string
    phone?: string
    role?: 'client' | 'admin'
  }): Promise<User> {
    return apiClient.post<User>('/users', data)
  },

  async update(id: string, data: Partial<{
    name: string
    email: string
    phone: string
    role: 'client' | 'admin'
    isActive: boolean
  }>): Promise<User> {
    return apiClient.put<User>(`/users/${id}`, data)
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/users/${id}`)
  },
}
