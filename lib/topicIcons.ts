// Topic → icon mapping for StudyBuddy.
// Each entry has an emoji (used everywhere) and a label (for accessibility).
// Heroicons equivalents are noted in comments — swap to @heroicons/react if desired.

export interface TopicIconInfo {
  emoji: string
  label: string
}

const ICON_MAP: Record<string, TopicIconInfo> = {
  // Sciences  (→ BeakerIcon)
  biology: { emoji: '🧬', label: 'Biology' },
  'organic-chemistry': { emoji: '🔬', label: 'Organic Chemistry' },

  // Chemistry  (→ FireIcon)
  chemistry: { emoji: '🔥', label: 'Chemistry' },

  // Physics  (→ BoltIcon)
  physics: { emoji: '⚡', label: 'Physics' },
  'physics-mechanics': { emoji: '⚡', label: 'Physics Mechanics' },
  'physics-calculations': { emoji: '⚡', label: 'Physics Calculations' },

  // Mathematics  (→ CalculatorIcon)
  math: { emoji: '🔢', label: 'Mathematics' },
  'elective-math': { emoji: '🔢', label: 'Elective Mathematics' },
  'core-math': { emoji: '🔢', label: 'Core Mathematics' },
  mathematics: { emoji: '🔢', label: 'Mathematics' },
  calculus: { emoji: '📐', label: 'Calculus' },
  algebra: { emoji: '🔣', label: 'Algebra' },

  // Business / Finance  (→ CurrencyDollarIcon)
  accounting: { emoji: '💰', label: 'Accounting' },
  costing: { emoji: '💰', label: 'Costing' },
  economics: { emoji: '📊', label: 'Economics' },
  'business-management': { emoji: '💼', label: 'Business Management' },
  'cost-accounting': { emoji: '💰', label: 'Cost Accounting' },
  'economics-graphs': { emoji: '📈', label: 'Economics Graphs' },

  // Humanities
  literature: { emoji: '📖', label: 'Literature' },
  government: { emoji: '🏛️', label: 'Government' },
  history: { emoji: '🏺', label: 'History' },
  'history-dates': { emoji: '📅', label: 'History Dates' },
  'literature-analysis': { emoji: '✍️', label: 'Literature Analysis' },
  crs: { emoji: '✝️', label: 'CRS' },
  english: { emoji: '📝', label: 'English' },
  'social-studies': { emoji: '🌍', label: 'Social Studies' },

  // Technical
  'technical-drawing': { emoji: '📐', label: 'Technical Drawing' },
}

/**
 * Return the icon info for a topic slug or readable name.
 * Accepts either "physics-mechanics" or "Physics Mechanics".
 * Returns null if no icon is found.
 */
export function getTopicIcon(topic: string): TopicIconInfo | null {
  // Normalise: lowercase, spaces → hyphens
  const key = topic
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  if (ICON_MAP[key]) return ICON_MAP[key]

  // Partial match: return the first entry whose key is contained in the topic
  const partialKey = Object.keys(ICON_MAP).find(
    (k) => key.includes(k) || k.includes(key)
  )
  return partialKey ? ICON_MAP[partialKey] : null
}
