import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types/api'
import { storageHelper } from '../utils/storage'
import { authApi } from '../api/auth'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<User | null>
  register: (name: string, email: string, password: string) => Promise<User | null>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Inicializar desde localStorage
  useEffect(() => {
    const storedUser = storageHelper.getUser()
    const storedToken = storageHelper.getToken()

    if (storedUser && storedToken) {
      setUser(storedUser)
      setToken(storedToken)
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await authApi.login({ email, password })

      storageHelper.setToken(response.token)
      storageHelper.setUser(response.user)

      setToken(response.token)
      setUser(response.user)

      return response.user
    } catch (err: any) {
      const message = err.message || 'Error al iniciar sesión'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await authApi.register({ name, email, password })

      storageHelper.setToken(response.token)
      storageHelper.setUser(response.user)

      setToken(response.token)
      setUser(response.user)

      return response.user
    } catch (err: any) {
      const message = err.message || 'Error al registrar'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    storageHelper.clearAll()
    setUser(null)
    setToken(null)
    setError(null)
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin',
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
