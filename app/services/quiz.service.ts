import { API_URL } from "~/constant";
import type { QuizDetail, QuizResult } from "~/models/quiz.model";

interface ApiSuccess<T> { success: true; message: string; data: T; }
interface ApiError { code: string; message: string; data: { status: number }; }

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) throw json as ApiError;
  return (json as ApiSuccess<T>).data;
}

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export const quizService = {
  get: (token: string, id: number) =>
    fetch(`${API_URL}/quizzes/${id}`, { headers: authHeader(token) })
      .then((r) => handleResponse<QuizDetail>(r)),

  submit: (token: string, id: number, answers: Record<string, number>) =>
    fetch(`${API_URL}/quizzes/${id}/submit`, {
      method: "POST",
      headers: authHeader(token),
      body: JSON.stringify({ answers }),
    }).then((r) => handleResponse<QuizResult>(r)),
};