"use client";
import ChatSidebar from "@/components/chat-sidebar";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";
import AuthGuard from "../../components/auth-guard";
import { useChatStore } from "@/stores";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentConversation = useChatStore(
    (state) => state.currentConversation
  );

  return (
    <AuthGuard>
      <SidebarProvider>
        <ChatSidebar />
        <main className="flex h-screen w-screen flex-col gap-4 p-2 mx-2">
          <div className="flex w-full items-center justify-start gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">{currentConversation?.name}</h1>
          </div>

          {currentConversation !== null ? (
            <>
              <hr className="border-gray-950 border-2 rounded-2xl" />
              {children}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <h1 className="text-2xl font-bold">Select a conversation</h1>
            </div>
          )}
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}
