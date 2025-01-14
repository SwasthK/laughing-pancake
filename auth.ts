import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";
import { AuthError } from "./lib/enum";

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
    error: "/auth/error",
  },

  experimental: { enableWebAuthn: true },

  callbacks: {
    async signIn({ account, profile }) {
      //google auth
      if (account?.provider === "google") {
        // // TODO: turn this on in production
        // if (!profile?.email?.endsWith("@sdmcujire.in")) {
        //   return `/auth/error?error=${AuthError.INVALID_COLLEGE_EMAIL}`;
        // }
      }

      //default
      return true;
    },

    async redirect({ url, baseUrl }) {
      // console.log("url", url);
      // console.log("baseUrl", baseUrl);
      if (url.startsWith("/auth/error?error")) return url;
      return baseUrl;
    },
    async jwt({ token }) {
      token.picture = null;
      token.name = null;
      return token;
    },

    async session({ session }) {
      return session;
    },
  },
});
