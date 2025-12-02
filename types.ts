export enum Screen {
  HOME = 'HOME',
  MAP = 'MAP',
  DESIGN = 'DESIGN',
  STRATEGY = 'STRATEGY',
  RESULT = 'RESULT',
  DASHBOARD = 'DASHBOARD'
}

export enum AmbitionLevel {
  LOCAL = 'A', // Petit sentier
  PILOT = 'B', // Traversée
  NONE = 'C'   // Renforcement existant
}

export interface OptionItem {
  id: string;
  label: string;
  impact?: 'positive' | 'negative' | 'neutral'; // Internal logic helper
  riskFactor?: number; // 1-5, higher increases storm chance
  educationalFeedback?: string; // New: Specific explanation for this choice
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  context: string;
  publics: string[];
  difficulty: number; // 1-3 (Displayed as hiking difficulty)
  expertComment?: string; // New: General educational context for this challenge
  
  // Suggested options for this challenge
  suggestedUseCases: OptionItem[];
  suggestedBenefits: OptionItem[];
  suggestedRisks: OptionItem[];
  suggestedData: OptionItem[];
}

export interface UserChoice {
  challengeId: string;
  useCase: string; // Free text or selected
  selectedBenefits: string[];
  selectedData: string[];
  selectedRisks: string[];
  selectedSafeguards: string[];
  ambition: AmbitionLevel;
}

export interface CompletedHike {
  challengeId: string;
  choices: UserChoice;
  score: number; // 0-100
  feedback: string[];
  date: string;
}

export interface GlobalState {
  screen: Screen;
  history: CompletedHike[];
  activeChallenge: Challenge | null;
  currentChoices: UserChoice | null;
}