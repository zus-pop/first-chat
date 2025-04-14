import { AvatarFallback } from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage } from "./avatar";
import { Message } from "../../shared";

interface MessageProps extends React.HTMLProps<HTMLDivElement> {
  className: string;
  message: Message;
  currentUserId: number;
}

const UserMessage = ({ message, className, currentUserId }: MessageProps) => {
  const UserAvatar = () => (
    <Avatar className="w-10 h-10">
      <AvatarImage src={message.user?.avatar} />
      <AvatarFallback>Pop</AvatarFallback>
    </Avatar>
  );

  const position = message.senderId === currentUserId ? "right" : "left";
  
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        position === "left" ? "self-start" : "self-end"
      )}
    >
      {position === "left" && <UserAvatar />}
      <div
        className={cn(
          "rounded-2xl",
          position === "left" ? "bg-gray-200" : "bg-blue-500 text-white",
          className
        )}
      >
        {message.text}
      </div>
      {position === "right" && <UserAvatar />}
    </div>
  );
};

export default UserMessage;
