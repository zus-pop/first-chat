"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { setRouterInstance } from "@/lib/router";

const RouterProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const router = useRouter();

  useEffect(() => {
    setRouterInstance(router);
  }, [router]);
  return <>{children}</>;
};

export default RouterProvider;
