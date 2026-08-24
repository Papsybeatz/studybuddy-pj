import { NextResponse } from 'next/server'
import { authenticate } from '@/services/auth'
import { createSession, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/session'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { studentID?: string; pin?: string }
  const result = await authenticate({ studentID: body.studentID || '', pin: body.pin || '' })

  if (!result.success || !result.student) {
    return NextResponse.json({ error: result.error || 'Authentication failed' }, { status: 401 })
  }

  const response = NextResponse.json({ student: result.student })
  response.cookies.set(SESSION_COOKIE, await createSession(result.student.id), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
  return response
}