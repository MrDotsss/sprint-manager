import { betterAuth } from 'better-auth';
import { env } from '../config/env.config.js';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { prisma } from './prisma.js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: [...env.ORIGINS],
});
