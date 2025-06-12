import NextAuth from "next-auth";
import { providers } from "@/src/lib/auth";

const handler = NextAuth({
  providers: providers,
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };