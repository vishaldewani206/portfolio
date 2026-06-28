import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

type Role = 'user' | 'admin'

type SessionUser = {
  id: string
  name: string
  email: string
  image?: string | null
  role?: Role
}

type AuthResult =
  | { success: true; user: SessionUser }
  | { success: false; response: NextResponse }

export async function requireAuth(requiredRole?: Role): Promise<AuthResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // not logged in
  if (!session?.user) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ),
    }
  }

  const user = session.user as SessionUser

  // logged in but wrong role
  if (requiredRole && user.role !== requiredRole) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      ),
    }
  }

  return { success: true, user }
}