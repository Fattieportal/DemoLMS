import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "~/models/user.model";
import { authService } from "~/services/auth.service";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
  clearError: () => void;

  register: (
    email: string,
    password: string,
    display_name: string,
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const loginRes = await authService.login({ email, password });

          if (!loginRes.success) {
            set({ error: "Invalid credentials.", isLoading: false });
            return false;
          }

          const jwt = loginRes.data.jwt;
          const validateRes = await authService.validateToken(jwt);

          if (!validateRes.success) {
            set({ error: "Token validation failed.", isLoading: false });
            return false;
          }

          set({ token: jwt, user: validateRes.data, isLoading: false });
          return true;
        } catch (err: any) {
          const message =
            err?.response?.data?.data?.message ||
            err?.response?.data?.message ||
            "Something went wrong.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      validateToken: async () => {
        const token = get().token;
        if (!token) return false;

        try {
          const res = await authService.validateToken(token);
          if (res.success) {
            set({ user: res.data });
            return true;
          }
          get().logout();
          return false;
        } catch {
          get().logout();
          return false;
        }
      },

      logout: () => {
        set({ token: null, user: null, error: null });
      },

      register: async (email, password, display_name) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.register(email, password, display_name);

          if (!res.success) {
            set({
              error: res.data?.message || "Registration failed.",
              isLoading: false,
            });
            return false;
          }

          set({ isLoading: false });
          return true;
        } catch (err: any) {
          const message =
            err?.response?.data?.data?.message ||
            err?.response?.data?.message ||
            "Something went wrong.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
