import { create } from "zustand";

interface MainStore {
  showBack: boolean;
  toggleShowBack: () => void;
  setShowBack: (value: boolean) => void;
  hideTabs: boolean;
  toggleHideTabs: () => void;
  setHideTabs: (value: boolean) => void;
  mode: "light" | "dark";
  toggleMode: () => void;
  setMode: (mode: "light" | "dark") => void;
}

const useMainStore = create<MainStore>((set) => ({
  showBack: false,
  toggleShowBack: () => set((state) => ({ showBack: !state.showBack })),
  setShowBack: (value: boolean) => set({ showBack: value }),
  hideTabs: false,
  toggleHideTabs: () => set((state) => ({ hideTabs: !state.hideTabs })),
  setHideTabs: (value: boolean) => set({ hideTabs: value }),
  mode: "light",
  toggleMode: () => set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
  setMode: (mode: "light" | "dark") => set({ mode }),
}));

export default useMainStore;
