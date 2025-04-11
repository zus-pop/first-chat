import { useChatStore } from "../stores/ChatStore";
import { useUserStore } from "../stores/UserStore";

const Conversations = () => {
  let conversations = useUserStore((state) => state.currentUser?.conversations);
  const setCurrentConversation = useChatStore(
    (state) => state.setCurrentConversation
  );
  conversations = [
    {
      id: "1",
      isGroup: false,
      name: "Bap rang bo",
      participants: ["1", "2"],
      messages: [
        {
          id: "1",
          text: "Hello",
          senderId: "1",
          timestamp: new Date(),
        },
        {
          id: "2",
          text: "Hi",
          senderId: "2",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      isGroup: true,
      name: "Pop Corn",
      participants: ["1", "3"],
      messages: [
        {
          id: "1",
          text: "Hello",
          senderId: "1",
          timestamp: new Date("2023-10-01"),
        },
        {
          id: "2",
          text: "Hi",
          senderId: "3",
          timestamp: new Date("2022-10-02"),
        },
        {
          id: "3",
          text: "How are you?",
          senderId: "1",
          timestamp: new Date("2023-10-03"),
        },
        {
          id: "4",
          text: "I am fine",
          senderId: "3",
          timestamp: new Date("2023-10-04"),
        },
        {
          id: "5",
          text: "What about you?",
          senderId: "3",
          timestamp: new Date("2023-10-05"),
        },
        {
          id: "6",
          text: "I am fine too",
          senderId: "1",
          timestamp: new Date("2023-10-06"),
        },
        {
          id: "7",
          text: "What are you doing?",
          senderId: "1",
          timestamp: new Date("2023-10-07"),
        },
        {
          id: "8",
          text: "I am watching a movie",
          senderId: "3",
          timestamp: new Date("2023-10-08"),
        },
        {
          id: "9",
          text: "What movie?",
          senderId: "1",
          timestamp: new Date("2023-10-09"),
        },
        {
          id: "10",
          text: "The Matrix",
          senderId: "3",
          timestamp: new Date("2023-10-10"),
        },
        {
          id: "11",
          text: "I love that movie",
          senderId: "1",
          timestamp: new Date("2023-10-11"),
        },
        {
          id: "12",
          text: "Me too",
          senderId: "3",
          timestamp: new Date("2023-10-12"),
        },
        {
          id: "13",
          text: "What is your favorite movie?",
          senderId: "1",
          timestamp: new Date("2023-10-13"),
        },
        {
          id: "14",
          text: "Inception",
          senderId: "3",
          timestamp: new Date("2023-10-14"),
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full px-3 py-2">
      {conversations?.map((conversation) => (
        <div
          className="bg-gray-300 px-4 py-2 rounded-xl"
          key={conversation.id}
          onClick={() => setCurrentConversation(conversation)}
        >
          {/* <img src={user.avatar} alt={user.name} /> */}
          <p>{conversation.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
