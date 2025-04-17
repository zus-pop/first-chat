import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "../shared";
import { skip } from "node:test";

interface UserStore {
  currentUser: User | null;
  accessToken: string | null; // Optional property for access token
  refreshToken: string | null; // Optional property for refresh token
  setAccessToken: (token: string) => void; // Optional method to set access token
  setRefreshToken: (token: string) => void; // Optional method to set refresh token
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        accessToken: null,
        refreshToken: null,
        setAccessToken: (token) => set({ accessToken: token }),
        setRefreshToken: (token) => set({ refreshToken: token }),
        setCurrentUser: (user) => set({ currentUser: user }),
        clearCurrentUser: () =>
          set({ currentUser: null, accessToken: null, refreshToken: null }),
      }),
      {
        name: "user-storage", // Unique name for the storage
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
        // skipHydration: true, // Skip hydration for the access token and refresh token
      }
    ),
    {
      enabled: true,
    }
  )
);
