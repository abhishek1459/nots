import { useState } from 'react'
import { signIn, signUp } from '../services/auth'

interface LoginProps {
  onAuthSuccess: (isSetup: boolean) => void
}

export function Login({ onAuthSuccess }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'signing-in' | 'setting-up'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setStatus('signing-in')

    try {
      await signIn(username, password)
      onAuthSuccess(false)
      return
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      if (msg.includes('Invalid login credentials')) {
        setStatus('setting-up')
        try {
          await signUp(username, password)
          await signIn(username, password)
          onAuthSuccess(true)
          return
        } catch (signUpErr: unknown) {
          const signUpMsg = signUpErr instanceof Error ? signUpErr.message : 'Setup failed'
          setError(signUpMsg)
        }
      } else {
        setError(msg || 'Login failed')
      }
    } finally {
      setLoading(false)
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">NOTS</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
            Personal Notes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 sm:py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-base sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 sm:py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-base sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white text-base sm:text-sm font-medium rounded-lg transition-colors active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {status === 'setting-up' ? 'Setting up...' : 'Signing in...'}
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          {status === 'setting-up' && (
            <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
              Admin account not found. Setting up for the first time...
            </p>
          )}
        </form>

        <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center mt-6">
          Secure personal notes app
        </p>
      </div>
    </div>
  )
}
