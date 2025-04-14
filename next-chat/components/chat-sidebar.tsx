import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarRail,
} from "@components/ui/sidebar";
import { PopoverContent } from "@radix-ui/react-popover";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../stores";
import Contacts from "./contacts";
import Conversations from "./conversations";
import { Popover, PopoverTrigger } from "./ui/popover";

const ChatSidebar = () => {
  const me = useUserStore((state) => state.currentUser);
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={me?.avatar} />
            <AvatarFallback>Popcorn</AvatarFallback>
          </Avatar>
          <span className="text-lg">{me?.name}</span>
          <Popover>
            <PopoverTrigger>
              <Settings className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="z-10 w-72 border-2 border-gray-50 text-white rounded-lg bg-gray-900">
              <div className="flex flex-col gap-2 p-4">
                <h1 className="text-md font-bold">Settings</h1>
                <p
                  onClick={() => {
                    useUserStore.getState().clearCurrentUser();
                    router.replace("/auth");
                  }}
                  className="text-sm cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-all duration-200 ease-in-out"
                >
                  Logout
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>People</SidebarGroupLabel>
          <SidebarGroupContent>
            <Contacts />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Conversation</SidebarGroupLabel>
          <SidebarGroupContent>
            <Conversations />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default ChatSidebar;
