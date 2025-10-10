import NextAuth from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";

// You will need to configure your authentication providers here.
// For example, using Email provider:
// import EmailProvider from "next-auth/providers/email";

// Define the Auth.js configuration
const authConfig = {
  // The adapter will be configured dynamically in the handler
  // adapter: D1Adapter(D1DatabaseInstance),
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // ...add more providers here
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
};

// This is the Cloudflare Pages Functions entry point for the Auth.js API route.
// It allows us to access the `env` object which contains the D1 binding.
// For Next.js API routes on Cloudflare Pages, the `handler` export is often used
// to access the `context` object directly.
export default async function handler(req, res, context) {
  // Assuming your D1 binding is named 'DB' in Cloudflare Pages
  const D1DatabaseInstance = context.env.DB;

  // Dynamically set the adapter with the D1 instance
  authConfig.adapter = D1Adapter(D1DatabaseInstance);

  // Call NextAuth with the configured options
  return await NextAuth(req, res, authConfig);
}

