import { cn } from "../../lib/utils";

interface MessageProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  message: string;
  position: "left" | "right";
}
const Message = ({ message, className, position }: MessageProps) => {
  return (
    <div
      className={cn(
        "px-3 py-2 rounded-2xl max-w-[70%]",
        position === "left" ? "self-start" : "self-end",
        className
      )}
    >
      {message}
    </div>
  );
};

export default Message;
