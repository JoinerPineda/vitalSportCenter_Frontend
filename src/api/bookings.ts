// Reservas API
import { apiClient } from './client'
import { Booking, BookingsResponse, CreateBookingDto } from '../types/api'

export const bookingsApi = {
  async create(data: CreateBookingDto): Promise<{ booking: Booking }> {
    return apiClient.post<{ booking: Booking }>('/bookings', data)
  },

  async getMyBookings(filters?: {
    status?: string
    page?: number
    limit?: number
  }): Promise<BookingsResponse> {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))

    const query = params.toString()
    return apiClient.get<BookingsResponse>(
      `/bookings/my-bookings${query ? '?' + query : ''}`
    )
  },

  async getById(id: string): Promise<{ booking: Booking }> {
    return apiClient.get<{ booking: Booking }>(`/bookings/${id}`)
  },

  async updateStatus(id: string, status: string): Promise<{ booking: Booking }> {
    return apiClient.patch<{ booking: Booking }>(`/bookings/${id}/status`, {
      status,
    })
  },

  async cancel(id: string): Promise<{ booking: Booking }> {
    return apiClient.delete<{ booking: Booking }>(`/bookings/${id}`)
  },

  async getAll(filters?: {
    status?: string
    page?: number
    limit?: number
  }): Promise<BookingsResponse> {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))

    const query = params.toString()
    return apiClient.get<BookingsResponse>(
      `/bookings/all${query ? '?' + query : ''}`
    )
  },
}
