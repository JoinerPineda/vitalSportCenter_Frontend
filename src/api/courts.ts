// Canchas API
import { apiClient } from './client'
import { Court, CourtsResponse } from '../types/api'

export const courtsApi = {
  async getAll(filters?: {
    sport?: string
    location?: string
    page?: number
    limit?: number
  }): Promise<CourtsResponse> {
    const params = new URLSearchParams()
    if (filters?.sport) params.append('sport', filters.sport)
    if (filters?.location) params.append('location', filters.location)
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))

    const query = params.toString()
    return apiClient.get<CourtsResponse>(`/courts${query ? '?' + query : ''}`)
  },

  async getById(id: string): Promise<{ court: Court; availableSlots?: any[] }> {
    return apiClient.get(`/courts/${id}`)
  },

  async create(data: any): Promise<{ court: Court }> {
    return apiClient.post<{ court: Court }>('/courts', data)
  },

  async update(id: string, data: any): Promise<{ court: Court }> {
    return apiClient.put<{ court: Court }>(`/courts/${id}`, data)
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/courts/${id}`)
  },
}
