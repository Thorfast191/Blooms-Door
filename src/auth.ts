import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!admin) {
          return null;
        }

        const valid = await bcrypt.compare(
          credentials.password as string,
          admin.password,
        );

        if (!valid) {
          return null;
        }

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        };
      },
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;

      if (pathname.startsWith("/admin")) {
        return !!auth;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.AUTH_SECRET,
});
