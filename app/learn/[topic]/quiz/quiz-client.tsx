'use client'

import { useState } from 'react'
import Link from 'next/link'
import { gradeQuiz, updateDifficulty } from '@/lib/quizEngine'
import type { QuizQuestion } from '@/lib/quizEngine'
import type { QuizDifficulty } from '@/types/student'
import { getTopicIcon } from '@/lib/topicIcons'

interface QuizClientProps {
  studentId: string
  topic: string
  questions: QuizQuestion[]
  difficulty: QuizDifficulty
}

export default function QuizClient({
  studentId,
  topic,
  questions,
  difficulty,
}: QuizClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  )
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [newDifficulty, setNewDifficulty] = useState<QuizDifficulty>(difficulty)

  const formatTopic = (slug: string) =>
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const currentQuestion = questions[currentIndex]

  const handleOptionSelect = (optionIdx: number) => {
    if (submitted) return
    const updated = [...selected]
    updated[currentIndex] = optionIdx
    setSelected(updated)
  }

  const handleSubmit = () => {
    const answers = selected.map((s) => (s === null ? -1 : s))
    const correctAnswers = questions.map((q) => q.correctIndex)
    const result = gradeQuiz(answers, correctAnswers)
    const updated = updateDifficulty(studentId, result)
    setScore(result)
    setNewDifficulty(updated)
    setSubmitted(true)
  }

  const allAnswered = selected.every((s) => s !== null)

  const difficultyBadge: Record<QuizDifficulty, string> = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">StudyBuddy</h1>
            <p className="text-sm text-gray-500">Quiz Mode</p>
          </div>
          <Link href={`/learn/${topic}`} className="text-sm text-primary hover:text-primary-light font-medium">
            ← Back to Lesson
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Topic + difficulty */}
        <div className="flex items-center gap-3 mb-6">
          {getTopicIcon(topic) && (
            <span className="text-3xl leading-none select-none" aria-hidden="true">
              {getTopicIcon(topic)!.emoji}
            </span>
          )}
          <h2 className="text-2xl font-bold text-gray-900">{formatTopic(topic)} Quiz</h2>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${difficultyBadge[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        {/* Progress indicator */}
        {!submitted && (
          <div className="flex gap-1 mb-6">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i === currentIndex
                    ? 'bg-primary'
                    : selected[i] !== null
                    ? 'bg-primary/40'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* ── Result screen ── */}
        {submitted && score !== null ? (
          <div className="bg-white rounded-xl shadow p-8 text-center space-y-4">
            <p className="text-5xl font-bold text-gray-900">{score}%</p>
            <p
              className={`text-xl font-semibold ${
                score >= 60 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {score >= 60 ? '🎉 Great job!' : '📚 Try again!'}
            </p>
            {score >= 60 && (
              <p className="text-sm text-gray-500">
                Your quiz difficulty has been updated to{' '}
                <span className="font-semibold capitalize">{newDifficulty}</span>.
              </p>
            )}
            {score < 60 && (
              <p className="text-sm text-gray-500">
                Review the lesson and give it another shot. You&apos;ve got this!
              </p>
            )}

            {/* Answer review */}
            <div className="text-left mt-6 space-y-4">
              {questions.map((q, qi) => {
                const chosenIdx = selected[qi]
                const isCorrect = chosenIdx === q.correctIndex
                return (
                  <div key={qi} className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-800 mb-2">
                      Q{qi + 1}: {q.question}
                    </p>
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`text-sm px-3 py-1.5 rounded mb-1 ${
                          oi === q.correctIndex
                            ? 'bg-green-50 text-green-800 font-medium'
                            : oi === chosenIdx && !isCorrect
                            ? 'bg-red-50 text-red-700'
                            : 'text-gray-600'
                        }`}
                      >
                        {oi === q.correctIndex && '✓ '}
                        {oi === chosenIdx && !isCorrect && '✗ '}
                        {opt}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 justify-center mt-6">
              <Link
                href={`/learn/${topic}`}
                className="px-5 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to Lesson
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light"
              >
                Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* ── Question card ── */
          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <p className="text-lg font-semibold text-gray-900">{currentQuestion.question}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, oi) => (
                <button
                  key={oi}
                  onClick={() => handleOptionSelect(oi)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    selected[currentIndex] === oi
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 text-gray-700 hover:border-primary/40 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2 font-bold text-gray-400">
                    {String.fromCharCode(65 + oi)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg disabled:opacity-30 hover:bg-gray-50"
              >
                ← Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((i) => i + 1)}
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-lg disabled:opacity-40 hover:bg-primary-light"
                >
                  Submit Quiz
                </button>
              )}
            </div>
            {!allAnswered && currentIndex === questions.length - 1 && (
              <p className="text-xs text-center text-gray-400">
                Answer all questions before submitting.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
