import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useAuth from "../hooks/use-auth";
import { useChatStore, useUserStore } from "../stores";
import { useWhoAmI } from "../hooks/use-who-am-I";

const AuthGuard = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const router = useRouter();
  const { isAuthenticated, hydrated, accessToken } = useAuth();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const clearCurrentUser = useUserStore((state) => state.clearCurrentUser);
  const clearCurrentConversation = useChatStore(
    (state) => state.clearCurrentConversation
  );
  const { data: user, isLoading, isSuccess, isError } = useWhoAmI();

  useEffect(() => {
    if (!hydrated) return;

    if (!isAuthenticated) {
      clearCurrentUser();
      clearCurrentConversation();
      router.replace("/auth");
    }
  }, [hydrated, isAuthenticated, router, isError]);

  if (isAuthenticated && isSuccess) {
    setCurrentUser(user);
  }

  if (!hydrated || isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default AuthGuard;
