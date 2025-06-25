// /types/next-auth.d.ts or /src/types/next-auth.d.ts
import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
  interface User {
    access_token?: string;
    refresh_token?: string;
  }
}

interface ExtendedToken {
  accessToken?: string;
  refreshToken?: string;
  // ...other fields
}