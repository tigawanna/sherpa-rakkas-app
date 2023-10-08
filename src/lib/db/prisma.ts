import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

// if (import.meta.env.DEV) globalForPrisma.prisma = prisma;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace globalThis {
  let prismaClient: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaClient || (globalThis.prismaClient = new PrismaClient());
