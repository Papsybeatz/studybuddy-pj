import { getStudentById } from '@/lib/mockDB'
import { generateRevisionPlan } from '@/lib/revisionPlan'
import RevisionClient from './revision-client'

export default async function RevisionPage() {
  const student = getStudentById('STU001')

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Student not found.</p>
      </div>
    )
  }

  const plan = generateRevisionPlan(student)

  return <RevisionClient student={student} initialPlan={plan} />
}
