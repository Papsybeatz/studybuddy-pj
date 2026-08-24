export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: number;
  nextReview: Date;
}
