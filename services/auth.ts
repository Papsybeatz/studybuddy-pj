import { getStudentById } from '@/lib/mockDB'

export interface LoginCredentials {
  studentID: string
  pin: string
}

export interface AuthResult {
  success: boolean
  student?: ReturnType<typeof getStudentById>
  error?: string
}

const validCredentials: Record<string, string> = {
  STU001: '1234',
  STU002: '1234',
  STU003: '1234',
  STU004: '1234',
}

export async function authenticate(credentials: LoginCredentials): Promise<AuthResult> {
  const { studentID, pin } = credentials

  if (!studentID || !pin) {
    return {
      success: false,
      error: 'Student ID and PIN are required',
    }
  }

  const validPin = validCredentials[studentID]

  if (!validPin) {
    return {
      success: false,
      error: 'Invalid Student ID',
    }
  }

  if (pin !== validPin) {
    return {
      success: false,
      error: 'Invalid PIN',
    }
  }

  const student = getStudentById(studentID)

  if (!student) {
    return {
      success: false,
      error: 'Student profile not found',
    }
  }

  return {
    success: true,
    student,
  }
}
