import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  // pass the server auth type so the client knows about role
  fetchOptions: {},
} satisfies Parameters<typeof createAuthClient>[0])

// re-export with inferred types from server auth
export const { signIn, signOut, useSession } = authClient