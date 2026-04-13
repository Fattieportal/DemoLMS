export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  description: string;
  videoPlaceholder?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  completedLessons: number;
  color: string;
  icon: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}
