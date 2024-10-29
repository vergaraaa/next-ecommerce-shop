import { z } from "zod";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth } = NextAuth(authConfig);
