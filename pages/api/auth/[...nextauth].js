import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  // database: process.env.DATABASE_URL,
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER";
      }

      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
