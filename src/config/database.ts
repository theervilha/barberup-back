import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export { Prisma };

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});