import NextAuth from "next-auth";
import { JwtResponse } from "./types";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    access_token: string;
    refresh_token: string;
  }
  interface Session {
    access_token: string;
    refresh_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
  }
}
