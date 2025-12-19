import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/useAuth"

export default function ProtectedRoute({ element }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return element
}
