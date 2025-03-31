import { PrismaClient } from '@prisma/client';
import * as process from 'node:process';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.inviteCode.create({
    data: {
      code: '1234567890'
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
