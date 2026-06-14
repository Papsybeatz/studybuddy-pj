'use client'

import { useState } from 'react'
import Link from 'next/link'
import { extractTextFromFile } from '@/services/ocr'
import { extractTopics } from '@/lib/topicExtractor'

interface ExtractedQuestion {
  question: string
  topic: string
}

export default function PastPaperPage() {
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState<string | null>(null)
  const [questions, setQuestions] = useState<ExtractedQuestion[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    if (selected && selected.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    } else if (selected) {
      setPreview(selected.name)
    }
  }

  const handleProcess = async () => {
    if (!file) return
    setIsProcessing(true)
    try {
      const ocrResult = await extractTextFromFile(file)
      setExtractedText(ocrResult.text)
      const topics = extractTopics(ocrResult.text)
      setQuestions(topics)
    } finally {
      setIsProcessing(false)
    }
  }

  const detectedTopics = Array.from(new Set(questions.map((q) => q.topic)))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">StudyBuddy</h1>
              <p className="text-sm text-gray-500">Upload Past Exam Papers</p>
            </div>
            <Link href="/dashboard" className="text-sm text-primary hover:text-primary-light font-medium">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload a Past Paper</h2>
          <p className="text-gray-600 mb-6">
            Upload a PDF or image of a past exam paper. StudyBuddy will extract questions and identify topics.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload File (PDF or Image)</label>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>

            {preview && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                {preview.startsWith('data:image') ? (
                  <img src={preview} alt="Preview" className="max-h-64 rounded border" />
                ) : (
                  <p className="text-sm text-gray-600">{preview}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Any specific topics or instructions..."
              />
            </div>

            <button
              onClick={handleProcess}
              disabled={!file || isProcessing}
              className="w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Process Paper'}
            </button>
          </div>
        </div>

        {extractedText && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Text</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{extractedText}</p>
          </div>
        )}

        {questions.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Questions</h3>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">Q{index + 1}: {q.question}</p>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {q.topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {detectedTopics.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics Detected</h3>
                <div className="flex flex-wrap gap-2">
                  {detectedTopics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

