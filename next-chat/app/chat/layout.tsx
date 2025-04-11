"use client";
import ChatSidebar from "@/components/chat-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { useChatStore } from "../../stores/ChatStore";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentConversation = useChatStore(
    (state) => state.currentConversation
  );
  return (
    <SidebarProvider>
      <ChatSidebar />
      <main className="flex h-screen w-screen flex-col gap-4 p-2 mx-2">
        <div className="flex w-full items-center justify-start gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">{currentConversation?.name}</h1>
        </div>
        <hr className="border-gray-950 border-2 rounded-2xl" />
        {children}
      </main>
    </SidebarProvider>
  );
}
