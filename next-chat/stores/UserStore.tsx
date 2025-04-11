import { create } from "zustand";
import { Conversation } from "./ChatStore";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  contacts?: User[]; // Optional property for contacts
  conversations?: Conversation[]; // Optional property for conversations
}
interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}
export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
}));
