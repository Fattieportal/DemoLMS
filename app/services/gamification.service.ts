import { API_URL } from "~/constant";
import type { StreakData, PointsData, AchievementsData } from "~/models/gamification.model";

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

export const gamificationService = {
  streak: (token: string) =>
    fetch(`${API_URL}/gamification/streak`, {
      headers: authHeader(token),
    }).then((r) => handleResponse<StreakData>(r)),

  points: (token: string) =>
    fetch(`${API_URL}/gamification/points`, {
      headers: authHeader(token),
    }).then((r) => handleResponse<PointsData>(r)),

  achievements: (token: string) =>
    fetch(`${API_URL}/gamification/achievements`, {
      headers: authHeader(token),
    }).then((r) => handleResponse<AchievementsData>(r)),
};
