import axios from "axios";
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

export default myAxios;
