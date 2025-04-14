import UserMessage from "@/components/ui/user-message";
import { useChatStore, useUserStore } from "../stores";

const ChatView = () => {
  const currentConversation = useChatStore(
    (state) => state.currentConversation
  );
  const currentUser = useUserStore((state) => state.currentUser);
  return (
    <div className="flex flex-col gap-4 p-4 h-screen overflow-y-auto">
      {currentConversation?.messages
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
        .map((message) => (
          <UserMessage
            key={message.id}
            currentUserId={currentUser?.id as number}
            message={message}
            className={`${
              message.senderId === currentUser?.id
                ? "bg-black text-white"
                : "bg-gray-300"
            } px-4 py-2 rounded-xl`}
          />
        ))}
    </div>
  );
};

export default ChatView;
