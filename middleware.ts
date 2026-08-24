import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { readSession, SESSION_COOKIE } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value)
  if (session) return NextResponse.next()

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding/:path*', '/revision/:path*', '/learn/:path*', '/study-mvp/:path*', '/past-paper/:path*', '/settings/:path*'],
}