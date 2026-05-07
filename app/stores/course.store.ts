import { create } from "zustand";
import type { Course, Lesson } from "~/models/course.model";
import type { CourseProgress, StepProgress } from "~/models/progress.model";

interface DerivedOverallProgress {
  percent: number;
  done: number;
  total: number;
}

type DerivedContinueLearning = {
  course: Course;
  lesson: Lesson | null;
  progress: CourseProgress;
} | null;

export interface LessonStatus {
  completed: boolean;
  inProgress: boolean;
  locked: boolean;
}

interface CourseState {
  courses: Course[];
  progress: CourseProgress[];
  isLoading: boolean;
  error: string | null;

  // Derived selectors
  overallProgress: () => DerivedOverallProgress;
  continueLearning: () => DerivedContinueLearning;
  featuredCourses: (count?: number) => Course[];
  courseProgress: (courseId: number) => CourseProgress | undefined;
  lessonStatus: (courseId: number, lessonId: number) => LessonStatus;
  lessonStatuses: (courseId: number, lessons: Lesson[]) => LessonStatus[];
  lessonQuizSteps: (courseId: number, lessonId: number) => StepProgress[];
  nextLesson: (courseId: number, lessonId: number) => StepProgress | null;
}

// Helper to get flat steps array from embedded response
function getSteps(p: CourseProgress): StepProgress[] {
  return p._embedded?.steps?.[0] ?? [];
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  progress: [],
  isLoading: false,
  error: null,

  overallProgress: () => {
    const { progress } = get();
    if (!progress.length) return { percent: 0, done: 0, total: 0 };

    const total = progress.reduce((sum, p) => sum + p.steps_total, 0);
    const done = progress.reduce((sum, p) => sum + p.steps_completed, 0);
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { percent, done, total };
  },

  continueLearning: () => {
    const { courses, progress } = get();
    if (!progress.length || !courses.length) return null;

    const inProgress = progress
      .filter((p) => p.progress_status === "in_progress" && p.date_started_gmt)
      .sort(
        (a, b) =>
          new Date(b.date_started_gmt).getTime() -
          new Date(a.date_started_gmt).getTime()
      );

    if (!inProgress.length) return null;

    const latestProgress = inProgress[0];
    const course = courses.find((c) => c.id === latestProgress.course);
    if (!course) return null;

    const steps = getSteps(latestProgress);
    const lastLesson = steps.find(
      (s) => s.post_type === "sfwd-lessons" && s.step_status !== "completed"
    );

    const lesson: Lesson | null = lastLesson
      ? {
          id: lastLesson.step,
          title: { rendered: lastLesson.step_name },
          content: { rendered: "" },
          slug: "",
          status: "publish",
          course: course.id,
          menu_order: 0,
          video_enabled: false,
          video_url: "",
          materials_enabled: false,
          materials: { rendered: "" },
          forced_timer_enabled: false,
          forced_timer_amount: 0,
          assignment_upload_enabled: false,
          is_sample: false,
        }
      : null;

    return { course, lesson, progress: latestProgress };
  },

  featuredCourses: (count = 3) => {
    return get().courses.slice(0, count);
  },

  courseProgress: (courseId: number) => {
    return get().progress.find((p) => p.course === courseId);
  },

  lessonStatus: (courseId: number, lessonId: number): LessonStatus => {
    const p = get().progress.find((p) => p.course === courseId);
    const steps = getSteps(p!);
    const step = steps.find(
      (s) => s.step === lessonId && s.post_type === "sfwd-lessons"
    );
    return {
      completed: step?.step_status === "completed",
      inProgress: step?.step_status === "in_progress",
      locked: !step || step.step_status === "not_started",
    };
  },

  lessonStatuses: (courseId: number, lessons: Lesson[]): LessonStatus[] => {
    const p = get().progress.find((cp) => cp.course === courseId);
    const steps = getSteps(p!);

    return lessons.map((lesson, i) => {
      const step = steps.find(
        (s) => s.step === lesson.id && s.post_type === "sfwd-lessons"
      );
      const completed = step?.step_status === "completed";
      const inProgress = step?.step_status === "in_progress";

      const previousCompleted =
        i === 0 ||
        steps.find(
          (s) =>
            s.step === lessons[i - 1].id && s.post_type === "sfwd-lessons"
        )?.step_status === "completed";

      const locked = !completed && !inProgress && !previousCompleted;

      return { completed, inProgress, locked };
    });
  },

  // Returns quiz steps that belong to a specific lesson
  // In LearnDash steps array, quizzes appear immediately after their parent lesson
  lessonQuizSteps: (courseId: number, lessonId: number): StepProgress[] => {
    const p = get().progress.find((cp) => cp.course === courseId);
    const steps = getSteps(p!);

    const lessonIndex = steps.findIndex(
      (s) => s.step === lessonId && s.post_type === "sfwd-lessons"
    );
    if (lessonIndex === -1) return [];

    // Collect quiz/topic steps until next lesson
    const quizzes: StepProgress[] = [];
    for (let i = lessonIndex + 1; i < steps.length; i++) {
      if (steps[i].post_type === "sfwd-lessons") break;
      if (steps[i].post_type === "sfwd-quiz") quizzes.push(steps[i]);
    }
    return quizzes;
  },

  // Returns next lesson step after the given lesson
  nextLesson: (courseId: number, lessonId: number): StepProgress | null => {
    const p = get().progress.find((cp) => cp.course === courseId);
    const steps = getSteps(p!);

    const lessonSteps = steps.filter((s) => s.post_type === "sfwd-lessons");
    const currentIndex = lessonSteps.findIndex((s) => s.step === lessonId);
    if (currentIndex === -1 || currentIndex === lessonSteps.length - 1) return null;

    return lessonSteps[currentIndex + 1];
  },
}));