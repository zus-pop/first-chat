"use client";

import ChatView from "../../components/chat-view";

export default function Page() {
  return (
    <div className="flex h-screen flex-col gap-4 overflow-hidden p-4">
      <ChatView />
    </div>
  );
}
