// lib/prisma.ts
// https://vercel.com/guides/nextjs-prisma-postgres
// Create a connection to your Prisma Client. 

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient | undefined
}

let prisma: PrismaClient;

if(typeof window === 'undefined'){
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {

    if (!global.cachedPrisma) {
      global.cachedPrisma = new PrismaClient();
    }

    prisma = global.cachedPrisma;
  }
}

//@ts-ignore
export const db = prisma;