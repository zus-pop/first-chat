import { SendIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

const ChatBox = () => {
  return (
    <div className="flex justify-around items-center gap-2">
      <Textarea
        className="resize-none rounded-xl p-2 border-gray-300 border-2"
        placeholder="Type a message..."
      />
      <SendIcon />
    </div>
  );
};

export default ChatBox;
