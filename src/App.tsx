import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { useState, useEffect } from 'react'
import { getCurrentUser } from './services/auth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')

  useEffect(() => {
    getCurrentUser().then((user) => {
      setAuthState(user ? 'authenticated' : 'unauthenticated')
    })
  }, [])

  if (authState === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (authState === 'unauthenticated') {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function LoginPage() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        navigate('/', { replace: true })
      }
      setChecking(false)
    })
  }, [navigate])

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  return <Login onAuthSuccess={() => navigate('/', { replace: true })} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
