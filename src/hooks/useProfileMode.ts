import { create } from "zustand";

type ProfileMode = "personal" | "business";

interface ProfileModeState {
  mode: ProfileMode;
  toggleMode: () => void;
}

export const useProfileMode = create<ProfileModeState>((set) => ({
  mode: "personal", // default lowercase
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "personal" ? "business" : "personal",
    })),
}));
