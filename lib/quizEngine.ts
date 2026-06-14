import { mockStudents } from './mockDB'
import type { QuizDifficulty } from '@/types/student'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
}

// ── Question bank ─────────────────────────────────────────────────────────────
// Each topic has three difficulty tiers, 5 questions each.
// For topics not found in the bank we fall back to generic questions.

type QuestionBank = Record<string, Record<QuizDifficulty, QuizQuestion[]>>

const questionBank: QuestionBank = {
  // ── Biology ───────────────────────────────────────────────────────────────
  biology: {
    easy: [
      { question: 'What is the basic unit of life?', options: ['Atom', 'Cell', 'Molecule', 'Organ'], correctIndex: 1 },
      { question: 'What process do plants use to make food?', options: ['Respiration', 'Fermentation', 'Photosynthesis', 'Digestion'], correctIndex: 2 },
      { question: 'Which organ pumps blood in the human body?', options: ['Liver', 'Lung', 'Kidney', 'Heart'], correctIndex: 3 },
      { question: 'What gas do humans exhale?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctIndex: 2 },
      { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Vacuole'], correctIndex: 2 },
    ],
    medium: [
      { question: 'Which organelle contains DNA in a eukaryotic cell?', options: ['Ribosome', 'Mitochondria', 'Nucleus', 'Golgi apparatus'], correctIndex: 2 },
      { question: 'What type of cell division produces gametes?', options: ['Mitosis', 'Meiosis', 'Binary fission', 'Budding'], correctIndex: 1 },
      { question: 'Which macromolecule stores genetic information?', options: ['Protein', 'Lipid', 'Carbohydrate', 'Nucleic acid'], correctIndex: 3 },
      { question: 'What is osmosis?', options: ['Movement of solutes across a membrane', 'Movement of water across a semi-permeable membrane', 'Active transport of ions', 'Diffusion of gases'], correctIndex: 1 },
      { question: 'Which part of the plant absorbs water and minerals?', options: ['Leaves', 'Stem', 'Roots', 'Flowers'], correctIndex: 2 },
    ],
    hard: [
      { question: 'What enzyme unzips DNA during replication?', options: ['DNA polymerase', 'RNA polymerase', 'Helicase', 'Ligase'], correctIndex: 2 },
      { question: 'During the Krebs cycle, how many ATP molecules are produced per glucose?', options: ['2', '4', '6', '38'], correctIndex: 0 },
      { question: 'Which type of RNA carries amino acids to the ribosome?', options: ['mRNA', 'rRNA', 'tRNA', 'snRNA'], correctIndex: 2 },
      { question: 'What is the end product of glycolysis?', options: ['Acetyl-CoA', 'Pyruvate', 'Citrate', 'Oxaloacetate'], correctIndex: 1 },
      { question: 'Hardy-Weinberg equilibrium requires which condition?', options: ['Natural selection', 'Genetic drift', 'No mutation', 'Small population'], correctIndex: 2 },
    ],
  },

  // ── Chemistry ─────────────────────────────────────────────────────────────
  chemistry: {
    easy: [
      { question: 'What is the chemical symbol for water?', options: ['CO2', 'H2O', 'NaCl', 'O2'], correctIndex: 1 },
      { question: 'What is the atomic number of Carbon?', options: ['6', '8', '12', '14'], correctIndex: 0 },
      { question: 'What type of bond shares electrons?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], correctIndex: 1 },
      { question: 'What is the pH of a neutral solution?', options: ['0', '5', '7', '14'], correctIndex: 2 },
      { question: 'Which gas is produced when acids react with metals?', options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'], correctIndex: 2 },
    ],
    medium: [
      { question: 'What is the molar mass of NaCl?', options: ['23 g/mol', '35.5 g/mol', '58.5 g/mol', '44 g/mol'], correctIndex: 2 },
      { question: 'Which type of reaction releases heat to the surroundings?', options: ['Endothermic', 'Exothermic', 'Redox', 'Neutralisation'], correctIndex: 1 },
      { question: 'How many valence electrons does Sulfur have?', options: ['2', '4', '6', '8'], correctIndex: 2 },
      { question: 'What is Avogadro\'s number?', options: ['6.02 × 10²³', '3.14 × 10⁵', '9.8 × 10²', '1.6 × 10⁻¹⁹'], correctIndex: 0 },
      { question: 'Which element is a noble gas?', options: ['Chlorine', 'Sodium', 'Argon', 'Phosphorus'], correctIndex: 2 },
    ],
    hard: [
      { question: 'What is the hybridization of carbon in benzene?', options: ['sp', 'sp2', 'sp3', 'sp3d'], correctIndex: 1 },
      { question: 'Which law relates pressure and volume at constant temperature?', options: ['Charles\'s law', 'Boyle\'s law', 'Gay-Lussac\'s law', 'Dalton\'s law'], correctIndex: 1 },
      { question: 'In an electrolytic cell, what occurs at the cathode?', options: ['Oxidation', 'Reduction', 'Neutralisation', 'Hydrolysis'], correctIndex: 1 },
      { question: 'What is the IUPAC name of CH3COOH?', options: ['Methanoic acid', 'Ethanoic acid', 'Propanoic acid', 'Butanoic acid'], correctIndex: 1 },
      { question: 'Le Chatelier\'s principle states that an equilibrium will shift to...', options: ['Increase the temperature', 'Decrease the pressure', 'Counteract a stress applied to it', 'Maximise product formation'], correctIndex: 2 },
    ],
  },

  // ── Accounting ────────────────────────────────────────────────────────────
  accounting: {
    easy: [
      { question: 'What does "debit" mean in double-entry bookkeeping?', options: ['An increase in liability', 'An entry on the left side of an account', 'A cash payment', 'A credit note'], correctIndex: 1 },
      { question: 'Which financial statement shows a company\'s assets and liabilities?', options: ['Income statement', 'Cash flow statement', 'Balance sheet', 'Trial balance'], correctIndex: 2 },
      { question: 'What is gross profit?', options: ['Revenue minus all expenses', 'Revenue minus cost of goods sold', 'Net sales minus tax', 'Operating profit minus interest'], correctIndex: 1 },
      { question: 'What type of account is "Cash"?', options: ['Liability', 'Asset', 'Equity', 'Revenue'], correctIndex: 1 },
      { question: 'Which principle states revenue should be recognised when earned?', options: ['Matching principle', 'Accrual principle', 'Conservatism', 'Going concern'], correctIndex: 1 },
    ],
    medium: [
      { question: 'Depreciation reduces the value of which type of asset?', options: ['Current assets', 'Fixed (non-current) assets', 'Intangible assets only', 'Liquid assets'], correctIndex: 1 },
      { question: 'The accounting equation is: Assets = ?', options: ['Liabilities + Equity', 'Revenue – Expenses', 'Equity – Liabilities', 'Capital + Drawings'], correctIndex: 0 },
      { question: 'Which method values inventory at the most recent purchase price?', options: ['FIFO', 'LIFO', 'Weighted average', 'Specific identification'], correctIndex: 1 },
      { question: 'What is the current ratio?', options: ['Net profit / Revenue', 'Current assets / Current liabilities', 'Total debt / Total equity', 'Cash / Total assets'], correctIndex: 1 },
      { question: 'A credit entry to the Sales account indicates...', options: ['An increase in an expense', 'An increase in revenue', 'A reduction in assets', 'An increase in liabilities'], correctIndex: 1 },
    ],
    hard: [
      { question: 'Under IFRS 15, revenue is recognised when...', options: ['Cash is received', 'An invoice is raised', 'A performance obligation is satisfied', 'A contract is signed'], correctIndex: 2 },
      { question: 'What does a high Days Sales Outstanding (DSO) indicate?', options: ['Efficient collection of receivables', 'Slow collection of receivables', 'High inventory turnover', 'Low credit sales'], correctIndex: 1 },
      { question: 'Which concept prevents anticipating profits but provides for all losses?', options: ['Accruals', 'Consistency', 'Prudence', 'Materiality'], correctIndex: 2 },
      { question: 'How is Return on Capital Employed (ROCE) calculated?', options: ['Net profit / Total assets', 'EBIT / Capital employed', 'Gross profit / Revenue', 'Net profit / Equity'], correctIndex: 1 },
      { question: 'Under the straight-line depreciation method, what is the annual charge for an asset costing $10 000 with a residual value of $1 000 over 9 years?', options: ['$1 111', '$1 000', '$900', '$1 100'], correctIndex: 1 },
    ],
  },
}

// ── Fallback questions ─────────────────────────────────────────────────────────

function buildFallback(topic: string, difficulty: QuizDifficulty): QuizQuestion[] {
  const label = topic.replace(/-/g, ' ')
  const diffMap: Record<QuizDifficulty, string> = {
    easy: 'basic',
    medium: 'intermediate',
    hard: 'advanced',
  }
  return Array.from({ length: 5 }, (_, i) => ({
    question: `(${diffMap[difficulty]}) Question ${i + 1} about ${label}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctIndex: i % 4,
  }))
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Generate 5 multiple-choice questions for a topic at the given difficulty.
 */
export function generateQuiz(topic: string, difficulty: QuizDifficulty = 'easy'): QuizQuestion[] {
  const key = topic.toLowerCase().replace(/-/g, '')
  const bank = questionBank[key]
  if (bank) {
    return bank[difficulty]
  }
  // Try partial match
  const partialKey = Object.keys(questionBank).find((k) => topic.toLowerCase().includes(k))
  if (partialKey) {
    return questionBank[partialKey][difficulty]
  }
  return buildFallback(topic, difficulty)
}

/**
 * Grade a quiz. Returns a score from 0–100.
 */
export function gradeQuiz(answers: number[], correctAnswers: number[]): number {
  if (correctAnswers.length === 0) return 0
  const correct = answers.filter((a, i) => a === correctAnswers[i]).length
  return Math.round((correct / correctAnswers.length) * 100)
}

/**
 * Update the student's quiz difficulty based on their latest score,
 * and return the new difficulty level.
 */
export function updateDifficulty(studentId: string, score: number): QuizDifficulty {
  const student = mockStudents.find((s) => s.id === studentId)
  const newDifficulty: QuizDifficulty =
    score >= 80 ? 'hard' : score >= 50 ? 'medium' : 'easy'
  if (student) {
    student.quizDifficulty = newDifficulty
  }
  return newDifficulty
}
