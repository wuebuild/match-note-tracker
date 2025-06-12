import { Provider } from "next-auth/providers/index";
import GoogleProvider from "next-auth/providers/google";

export const providers : Provider[] = [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
];

export const providerMap = providers.map((provider) => {
  return { id: provider.id, name: provider.name };
});