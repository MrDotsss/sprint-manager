import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

export const env = {
  ENV_MODE: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? 5500,
  BASE_URL: process.env.BASE_URL ?? 'http://localhost:5500',
  DATABASE_LOCAL: process.env.DATABASE_URL_LOCAL ?? '',
  DATABASE_PRODUCTION: process.env.DATABASE_URL_PRODUCTION ?? '',
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ?? '',
  ORIGINS: process.env.ORIGINS ? JSON.parse(process.env.ORIGINS) : [],
};
