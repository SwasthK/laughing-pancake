import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Passkey,
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/error",
  },
  experimental: { enableWebAuthn: true },
  callbacks: {
    async signIn({ account, profile, user, email, credentials }) {
      // return "/dashboard";
      return false;
      // const users = await prisma.user.findFirst();
      // console.log(users);
      // return false;
      // console.log("called during passkey");
      // console.log("account", account); //account prvoider = passKey

      // console.log("user", user); //user email
      // //create user and add it to database
      // console.log("account", account);
      // console.log("profile", profile);
      // if (account?.provider === "google") {
      //   if (
      //     profile?.email_verified &&
      //     profile?.email?.endsWith("@sdmcujire.in")
      //   ) {
      //     return true;
      //   } else {
      //     // return "/auth/error?error=login with college email";
      //     return "/login?error=Sign in with college email";
      //     // return false;
      //   }
      // }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    async jwt({ token }) {
      return token;
    },

    async session({ session }) {
      return session;
    },
  },
});
