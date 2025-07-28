import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get the token
  const token = await getToken({ req: request })
  
  // Redirect /auth/signin and /auth/signup to /auth
  if (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup')) {
    const mode = pathname.includes('signup') ? '?mode=signup' : ''
    return NextResponse.redirect(new URL(`/auth${mode}`, request.url))
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }

  // Redirect authenticated users trying to access auth pages to dashboard
  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/auth']
}
