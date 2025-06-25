import NextAuth from "next-auth";
import { providers } from "@/src/lib/auth";
import { ExtendedToken } from "@/types/next-auth";

const handler = NextAuth({
  providers: providers,
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, user, account }) {
      // Add tokens from your backend or provider
      if (user?.access_token) token.accessToken = user.access_token;
      if (user?.refresh_token) token.refreshToken = user.refresh_token;
      return token;
    },
    async session({ session, token }) {
      const extToken = token as ExtendedToken;
      session.accessToken = extToken.accessToken;
      session.refreshToken = extToken.refreshToken;
      return session;
    }
  },
});

export { handler as GET, handler as POST };