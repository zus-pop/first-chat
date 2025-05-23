import { useQuery } from "@tanstack/react-query";
import { getAllContactByMe } from "../apis";
import { useUserStore } from "../stores";

const Contacts = () => {
  const user = useUserStore((state) => state.currentUser);
  const accessToken = useUserStore((state) => state.accessToken);
  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: getAllContactByMe,
    retry: false,
    enabled: !!user && !!accessToken,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full px-3 py-2">
      {contacts?.map((contact) => (
        <div
          className="bg-gray-300 px-4 py-2 rounded-xl"
          key={`${contact.ownerId}${contact.contactId}`}
        >
          {/* <img src={user.avatar} alt={user.name} /> */}
          <p>{contact.contactName}</p>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
