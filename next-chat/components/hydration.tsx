"use client";

import { useEffect } from "react";
import { useUserStore } from "../stores";

const Hydration = () => {
  useEffect(() => {
    useUserStore.persist.rehydrate();
  }, []);
  return null;
};

export default Hydration;
