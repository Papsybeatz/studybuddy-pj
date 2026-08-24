export interface QuizQuestion {
  id: string;
  prompt: string;
  options?: string[];
  answer: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  score?: number;
}
