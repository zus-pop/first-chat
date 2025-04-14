export interface JwtResponse {
  access_token: string;
  refresh_token: string | undefined;
}

export interface Contact {
  ownerId: number;
  contactId: number;
  contactName: string;
  status: "ACCEPT" | "PENDING" | "BLOCKED";
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: "ONLINE" | "OFFLINE" | "AWAY";
  contacts?: Contact[]; // Optional property for contacts
  conversations?: Conversation[]; // Optional property for conversations
}

export interface Message {
  id: number;
  text: string;
  senderId: number;
  timestamp: Date;
  user?: User; // Optional property for user
}

export interface Conversation {
  id: number;
  type: "GROUP" | "ONE_TO_ONE"; // Type of conversation
  name: string; // Group name or user ID for one-on-one chat
  participants: User[]; // Array of user IDs
  messages: Message[];
}
