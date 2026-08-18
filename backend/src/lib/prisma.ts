import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaNeon } from '@prisma/adapter-neon';
import { env } from '../config/env.config.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapterProd = new PrismaNeon({
  connectionString: env.DATABASE_PRODUCTION,
});

const adapterLocal = new PrismaPg({ connectionString: env.DATABASE_LOCAL });

export const prisma = new PrismaClient({
  adapter: env.ENV_MODE === 'development' ? adapterLocal : adapterProd,
});
