import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()]
});
