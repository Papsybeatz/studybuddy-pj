'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateLastStudiedSubject } from '@/lib/mockDB'
import { markTopicCompleted } from '@/lib/progress'
import { getTopicIcon } from '@/lib/topicIcons'
import type { Student } from '@/types/student'

interface Lesson {
  title: string
  explanation: string
}

interface PracticeQuestion {
  question: string
  answer: string
}

interface LearnClientProps {
  student: Student
  topic: string
  lesson: Lesson
  questions: PracticeQuestion[]
}

export default function LearnClient({ student, topic, lesson, questions }: LearnClientProps) {
  const router = useRouter()
  const [showAnswers, setShowAnswers] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleMarkCompleted = () => {
    updateLastStudiedSubject(student.id, topic)
    markTopicCompleted(student.id, topic)
    setIsCompleted(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 600)
  }

  const formatTopic = (slug: string) => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">StudyBuddy</h1>
              <p className="text-sm text-gray-500">Learning Session</p>
            </div>
            <Link href="/dashboard" className="text-sm text-primary hover:text-primary-light font-medium">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900">{formatTopic(topic)}</span>
          </div>
          <div className="flex items-center gap-3">
            {getTopicIcon(topic) && (
              <span className="text-4xl leading-none select-none" aria-hidden="true">
                {getTopicIcon(topic)!.emoji}
              </span>
            )}
            <h2 className="text-3xl font-bold text-gray-900">{lesson.title}</h2>
          </div>
        </div>

        {isCompleted && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Marked as completed! Redirecting to dashboard...
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Micro-Lesson</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{lesson.explanation}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Practice Questions</h3>
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="text-sm text-primary hover:text-primary-light font-medium"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
            </div>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">Q{index + 1}: {q.question}</p>
                  {showAnswers && (
                    <div className="p-2 bg-green-50 border border-green-100 rounded">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Answer:</span> {q.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href={`/learn/${topic}/quiz`}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Take Quiz →
            </Link>
            <button
              onClick={handleMarkCompleted}
              disabled={isCompleted}
              className="px-6 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCompleted ? 'Completed!' : 'Mark as Completed'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
