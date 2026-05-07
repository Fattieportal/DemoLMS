import api from "~/lib/api";
import type { Course, Lesson } from "~/models/course.model";
import type { CourseProgress } from "~/models/progress.model";

export const courseService = {
  getCourses: async (params?: {
    per_page?: number;
    page?: number;
  }): Promise<Course[]> => {
    const res = await api.get<Course[]>("/ldlms/v2/sfwd-courses", {
      params: { ...params, _embed: true },
    });
    return res.data;
  },

  getCourse: async (id: number): Promise<Course> => {
    const res = await api.get<Course>(`/ldlms/v2/sfwd-courses/${id}`, {
      params: { _embed: true },
    });
    return res.data;
  },

  getLessons: async (courseId: number): Promise<Lesson[]> => {
    const res = await api.get<Lesson[]>("/ldlms/v2/sfwd-lessons", {
      params: { course: courseId, per_page: 100 },
    });
    return res.data;
  },

  getLesson: async (lessonId: number): Promise<Lesson> => {
    const res = await api.get<Lesson>(`/ldlms/v2/sfwd-lessons/${lessonId}`);
    return res.data;
  },

  getUserCourseProgress: async (userId: number): Promise<CourseProgress[]> => {
    const res = await api.get<CourseProgress[]>(
      `/ldlms/v2/users/${userId}/course-progress`,
      { params: { per_page: 100, _embed: true } }
    );
    return res.data;
  },

  getUserCourseProgressById: async (
    userId: number,
    courseId: number
  ): Promise<CourseProgress> => {
    const res = await api.get<CourseProgress>(
      `/ldlms/v2/users/${userId}/course-progress/${courseId}`,
      { params: { _embed: true } }
    );
    return res.data;
  },
};