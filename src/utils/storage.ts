// Almacenamiento de autenticación en localStorage
const AUTH_TOKEN_KEY = 'auth_token'
const USER_KEY = 'user_data'

export const storageHelper = {
  // Token
  setToken: (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },

  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  removeToken: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  },

  // User Data
  setUser: (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser: () => {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY)
  },

  // Clear All
  clearAll: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  },

  // Get user role
  getUserRole: () => {
    const user = storageHelper.getUser()
    return user?.role || null
  },

  // Check if admin
  isAdmin: () => {
    return storageHelper.getUserRole() === 'admin'
  }
}
