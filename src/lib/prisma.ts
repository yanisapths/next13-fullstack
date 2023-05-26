// lib/prisma.ts
// https://vercel.com/guides/nextjs-prisma-postgres
// Create a connection to your Prisma Client. 

import { PrismaClient } from '@prisma/client';

declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export default prisma;