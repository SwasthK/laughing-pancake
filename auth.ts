import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
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
  session: {
    strategy: "jwt", // Use JWT for session management
  },

  callbacks: {
    async signIn({ account, profile }) {
      //create user and add it to database
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

    async jwt({ token, user }) {
      if (user) token.role = "user";
      return token;
    },

    async session({ session, token }) {
      session.user.role = typeof token.role === "string" ? token.role : "";
      return session;
    },
  },
});
