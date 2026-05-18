import { create } from "zustand";
import type { StreakData, PointsData, Achievement } from "~/models/gamification.model";
import { gamificationService } from "~/services/gamification.service";

interface GamificationState {
  streak: StreakData | null;
  points: PointsData | null;
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchStreak: (token: string) => Promise<void>;
  fetchPoints: (token: string) => Promise<void>;
  fetchAchievements: (token: string) => Promise<void>;
  fetchAll: (token: string, force?: boolean) => Promise<void>;
}

const STALE_MS = 60_000;

export const useGamificationStore = create<GamificationState>((set, get) => ({
  streak: null,
  points: null,
  achievements: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchStreak: async (token) => {
    const data = await gamificationService.streak(token);
    set({ streak: data });
  },

  fetchPoints: async (token) => {
    const data = await gamificationService.points(token);
    set({ points: data });
  },

  fetchAchievements: async (token) => {
    const data = await gamificationService.achievements(token);
    set({ achievements: data.achievements });
  },

  fetchAll: async (token, force = false) => {
    const { lastFetched } = get();
    if (!force && lastFetched && Date.now() - lastFetched < STALE_MS) return;

    set({ isLoading: true, error: null });
    try {
      await Promise.all([
        get().fetchStreak(token),
        get().fetchPoints(token),
        get().fetchAchievements(token),
      ]);
      set({ lastFetched: Date.now() });
    } catch (err: any) {
      set({ error: err?.message ?? "Failed to load gamification data." });
    } finally {
      set({ isLoading: false });
    }
  },
}));