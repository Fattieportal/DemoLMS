import { create } from "zustand";
import { decodeHTML } from "~/lib/helpers";
import type { QuizDetail, QuizResult } from "~/models/quiz.model";
import { quizService } from "~/services/quiz.service";


interface QuizState {
  quiz: QuizDetail | null;
  result: QuizResult | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  fetchQuiz: (token: string, id: number) => Promise<void>;
  submitQuiz: (
    token: string,
    id: number,
    answers: Record<string, number>,
  ) => Promise<void>;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quiz: null,
  result: null,
  isLoading: false,
  isSubmitting: false,
  error: null,

  fetchQuiz: async (token, id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await quizService.get(token, id);
      set({
        quiz: {
          ...data,
          title: decodeHTML(data.title),
          questions: Object.entries(data.questions ?? {}).map(
            ([key, q]: [string, any]) => ({
              ...q,
              id: Number(key),
              title: decodeHTML(q.title),
              answers: (q.answers ?? []).map((a: any) => ({
                ...a,
                text: decodeHTML(a.text),
              })),
            }),
          ),
        },
      });
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to load quiz." });
    } finally {
      set({ isLoading: false });
    }
  },

  submitQuiz: async (token, id, answers) => {
    set({ isSubmitting: true, error: null });
    try {
      const result = await quizService.submit(token, id, answers);
      set({ result });
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to submit quiz." });
    } finally {
      set({ isSubmitting: false });
    }
  },

  reset: () => set({ quiz: null, result: null, error: null }),
}));
