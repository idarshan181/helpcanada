import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { prisma } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Github,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
});
