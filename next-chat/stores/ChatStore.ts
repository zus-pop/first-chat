import { create } from "zustand";
import { Conversation, Message } from "../shared";
import { persist } from "zustand/middleware";

interface ChatStore {
  currentConversation: Conversation | null; // ID of the currently active conversation
  addMessage: (message: Message) => void; // Send a message to a conversation
  updateMessage: (message: Message) => void; // Update a message in the conversation
  setCurrentConversation: (conversation: Conversation) => void; // Set the current conversation by ID
  clearCurrentConversation: () => void; // Clear the current conversation
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      currentConversation: null,
      addMessage: (message) =>
        set((state) => {
          if (
            state.currentConversation &&
            message.conversationId === state.currentConversation.id
          ) {
            state.currentConversation.messages.push(message);
            return { currentConversation: { ...state.currentConversation } };
          }
          return state;
        }),
      updateMessage: (message) =>
        set((state) => {
          if (
            state.currentConversation &&
            message.conversationId === state.currentConversation.id
          ) {
            const index = state.currentConversation.messages.findIndex(
              (msg) => msg.id === message.id
            );
            if (index !== -1) {
              state.currentConversation.messages[index] = message;
              return {
                currentConversation: {
                  ...state.currentConversation,
                },
              };
            }
          }
          return state;
        }),
      setCurrentConversation: (conversation: Conversation) =>
        set({ currentConversation: { ...conversation } }),
      clearCurrentConversation: () => {
        set({ currentConversation: null });
      },
    }),
    {
      name: "chat-storage", // Unique name for the storage
    }
  )
);
