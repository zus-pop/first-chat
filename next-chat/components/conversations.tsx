import { useQuery } from "@tanstack/react-query";
import { getAllConversationsByMe } from "../apis";
import { useChatStore } from "../stores/ChatStore";
import { joinRoom } from "../websocket/socket";
import { useUserStore } from "../stores";

const Conversations = () => {
  const user = useUserStore((state) => state.currentUser);
  const accessToken = useUserStore((state) => state.accessToken);
  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: getAllConversationsByMe,
    retry: false,
    enabled: !!user && !!accessToken,
  });

  const setCurrentConversation = useChatStore(
    (state) => state.setCurrentConversation
  );

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full px-3 py-2">
      {conversations?.map((conversation) => (
        <div
          className="bg-gray-300 px-4 py-2 rounded-xl"
          key={conversation.id}
          onClick={() => {
            setCurrentConversation(conversation);
            joinRoom(conversation);
          }}
        >
          {/* <img src={user.avatar} alt={user.name} /> */}
          <p>{conversation.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
