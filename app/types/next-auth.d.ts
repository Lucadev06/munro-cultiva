import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface JWT {
    picture?: string | null;
  }
}
