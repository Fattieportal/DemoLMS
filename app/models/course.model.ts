export interface Course {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  enrolled: boolean;
  progress_percent: number;
  total_steps: number;
  completed_steps: number;
  permalink: string;
}

export interface Lesson {
  id: number;
  title: string;
  index: number;
  accessible: boolean;
  completed: boolean;
  permalink: string;
  thumbnail: string | null;
  excerpt: string;
  steps: Step[];
}

export interface Step {
  id: number;
  title: string;
  completed: boolean;
  excerpt: string;
  type: string;
}

export interface CourseDetail extends Course {
  lessons: Lesson[];
}

export interface CoursesPage {
  items: Course[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export function getCourseImage(course: Course): string | null {
  return course.thumbnail ?? null;
}