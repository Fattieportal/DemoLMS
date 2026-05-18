import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User, AuthResponse } from "~/models/auth.model";
import { authService } from "~/services/auth.service";

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  isLoading: boolean;
  error: string | null;
    isAuthenticated: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuth: (data: AuthResponse) => void;
  clearError: () => void;
  register: (display_name: string, email: string, password: string) => Promise<void>;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (data) =>
        set({
          user: data.user,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          isAuthenticated: true,
        }),

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login({ username, password });
          get().setAuth(data);
        } catch (err: any) {
          set({ error: err?.message ?? "Login failed." });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (display_name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const username = email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "_");
          const data = await authService.register({ username, email, password, display_name });
          get().setAuth(data);
        } catch (err: any) {
          set({ error: err?.message ?? "Registration failed." });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        const token = get().access_token;
        if (token) await authService.logout(token).catch(() => {});
        set({ user: null, access_token: null, refresh_token: null, isAuthenticated: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
