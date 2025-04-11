import { useChatStore } from "../stores/ChatStore";
import { useUserStore } from "../stores/UserStore";
import Message from "./ui/message";

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
          <Message
            key={message.id}
            message={message.text}
            position={message.senderId === currentUser?.id ? "right" : "left"}
            className={`${
              message.senderId === currentUser?.id
                ? "bg-black text-white"
                : "bg-gray-300"
            } px-4 py-2 -mt-4 mb-2 rounded-xl`}
          />
        ))}
    </div>
  );
};

export default ChatView;
