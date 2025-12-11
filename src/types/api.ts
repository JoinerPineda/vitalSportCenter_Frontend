// API Response Types
export interface ApiResponse<T> {
  success?: boolean
  data?: T
  message?: string
  error?: string
}

// User Types
export interface User {
  id?: string
  _id?: string
  name: string
  email: string
  phone: string
  role: 'client' | 'admin'
  profilePicture?: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
}

export interface AuthResponse {
  message?: string
  token: string
  user: User
}

// Court Types
export type SportType = 'Fútbol' | 'Tenis' | 'Baloncesto' | 'Vóleibol' | 'Pádel'

export interface Court {
  id?: string
  _id?: string
  name: string
  sport: SportType
  location: string
  price: number
  capacity: number
  description: string
  image: string
  amenities: string[]
  rating?: number
  totalReviews?: number
  isAvailable: boolean
  admin?: string | User
  createdAt?: string
  updatedAt?: string
}

export interface CourtsResponse {
  courts: Court[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type PaymentMethod = 'card' | 'pse' | 'nequi'

export interface Booking {
  id?: string
  _id?: string
  user: string | User
  court: string | Court
  date: string
  startTime: string
  endTime: string
  duration: number
  totalPrice: number
  serviceFee: number
  status: BookingStatus
  paymentMethod: PaymentMethod
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateBookingDto {
  court: string
  date: string
  startTime: string
  duration: number
  paymentMethod: PaymentMethod
  price?: number
  notes?: string
}

export interface BookingsResponse {
  bookings: Booking[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Admin Stats Types
export interface AdminStats {
  totalRevenue: number
  totalBookings: number
  totalUsers: number
  occupancyRate: number
}

export interface RevenueData {
  month: string
  ingresos: number
}

export interface BookingBySport {
  name: string
  value: number
}

export interface OccupancyData {
  day: string
  ocupacion: number
}

export interface TopCourt {
  name: string
  bookings: number
  revenue: number
}
