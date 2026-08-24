import { Suspense } from 'react'
import { getStudentById } from '@/lib/mockDB'
import { getSubjectsForCourse } from '@/lib/courseMapping'
import DashboardClient from './dashboard-client'

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const studentId = 'STU001'
  const student = getStudentById(studentId)

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Not Found</h1>
          <p className="text-gray-600">Please contact support.</p>
        </div>
      </div>
    )
  }

  const subjects = getSubjectsForCourse(student.courseOfStudy)

  const lastStudiedSubject = student.lastStudiedSubject || student.likedSubjects?.[0] || subjects[0]
  const upcomingTests = student.upcomingTests || []

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardClient
        student={student}
        subjects={subjects}
        lastStudiedSubject={lastStudiedSubject}
        upcomingTests={upcomingTests}
      />
    </Suspense>
  )
}
