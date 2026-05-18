export interface QuizAnswer {
  id: number;
  text: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  type: "single";
  answers: QuizAnswer[];
}

export interface QuizDetail {
  id: number;
  title: string;
  course_id: number;
  questions: QuizQuestion[];
  next: {
    id: number;
    title: string;
    type: "lesson" | "topic" | "quiz";
  } | null;
}

export interface QuizResult {
  quiz_id: number;
  passed: boolean;
  score: number;
  correct: number;
  total: number;
  points_earned: number;
  results: {
    question_id: number;
    is_correct: boolean;
    correct_answer: number[];
  }[];
}