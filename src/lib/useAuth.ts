import { useSession } from '@/lib/auth-client'

type UserWithRole = {
  role?: string
  id: string
  name: string
  email: string
  image?: string | null
}

export function useAuth() {
  const { data: session, isPending } = useSession()

  const user = (session?.user ?? null) as UserWithRole | null

  return {
    user,
    isPending,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin',
  }
}