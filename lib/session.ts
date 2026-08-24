const SESSION_COOKIE = 'studybuddy_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

function getSecret(): string {
  return process.env.AUTH_SECRET || 'studybuddy-local-dev-secret-change-me'
}

function toBase64Url(value: string): string {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  return atob(padded + '='.repeat((4 - (padded.length % 4)) % 4))
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  let binary = ''
  for (const byte of new Uint8Array(signature)) binary += String.fromCharCode(byte)
  return toBase64Url(binary)
}

export async function createSession(studentId: string): Promise<string> {
  const payload = toBase64Url(JSON.stringify({
    studentId,
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  }))
  return `${payload}.${await sign(payload)}`
}

export async function readSession(value: string | undefined): Promise<{ studentId: string } | null> {
  if (!value) return null
  const [payload, signature] = value.split('.')
  if (!payload || !signature || signature !== await sign(payload)) return null

  try {
    const parsed = JSON.parse(fromBase64Url(payload)) as { studentId?: string; expiresAt?: number }
    if (!parsed.studentId || !parsed.expiresAt || parsed.expiresAt < Date.now()) return null
    return { studentId: parsed.studentId }
  } catch {
    return null
  }
}

export { SESSION_COOKIE, SESSION_TTL_SECONDS }