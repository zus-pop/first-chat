import { create } from "zustand";

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  isGroup: boolean; // true if group chat, false if one-on-one
  name: string; // Group name or user ID for one-on-one chat
  participants: string[]; // Array of user IDs
  messages: Message[];
}

interface ChatStore {
  currentConversation: Conversation | null; // ID of the currently active conversation
  sendMessage: (message: Message) => void; // Send a message to a conversation
  setCurrentConversation: (conversation: Conversation) => void; // Set the current conversation by ID
}

export const useChatStore = create<ChatStore>((set) => ({
  currentConversation: null,
  sendMessage: (message) =>
    set((state) => {
      if (state.currentConversation) {
        state.currentConversation.messages.push(message);
        return { currentConversation: state.currentConversation };
      }
      return state;
    }),

  setCurrentConversation: (conversation: Conversation) =>
    set(() => {
      return { currentConversation: conversation };
    }),
}));
