'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getExplanationStyle, getExampleStyle, getPracticeStyle } from '@/lib/learningStyle'
import { getWelcomeMessage } from '@/lib/aiWelcome'
import { getDailyCheckIn } from '@/lib/checkIn'
import { getCompletedTopics, getStudyStreak } from '@/lib/progress'
import StreakDisplay from '@/components/StreakDisplay'
import Card from '@/components/Card'
import { getTopicIcon } from '@/lib/topicIcons'

interface Student {
  id: string
  name: string
  courseOfStudy: string
  subjects: string[]
  interests: string[]
  hobbies: string[]
  learningStyle: string
  weakAreas: any[]
  careerHints: string[]
  lastLogin: Date
  likedSubjects: string[]
  dislikedSubjects: string[]
  lastStudiedSubject?: string
  upcomingTests?: { subject: string; date: string }[]
  subjectPreferences?: {
    liked: string[]
    disliked: string[]
  }
}

interface DashboardClientProps {
  student: Student
  subjects: string[]
  lastStudiedSubject: string
  upcomingTests: { subject: string; date: string }[]
}

export default function DashboardClient({
  student,
  subjects,
  lastStudiedSubject,
  upcomingTests,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  }

  const firstName = student.name.split(' ')[0]
  const interests = student.interests.length > 0 ? student.interests[0] : 'learning'
  const hasOnboardingData = student.interests.length > 0 || student.hobbies.length > 0

  const welcomeMessages = getWelcomeMessage(student)
  const checkInQuestion = getDailyCheckIn(student)

  const mainGreeting = welcomeMessages[0] || `Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, ${firstName}!`
  const subGreetings = welcomeMessages.slice(1)

  const getContinueLearningContent = () => {
    if (student.weakAreas.length > 0) {
      return {
        title: 'Review weak topics',
        desc: `Focus on: ${student.weakAreas.slice(0, 2).join(', ')}`,
        color: 'red',
      }
    }

    if (upcomingTests.length > 0) {
      const nextTest = upcomingTests[0]
      return {
        title: `Prepare for ${nextTest.subject}`,
        desc: `Test date: ${new Date(nextTest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        color: 'blue',
      }
    }

    if (lastStudiedSubject) {
      return {
        title: `Continue ${lastStudiedSubject}`,
        desc: 'Pick up from where you left off',
        color: 'green',
      }
    }

    return {
      title: 'Start learning',
      desc: 'Choose a subject to begin',
      color: 'gray',
    }
  }

  const continueLearning = getContinueLearningContent()

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 border-red-100'
      case 'blue':
        return 'bg-blue-50 border-blue-100'
      case 'green':
        return 'bg-green-50 border-green-100'
      default:
        return 'bg-gray-50 border-gray-100'
    }
  }

  const getTextColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-red-800'
      case 'blue':
        return 'text-blue-800'
      case 'green':
        return 'text-green-800'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Hero Card ─────────────────────────────────── */}
        <div className="rounded-2xl shadow-lg mb-8 overflow-hidden bg-gradient-to-br from-primary to-secondary">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 p-8">
            {/* Left: greeting + check-in */}
            <div className="text-white flex-1 min-w-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <h2 className="text-3xl font-bold leading-tight mb-2">{mainGreeting}</h2>
              {subGreetings.length > 0 && (
                <p className="text-white/80 text-base mb-4">{subGreetings[0]}</p>
              )}
              {hasOnboardingData && (
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 inline-block max-w-lg">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">
                    💬 Daily Check-In
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed">{checkInQuestion}</p>
                </div>
              )}
            </div>
            {/* Right: streak */}
            <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <StreakDisplay studentId={student.id} />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'subjects', 'progress', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Your Subjects" icon="📘">
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span className="text-base leading-none">{getTopicIcon(subject)?.emoji ?? '📖'}</span>
                      {subject}
                    </span>
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Weak Areas" icon="⚠️">
              <div className="flex flex-wrap gap-2">
                {student.weakAreas.length > 0 ? (
                  student.weakAreas.map((area, index) => {
                    const topicSlug = typeof area === 'string' ? area.toLowerCase().replace(/\s+/g, '-') : `area-${index + 1}`
                    const iconInfo = getTopicIcon(topicSlug)
                    return (
                      <Link
                        key={index}
                        href={`/learn/${topicSlug}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-sm rounded-full border border-red-100 hover:bg-red-100 transition"
                      >
                        {iconInfo && <span className="leading-none">{iconInfo.emoji}</span>}
                        {typeof area === 'string' ? area : 'Area ' + (index + 1)}
                      </Link>
                    )
                  })
                ) : (
                  <p className="text-sm text-gray-500">No weak areas detected yet.</p>
                )}
              </div>
              {student.subjectPreferences?.disliked && student.subjectPreferences.disliked.length > 0 && (
                <p className="text-xs text-gray-400 mt-3">
                  Based on your disliked subjects: {student.subjectPreferences.disliked.join(', ')}
                </p>
              )}
            </Card>

            <Card title="Upcoming Tests" icon="📅">
              <div className="space-y-2">
                {upcomingTests.length > 0 ? (
                  upcomingTests.map((test, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">{test.subject}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {new Date(test.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">No upcoming tests</p>
                    <p className="text-xs text-blue-600 mt-1">Check back later</p>
                  </div>
                )}
              </div>
            </Card>

            <Card title="Continue Learning" icon="🚀">
              <div className={`p-3 border rounded-lg ${getColorClasses(continueLearning.color)}`}>
                <p className={`text-sm font-medium ${getTextColorClasses(continueLearning.color)}`}>
                  {continueLearning.title}
                </p>
                <p className={`text-xs ${getTextColorClasses(continueLearning.color)} mt-1 opacity-80`}>
                  {continueLearning.desc}
                </p>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">How you'll learn:</p>
                <p className="text-xs text-gray-500">{getExampleStyle(student.learningStyle)}</p>
              </div>
            </Card>

            <Card title="Career Hints" icon="🎯" className="md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {student.careerHints.map((career, index) => (
                  <div
                    key={index}
                    className="p-3 bg-purple-50 border border-purple-100 rounded-lg"
                  >
                    <p className="text-sm font-medium text-purple-800">{career}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Link href="/past-paper" className="block">
              <Card title="Upload Past Paper" icon="📄" className="hover:shadow-md transition cursor-pointer h-full">
                <p className="text-sm text-gray-600">Upload a PDF or image to extract questions and detect weak areas</p>
              </Card>
            </Link>
          </div>
        )}

        {activeTab === 'subjects' && (
          <Card title="All Subjects" icon="📚">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl leading-none">{getTopicIcon(subject)?.emoji ?? '📖'}</span>
                    <h4 className="font-medium text-gray-900">{subject}</h4>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Click to view materials</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* ─── Streak banner ─────────────────────────────── */}
            <StreakDisplay studentId={student.id} />

            {/* ─── Summary cards ─────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card title="Topics Completed" icon="✅" className="text-center">
                <p className="text-4xl font-bold text-primary mt-1">
                  {getCompletedTopics(student.id).length}
                </p>
              </Card>
              <Card title="Day Streak" icon="🔥" className="text-center">
                <p className="text-4xl font-bold text-orange-500 mt-1">
                  {getStudyStreak(student.id)}
                </p>
              </Card>
              <Card title="Quiz Difficulty" icon="🎯" className="text-center">
                <p className="text-4xl font-bold text-purple-600 capitalize mt-1">
                  {student.quizDifficulty ?? 'easy'}
                </p>
              </Card>
            </div>

            {/* ─── Progress bar ───────────────────────────────── */}
            <Card title="Overall Progress" icon="📊">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {Math.min(getCompletedTopics(student.id).length, 10)} / 10 topics
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((getCompletedTopics(student.id).length / 10) * 100, 100)}%`,
                  }}
                />
              </div>
            </Card>

            {/* ─── Completed topics list ──────────────────────── */}
            <Card title="Completed Topics" icon="🏆">
              {getCompletedTopics(student.id).length === 0 ? (
                <p className="text-sm text-gray-500">
                  No topics completed yet. Start learning to track your progress!
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {[...getCompletedTopics(student.id)].reverse().map((entry, idx) => (
                    <li key={idx} className="py-3 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800 capitalize">
                        <span>{getTopicIcon(entry.topic)?.emoji ?? '📖'}</span>
                        {entry.topic.replace(/-/g, ' ')}
                      </span>
                      <span className="text-xs text-gray-400">{entry.date}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <Card title="Settings" icon="⚙️">
            <p className="text-gray-600">Manage your account preferences and learning style.</p>
          </Card>
        )}
      </main>
    </div>
  )
}
