import UserMessage from "@/components/ui/user-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Message, User } from "../shared";
import { useChatStore, useUserStore } from "../stores";
import {
  MESSAGE_EVENT,
  SENT_MESSAGE_EVENT,
  useSocket,
} from "../websocket/socket";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  text: z.string(),
});

const ChatView = () => {
  const currentConversation = useChatStore(
    (state) => state.currentConversation
  );
  const { socket, isConnected } = useSocket();
  const conversationRef = useRef<HTMLDivElement>(null);
  const currentUser = useUserStore((state) => state.currentUser);
  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessage = useChatStore((state) => state.updateMessage);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    if (!isConnected || !currentConversation) return;

    socket.on(SENT_MESSAGE_EVENT, addMessage);

    return () => {
      socket.off(SENT_MESSAGE_EVENT, addMessage);
    };
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const message: Omit<Message, "id" | "timestamp"> = {
      text: data.text,
      senderId: currentUser?.id as number,
      conversationId: currentConversation?.id as number,
    };

    // socket.emit(MESSAGE_EVENT, message);
    form.resetField("text");
    addMessage({
      ...message,
      user: currentUser as User,
      id: Math.floor(Math.random() * 1000000),
    });
    if (conversationRef.current) {
      requestAnimationFrame(() => {
        conversationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });
    }
  };

  const processedMessages = currentConversation?.messages.map(
    (message, index) => {
      const nextMessage =
        index < currentConversation.messages.length - 1
          ? currentConversation.messages[index + 1]
          : null;

      const prevMessage =
        index > 0 ? currentConversation.messages[index - 1] : null;

      // Check if this is the first message in a group
      const isFirstMessage =
        !prevMessage ||
        prevMessage.senderId !== message.senderId ||
        // Optional: Group by time (e.g., if messages are >5 minutes apart)
        new Date(message.timestamp!).getTime() -
          new Date(prevMessage.timestamp!).getTime() >
          5 * 60 * 1000;

      // Check if this is the last message in a group from this sender
      const isLastMessage =
        !nextMessage ||
        nextMessage.senderId !== message.senderId ||
        // Optional: Group by time (e.g., if messages are >5 minutes apart)
        new Date(nextMessage.timestamp!).getTime() -
          new Date(message.timestamp!).getTime() >
          5 * 60 * 1000;

      return {
        ...message,
        isLastMessage,
        isFirstMessage,
      };
    }
  );

  return (
    <>
      <div className="flex flex-col gap-1 px-4 h-screen overflow-y-auto">
        {processedMessages
          ?.sort(
            (a, b) =>
              new Date(a.timestamp!).getTime() -
              new Date(b.timestamp!).getTime()
          )
          .map((message) => (
            <UserMessage
              isLastMessage={message.isLastMessage}
              isFirstMessage={message.isFirstMessage}
              type={currentConversation?.type!}
              key={message.id}
              currentUser={currentUser}
              message={message}
              className={`${
                message.senderId === currentUser?.id
                  ? "bg-black text-white"
                  : "bg-gray-300"
              } px-4 py-2 rounded-xl`}
            />
          ))}
        <div ref={conversationRef}></div>
      </div>
      <Form {...form}>
        <form
          className="flex gap-2 items-center"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex-1/2">
                <FormControl>
                  <Input
                    className="resize-none rounded-xl p-4 border-gray-300 border-2 h-14 text-wrap break-words"
                    placeholder="Aa"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isDirty}
            className="rounded-full p-6 text-2xl bg-black text-white hover:bg-gray-600"
          >
            <SendIcon />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChatView;
