import { API_URL } from "~/constant";
import type { LessonDetail, TopicDetail } from "~/models/lesson.model";

interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}
interface ApiError {
  code: string;
  message: string;
  data: { status: number };
}

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) throw json as ApiError;
  return (json as ApiSuccess<T>).data;
}

function authHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export const lessonService = {
  get: (token: string, id: number) =>
    fetch(`${API_URL}/lessons/${id}`, { headers: authHeader(token) }).then(
      (r) => handleResponse<LessonDetail>(r),
    ),

  complete: (token: string, id: number) =>
    fetch(`${API_URL}/lessons/${id}/complete`, {
      method: "POST",
      headers: authHeader(token),
    }).then((r) =>
      handleResponse<{
        completed: boolean;
        lesson_id: number;
        points_earned: number;
        streak: any;
      }>(r),
    ),

  completeTopic: (token: string, id: number) =>
    fetch(`${API_URL}/topics/${id}/complete`, {
      method: "POST",
      headers: authHeader(token),
    }).then((r) =>
      handleResponse<{
        completed: boolean;
        topic_id: number;
        points_earned: number;
        streak: any;
      }>(r),
    ),

  getTopic: (token: string, id: number) =>
    fetch(`${API_URL}/topics/${id}`, { headers: authHeader(token) }).then((r) =>
      handleResponse<TopicDetail>(r),
    ),
};
