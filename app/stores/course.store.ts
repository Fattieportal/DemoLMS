import { create } from "zustand";
import { decodeHTML } from "~/lib/helpers";
import type { Course, CourseDetail } from "~/models/course.model";
import { courseService } from "~/services/course.service";

interface CourseState {
  courses: Course[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchCourses: (
    token: string,
    page?: number,
    per_page?: number,
  ) => Promise<void>;
  courseDetails: Record<number, CourseDetail>;
  fetchCourseDetail: (token: string, id: number) => Promise<void>;
  lastFetched: number | null;
}

function parseCourseDetail(data: CourseDetail): CourseDetail {
  return {
    ...data,
    title: decodeHTML(data.title),
    excerpt: decodeHTML(data.excerpt),
    lessons: data.lessons.map((l) => ({
      ...l,
      title: decodeHTML(l.title),
      excerpt: decodeHTML(l.excerpt),
      steps: l.steps.map((t) => ({
        ...t,
        title: decodeHTML(t.title),
        excerpt: decodeHTML(t.excerpt),
      })),
    })),
  };
}

function parseCourse(data: Course): Course {
  return {
    ...data,
    title: decodeHTML(data.title),
    excerpt: decodeHTML(data.excerpt),
  };
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  total: 0,
  isLoading: false,
  error: null,
  courseDetails: {},
  lastFetched: null,

  fetchCourses: async (token, page = 1, per_page = 10) => {
    const { lastFetched } = useCourseStore.getState();
    const STALE_MS = 60_000; // 1 minute
    if (lastFetched && Date.now() - lastFetched < STALE_MS) return;
    set({ isLoading: true, error: null });
    try {
      const data = await courseService.list(token, page, per_page);
      set({
        courses: data.items.map(parseCourse),
        total: data.total,
        lastFetched: Date.now(),
      });
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to load courses." });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCourseDetail: async (token, id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await courseService.get(token, id);
      set((s) => ({
        courseDetails: { ...s.courseDetails, [id]: parseCourseDetail(data) },
      }));
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to load module." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
