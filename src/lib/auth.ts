import { Provider } from "next-auth/providers/index";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { logIn } from "@/service/authService";

export const providers : Provider[] = [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // let user = await logIn(credentials)
        await logIn({
          email: credentials ? credentials.email : '',
          password: credentials ? credentials.password : ''
        })
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
];

export const providerMap = providers.map((provider) => {
  return { id: provider.id, name: provider.name };
});