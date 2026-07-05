export type AgeType = 'Earth' | 'LEO' | 'Moon' | 'Mars' | 'Interstellar';

export interface AssessmentResult {
  score: number;
  level: string;
  multiplier: string;
}

export interface PromptTemplate {
  role: string;
  task: string;
  context: string;
  format: string;
  constraints: string;
}
