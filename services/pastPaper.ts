export interface ExtractedQuestion {
  question: string
  topic: string
}

export interface PastPaperResult {
  extractedQuestions: ExtractedQuestion[]
  weakAreas: string[]
}

export function processPastPaper(file: File): PastPaperResult {
  void file
  return {
    extractedQuestions: [
      { question: 'Explain photosynthesis and its importance to plants.', topic: 'Biology' },
      { question: 'Solve the quadratic equation: x^2 + 5x + 6 = 0', topic: 'Quadratics' },
    ],
    weakAreas: ['Quadratics'],
  }
}
