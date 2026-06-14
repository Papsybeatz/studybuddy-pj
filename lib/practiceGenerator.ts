export interface PracticeQuestion {
  question: string
  answer: string
}

export function getPracticeQuestions(topic: string): PracticeQuestion[] {
  const normalizedTopic = topic.toLowerCase().trim()

  const questions: Record<string, PracticeQuestion[]> = {
    biology: [
      { question: 'State one product of photosynthesis.', answer: 'Oxygen (or glucose)' },
      { question: 'What pigment absorbs light energy in plants?', answer: 'Chlorophyll' },
      { question: 'Name the organelle where photosynthesis occurs.', answer: 'Chloroplast' },
      { question: 'What gas do plants take in for photosynthesis?', answer: 'Carbon dioxide' },
    ],
    quadratics: [
      { question: 'Solve: x² + 3x + 2 = 0', answer: 'x = -1 or x = -2' },
      { question: 'What is the discriminant of a quadratic equation?', answer: 'b² - 4ac' },
      { question: 'How many solutions can a quadratic equation have?', answer: '0, 1, or 2' },
      { question: 'What shape is the graph of a quadratic function?', answer: 'Parabola' },
    ],
    accounting: [
      { question: 'Define assets.', answer: 'Resources owned by a business that have economic value' },
      { question: 'What is the accounting equation?', answer: 'Assets = Liabilities + Equity' },
      { question: 'What does a debit entry do to an asset account?', answer: 'Increases it' },
      { question: 'Name one financial statement.', answer: 'Income statement, balance sheet, or cash flow statement' },
    ],
    motion: [
      { question: 'What is velocity?', answer: 'Speed in a specific direction (displacement per unit time)' },
      { question: 'State Newton\'s First Law of Motion.', answer: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a net external force' },
      { question: 'What is the SI unit of acceleration?', answer: 'm/s² (meters per second squared)' },
      { question: 'How do you calculate average speed?', answer: 'Total distance ÷ Total time' },
    ],
  }

  const topicQuestions = questions[normalizedTopic]

  if (topicQuestions) {
    return topicQuestions
  }

  return [
    { question: `What is the main concept of ${topic}?`, answer: 'Check your notes for the definition' },
    { question: `Name one key term related to ${topic}.`, answer: 'Review the topic summary' },
    { question: `How is ${topic} applied in real life?`, answer: 'Think of practical examples' },
  ]
}
