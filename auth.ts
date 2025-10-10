import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { D1Adapter } from "@auth/d1-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: D1Adapter({
    client: process.env.DB,
  }),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Implement your own logic to verify credentials against your D1 database
        // For now, a placeholder
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          return { id: '1', name: 'Test User', email: 'user@example.com' };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
});

