'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface LoadingContextType {
  isLoading: boolean
  show: (message?: string) => void
  hide: () => void
}

const LoadingContext = createContext<LoadingContextType | null>(null)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const show = useCallback((msg = '') => {
    setMessage(msg)
    setIsLoading(true)
  }, [])

  const hide = useCallback(() => {
    setIsLoading(false)
    setMessage('')
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, show, hide }}>
      {children}
      {isLoading && <LoadingOverlay message={message} />}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useLoading must be used inside LoadingProvider')
  return ctx
}

function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        {message && (
          <p className="text-sm text-zinc-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-zinc-800 animate-spin" />
  )
}