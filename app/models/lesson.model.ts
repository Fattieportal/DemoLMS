export interface Step {
  id: number;
  type: "topic" | "quiz";
  title: string;
  completed: boolean;
  excerpt: string;
}

export interface LessonDetail {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  course_id: number;
  steps: Step[];
  next: {
    id: number;
    title: string;
    type: "lesson" | "topic" | "quiz";
  } | null;
}

export interface TopicDetail {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  course_id: number;
  next: {
    id: number;
    title: string;
    type: "lesson" | "topic" | "quiz";
  } | null;
}