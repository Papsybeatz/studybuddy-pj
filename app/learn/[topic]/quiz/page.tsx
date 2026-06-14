import { Suspense } from 'react'
import { getStudentById } from '@/lib/mockDB'
import { generateQuiz } from '@/lib/quizEngine'
import QuizClient from './quiz-client'

export default async function QuizPage({
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

  const difficulty = student.quizDifficulty ?? 'easy'
  const questions = generateQuiz(topic, difficulty)

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading quiz…</p></div>}>
      <QuizClient
        studentId={studentId}
        topic={topic}
        questions={questions}
        difficulty={difficulty}
      />
    </Suspense>
  )
}
