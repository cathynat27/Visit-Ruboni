import { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

export { AuthContext }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize user from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem("user")
      const savedToken = localStorage.getItem("token")
      
      if (savedUser && savedToken) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Failed to parse saved user:", error)
          localStorage.removeItem("user")
          localStorage.removeItem("token")
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
