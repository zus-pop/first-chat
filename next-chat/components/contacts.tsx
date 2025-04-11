import { useEffect } from "react";
import { useUserStore } from "../stores/UserStore";

const Contacts = () => {
  const user = useUserStore((state) => state.currentUser);

  const setUser = useUserStore((state) => state.setCurrentUser);
  useEffect(() => {
    setUser({
      id: "1",
      name: "Bap rang bo",
      email: "baprangbo@gmail.com",
      avatar: "https://randomuser.me/api/port",
      status: "online",
      contacts: [],
      conversations: [],
    });
  }, [setUser]);

  if (user) {
    user.contacts = [
      {
        id: "2",
        name: "Bap rang bo",
        email: "baprangbo@gmail.com",
        avatar: "https://randomuser.me/api/port",
        status: "online",
      },
      {
        id: "3",
        name: "Pop Corn",
        email: "popcorn@gmail.com",
        avatar: "https://randomuser.me/api/port",
        status: "offline",
      },
    ];
  }
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full px-3 py-2">
      {user?.contacts?.map((contact) => (
        <div className="bg-gray-300 px-4 py-2 rounded-xl" key={contact.id}>
          {/* <img src={user.avatar} alt={user.name} /> */}
          <p>{contact.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
