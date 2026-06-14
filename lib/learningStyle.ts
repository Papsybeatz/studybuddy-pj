type LearningStyle = 'visual' | 'hands-on' | 'reading-based'

export function getExplanationStyle(style: string): string {
  switch (style.toLowerCase()) {
    case 'visual':
      return 'I will use diagrams, charts, and visual examples to help you understand concepts.'
    case 'hands-on':
      return 'I will guide you through interactive exercises and real-world practice problems.'
    case 'reading-based':
      return 'I will provide detailed explanations, notes, and written examples for you to study.'
    default:
      return 'I will adapt my teaching style to match your learning preferences.'
  }
}

export function getExampleStyle(style: string): string {
  switch (style.toLowerCase()) {
    case 'visual':
      return '📊 View diagrams and infographics • 🎥 Watch video explanations • 🖼️ See illustrated examples'
    case 'hands-on':
      return '🔧 Try interactive simulations • ✏️ Practice with step-by-step exercises • 🧪 Conduct virtual experiments'
    case 'reading-based':
      return '📖 Read detailed concept notes • 📝 Review summary sheets • 📚 Study example problems'
    default:
      return 'Explore different learning formats'
  }
}

export function getPracticeStyle(style: string): string {
  switch (style.toLowerCase()) {
    case 'visual':
      return 'Study visual flashcards and diagram-based quizzes'
    case 'hands-on':
      return 'Complete interactive labs and practical problem sets'
    case 'reading-based':
      return 'Read passages and answer comprehension questions'
    default:
      return 'Practice with mixed-format exercises'
  }
}
