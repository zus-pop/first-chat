import { create } from "zustand";
import { Conversation, Message } from "../shared";

interface ChatStore {
  currentConversation: Conversation | null; // ID of the currently active conversation
  sendMessage: (message: Message) => void; // Send a message to a conversation
  setCurrentConversation: (conversation: Conversation) => void; // Set the current conversation by ID
}

export const useChatStore = create<ChatStore>()((set) => ({
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
