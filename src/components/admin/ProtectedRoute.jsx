import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentSession, checkAdminStatus } from '../../services/adminService'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const session = await getCurrentSession()
      if (!session) {
        setIsAuthorized(false)
        setLoading(false)
        return
      }

      const isAdmin = await checkAdminStatus(session.user.id)
      setIsAuthorized(isAdmin)
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthorized(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return isAuthorized ? children : <Navigate to="/admin/login" replace />
}
