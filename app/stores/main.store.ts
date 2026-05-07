import { create } from "zustand";

interface MainStore {
  showBack: boolean;
  toggleShowBack: () => void;
  setShowBack: (value: boolean) => void;
  hideTabs: boolean;
  toggleHideTabs: () => void;
  setHideTabs: (value: boolean) => void;
}

const useMainStore = create<MainStore>((set) => ({
  showBack: false,
  toggleShowBack: () => set((state) => ({ showBack: !state.showBack })),
  setShowBack: (value: boolean) => set({ showBack: value }),
  hideTabs: false,
  toggleHideTabs: () => set((state) => ({ hideTabs: !state.hideTabs })),
  setHideTabs: (value: boolean) => set({ hideTabs: value }),
}));

export default useMainStore;
