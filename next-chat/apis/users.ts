import { Contact, Conversation } from "../shared";
import myAxios from "../utils/myAxios";

export const getAllUsers = async () => {
  try {
    const res = await myAxios.get(`api/users`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users. Please try again.");
  }
};

export const getAllContactByMe = async () => {
  try {
    const res = await myAxios.get<Contact[]>(`api/users/me/contacts`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts. Please try again.");
  }
};

export const getAllConversationsByMe = async () => {
  try {
    const res = await myAxios.get<Conversation[]>(`api/users/me/conversations`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw new Error("Failed to fetch conversations. Please try again.");
  }
};
