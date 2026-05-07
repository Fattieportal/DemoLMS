import { create } from "zustand";
import { userService } from "~/services/user.service";
import type { AppUser } from "~/models/user.model";

interface UserState {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  fetchMe: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const wpUser = await userService.getMe();
      set({
        user: {
          ...wpUser,
          streak: 7,    // mocked
          points: 1240, // mocked
        },
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to load user.",
        isLoading: false,
      });
    }
  },
}));