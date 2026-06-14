import { getExplanationStyle } from '@/lib/learningStyle'

export function getMicroLesson(topic: string, learningStyle: string): { title: string; explanation: string } {
  const normalizedTopic = topic.toLowerCase().trim()
  const styleNote = getExplanationStyle(learningStyle)

  const lessons: Record<string, { title: string; explanation: string }> = {
    biology: {
      title: 'Photosynthesis',
      explanation:
        'Photosynthesis is the process by which green plants use sunlight to convert carbon dioxide and water into glucose and oxygen. It occurs mainly in the chloroplasts of plant cells, specifically using the pigment chlorophyll. This process is vital because it produces the oxygen we breathe and forms the base of most food chains on Earth.',
    },
    quadratics: {
      title: 'Quadratics',
      explanation:
        'A quadratic equation is any equation that can be written in the form ax² + bx + c = 0, where a, b, and c are numbers and a ≠ 0. You can solve quadratics by factoring, completing the square, or using the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. The graph of a quadratic function is a parabola, which opens upward if a > 0 and downward if a < 0.',
    },
    accounting: {
      title: 'Basic Accounting Principles',
      explanation:
        'Accounting is the process of recording, summarizing, and analyzing financial transactions. The core principle is the accounting equation: Assets = Liabilities + Equity. Key concepts include debits and credits, which must always balance, and the double-entry system where every transaction affects at least two accounts. Financial statements like the income statement and balance sheet summarize business performance.',
    },
    motion: {
      title: 'Motion',
      explanation:
        'Motion is the change in position of an object over time. Key concepts include distance (total path length) and displacement (change in position). Velocity measures how fast something moves in a specific direction, while acceleration is the rate of change of velocity. Newton\'s laws of motion describe how forces affect the motion of objects, with the first law stating that an object at rest stays at rest unless acted upon by a force.',
    },
  }

  const lesson = lessons[normalizedTopic]

  if (lesson) {
    return {
      title: lesson.title,
      explanation: `${lesson.explanation}\n\n${styleNote}`,
    }
  }

  return {
    title: topic,
    explanation: `This is an introduction to ${topic}. Understanding this topic requires careful study of its core concepts and regular practice. ${styleNote}`,
  }
}
