import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWhoAmI } from "../hooks/use-who-am-I";
import { useUserStore } from "../stores";

const AuthGuard = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const router = useRouter();
  const { data, isSuccess, isError, isLoading } = useWhoAmI();
  useEffect(() => {
    if (isError) {
      useUserStore.getState().clearCurrentUser();
      router.replace("/auth");
    }

    if (isSuccess) {
      useUserStore.setState({ currentUser: data });
    }
  }, [isLoading, isSuccess, isError, data]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
