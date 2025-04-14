import { useQuery } from "@tanstack/react-query";
import { whoAmI } from "../apis";
import { useUserStore } from "../stores";

export const useWhoAmI = () => {
  const accessToken = useUserStore.getState().accessToken;
  return useQuery({
    queryKey: ["whoAmI"],
    queryFn: whoAmI,
    retry: false,
  });
};
