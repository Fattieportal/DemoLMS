import { API_URL } from "~/constant";
import type { AuthResponse, LoginPayload } from "~/models/auth.model";

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

export const authService = {
  login: (payload: LoginPayload) =>
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => handleResponse<AuthResponse>(r)),

  refresh: (refresh_token: string) =>
    fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token }),
    }).then((r) => handleResponse<AuthResponse>(r)),

  logout: (access_token: string) =>
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then((r) => handleResponse<{}>(r)),

  register: (payload: {
    username: string;
    email: string;
    password: string;
    display_name: string;
  }) =>
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => handleResponse<AuthResponse>(r)),
};
