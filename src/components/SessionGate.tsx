'use client'

import { useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { useLoading } from '@/lib/loading'

export function SessionGate({ children }: { children: React.ReactNode }) {
  const { isPending } = useSession()
  const { show, hide } = useLoading()

  useEffect(() => {
    if (isPending) {
      show() // no message — just spinner
    } else {
      hide()
    }
  }, [isPending])

  // don't render children until session is resolved
  if (isPending) return null

  return <>{children}</>
}