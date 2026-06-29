'use client'

import { signIn } from '@/lib/auth-client'
import { useLoading } from '@/lib/loading'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const {show, hide} = useLoading()

  const handleGoogle = async () => {
    setLoading(true)
    show('Redirecting to Google...')
    await signIn.social({
      provider: 'google',
      callbackURL: '/blog',
    })
    hide()
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm px-6">

        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-bold text-zinc-900 mb-2">
            Welcome back
          </h1>
          <p className="text-zinc-500 text-sm">
            Sign in to continue writing
          </p>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-zinc-200 rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Google SVG icon */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <p className="text-center text-xs text-zinc-400 mt-8">
          By continuing you agree to our terms of service
        </p>
      </div>
    </div>
  )
}