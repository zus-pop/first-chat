import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarRail,
} from "@components/ui/sidebar";
import Contacts from "./contacts";
import Conversations from "./conversations";

const ChatSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Your Avatar</SidebarHeader>
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
