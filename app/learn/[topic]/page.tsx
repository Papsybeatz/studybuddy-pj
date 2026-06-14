import { Suspense } from 'react'
import { getStudentById } from '@/lib/mockDB'
import { getMicroLesson } from '@/lib/microLessons'
import { getPracticeQuestions } from '@/lib/practiceGenerator'
import LearnClient from './learn-client'

function LearnSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ topic: string }>
}) {
  const { topic } = await params
  const studentId = 'STU001'
  const student = getStudentById(studentId)

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Student not found.</p>
      </div>
    )
  }

  const lesson = getMicroLesson(topic, student.learningStyle)
  const questions = getPracticeQuestions(topic)

  return (
    <Suspense fallback={<LearnSkeleton />}>
      <LearnClient student={student} topic={topic} lesson={lesson} questions={questions} />
    </Suspense>
  )
}
