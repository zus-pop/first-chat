import axios from "axios";
import { redirectTo } from "../lib/router";
import { useUserStore } from "../stores";

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

myAxios.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken; // Get the access token from the store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

myAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      redirectTo("/auth");
      //   window.location.href = "/auth";
    }
    return Promise.reject(err);
  }
);

export default myAxios;
