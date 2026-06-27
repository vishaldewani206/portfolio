import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const PUBLIC_ROUTES = ['/', '/blog', '/login']
const ADMIN_ROUTES = ['/dashboard']

function isPublic(pathname: string) {
  // / and /blog and /blog/[id] are all public
  return (
    pathname === '/' ||
    pathname.startsWith('/blog')
  )
}

function isAdminRoute(pathname: string) {
  return ADMIN_ROUTES.some((r) => pathname.startsWith(r))
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // public routes — let through immediately, no session check needed
  if (isPublic(pathname)) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: req.headers,
  })

  const isAuthPage = pathname.startsWith('/login')

  // already logged in, trying to access login → send home
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // not logged in, trying to access protected route → login with ?from
  if (!isAuthPage && !session) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // logged in but not admin, trying to access dashboard → 404
  if (isAdminRoute(pathname) && session?.user?.role !== 'admin') {
    return NextResponse.rewrite(new URL('/not-found', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    // explicitly exclude public routes from matcher for performance
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}