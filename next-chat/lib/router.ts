// lib/router.ts

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

let router: AppRouterInstance | null = null;

export const setRouterInstance = (instance: AppRouterInstance) => {
  router = instance;
};

export const redirectTo = (path: string) => {
  if (router) {
    router.replace(path);
  }
};
