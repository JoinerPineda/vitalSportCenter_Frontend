// Admin API
import { apiClient } from './client'
import { AdminStats, RevenueData, BookingBySport, OccupancyData, TopCourt } from '../types/api'

export const adminApi = {
  async getStats(): Promise<{ data: AdminStats }> {
    return apiClient.get<{ data: AdminStats }>('/admin/stats')
  },

  async getMonthlyRevenue(): Promise<{ data: RevenueData[] }> {
    return apiClient.get<{ data: RevenueData[] }>('/admin/revenue/monthly')
  },

  async getBookingsBySport(): Promise<{ data: BookingBySport[] }> {
    return apiClient.get<{ data: BookingBySport[] }>('/admin/bookings/by-sport')
  },

  async getOccupancyByDay(): Promise<{ data: OccupancyData[] }> {
    return apiClient.get<{ data: OccupancyData[] }>('/admin/occupancy/by-day')
  },

  async getTopCourts(): Promise<{ data: TopCourt[] }> {
    return apiClient.get<{ data: TopCourt[] }>('/admin/top-courts')
  },
}
