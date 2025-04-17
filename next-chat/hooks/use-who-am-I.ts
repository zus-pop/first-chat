import { useQuery } from "@tanstack/react-query";
import { whoAmI } from "../apis";
import { useUserStore } from "../stores";

export const useWhoAmI = () => {
  const accessToken = useUserStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["whoAmI"],
    queryFn: whoAmI,
    retry: false,
    enabled: !!accessToken,
  });
};
