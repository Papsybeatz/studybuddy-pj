export interface OcrResult {
  text: string
  confidence?: number
}

export function extractTextFromFile(file: File): Promise<OcrResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: 'Explain photosynthesis and its importance to plants. Solve x^2 + 5x + 6 = 0. Define accounting principles.',
        confidence: 0.92,
      })
    }, 800)
  })
}
