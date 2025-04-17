import { useEffect, useState } from "react";
import { useUserStore } from "../stores";

const useAuth = () => {
  const accessToken = useUserStore((state) => state.accessToken);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return {
    hydrated,
    isAuthenticated: !!accessToken && hydrated,
    accessToken,
  };
};

export default useAuth;
