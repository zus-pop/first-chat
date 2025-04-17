import { JwtResponse, User } from "../shared";
import myAxios from "../utils/myAxios";

export interface LoginData {
  email: string;
  password: string;
}

export const login = async (loginData: LoginData) => {
  try {
    const res = await myAxios.post<JwtResponse>(`api/auth/login`, loginData);
    if (res.status !== 200) {
      throw new Error(res.data as any);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const whoAmI = async () => {
  try {
    const res = await myAxios.get(`api/auth/me`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return res.data as User;
  } catch (error) {
    // console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user. Please try again.");
  }
};
