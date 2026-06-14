export interface ExtractedQuestion {
  question: string
  topic: string
}

const TOPIC_KEYWORDS: Record<string, string[]> = {
  Biology: ['photosynthesis', 'cell', 'plant', 'animal', 'organism', 'ecology', 'genetics'],
  Math: ['x^2', 'quadratic', 'equation', 'solve', 'algebra', 'geometry', 'calculus', 'derivative'],
  Accounting: ['accounting', 'ledger', 'debit', 'credit', 'balance', 'financial'],
  Physics: ['force', 'energy', 'motion', 'velocity', 'acceleration', 'newton'],
  Chemistry: ['reaction', 'molecule', 'compound', 'element', 'bond', 'acid', 'base'],
  Economics: ['demand', 'supply', 'market', 'price', 'inflation', 'gdp'],
  History: ['war', 'colony', 'independence', 'empire', 'revolution', 'treaty'],
  Literature: ['poem', 'author', 'novel', 'character', 'theme', 'metaphor'],
}

export function extractTopics(text: string): ExtractedQuestion[] {
  const sentences = text
    .split(/[.?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5)

  return sentences.map((sentence) => {
    const lower = sentence.toLowerCase()
    let matchedTopic = 'General'

    for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
      if (keywords.some((kw) => lower.includes(kw))) {
        matchedTopic = topic
        break
      }
    }

    return {
      question: sentence,
      topic: matchedTopic,
    }
  })
}
