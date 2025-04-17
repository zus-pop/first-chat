import { AvatarFallback } from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";
import { Conversation, Message, User } from "../../shared";
import { Avatar, AvatarImage } from "./avatar";

interface MessageProps extends React.HTMLProps<HTMLDivElement> {
  className: string;
  message: Message;
  currentUser: User | null;
  isLastMessage: boolean;
  isFirstMessage: boolean;
  type: Conversation["type"];
}

const UserMessage = ({
  message,
  className,
  currentUser,
  isLastMessage,
  isFirstMessage,
  type,
}: MessageProps) => {
  const UserAvatar = () => (
    <Avatar className="w-10 h-10">
      <AvatarImage src={message.user?.avatar} />
      <AvatarFallback>Pop</AvatarFallback>
    </Avatar>
  );

  const position = message.senderId === currentUser?.id ? "right" : "left";

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        position === "left" ? "self-start" : "self-end"
      )}
    >
      {position === "left" && isLastMessage ? (
        <UserAvatar />
      ) : (
        <div className="w-10 h-10" />
      )}
      <div className="flex flex-col gap-2 items-start">
        {message.senderId !== currentUser?.id &&
          type === "GROUP" &&
          isFirstMessage && (
            <p className="text-sm text-gray-800 ml-2 mt-2">
              {message.user?.name}
            </p>
          )}
        <div
          className={cn(
            "rounded-2xl text-wrap break-words",
            position === "left" ? "bg-gray-200" : "bg-blue-500 text-white",
            className
          )}
        >
          {message.text}
        </div>
      </div>
      {/* {position === "right" && <UserAvatar />} */}
    </div>
  );
};

export default UserMessage;
