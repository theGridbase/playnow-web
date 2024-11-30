import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: any;
  }
}
