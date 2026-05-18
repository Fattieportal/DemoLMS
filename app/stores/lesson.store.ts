import { create } from "zustand";
import { decodeHTML } from "~/lib/helpers";
import type { LessonDetail, TopicDetail } from "~/models/lesson.model";
import { lessonService } from "~/services/lesson.service";

interface LessonState {
  lesson: LessonDetail | null;
  isLoading: boolean;
  error: string | null;
  topicCompleted: boolean;
  fetchLesson: (token: string, id: number) => Promise<void>;
  completeLesson: (token: string, id: number) => Promise<void>;
  completeTopic: (token: string, id: number) => Promise<void>;
  reset: () => void;
  topic: TopicDetail | null;
  fetchTopic: (token: string, id: number) => Promise<void>;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lesson: null,
  isLoading: false,
  error: null,
  topicCompleted: false,
  topic: null,

  fetchTopic: async (token, id) => {
    try {
      const data = await lessonService.getTopic(token, id);
      set({ topic: { ...data, title: decodeHTML(data.title) } });
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to load topic." });
    }
  },
  fetchLesson: async (token, id) => {
    set({ isLoading: true, error: null, topicCompleted: false });
    try {
      const data = await lessonService.get(token, id);
      set({
        lesson: {
          ...data,
          title: decodeHTML(data.title),
          steps: data.steps.map((s) => ({ ...s, title: decodeHTML(s.title) })),
        },
        topicCompleted:
          data.steps.find((s) => s.type === "topic")?.completed ?? false,
      });
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to load lesson." });
    } finally {
      set({ isLoading: false });
    }
  },

  completeTopic: async (token, id) => {
    try {
      await lessonService.completeTopic(token, id);
      set({ topicCompleted: true });
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to complete topic." });
    }
  },

  completeLesson: async (token, id) => {
    try {
      await lessonService.complete(token, id);
      set((s) =>
        s.lesson ? { lesson: { ...s.lesson, completed: true } } : {},
      );
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to complete lesson." });
    }
  },

  reset: () =>
    set({
      lesson: null,
      topic: null,
      topicCompleted: false,
      error: null,
      isLoading: false,
    }),
}));
