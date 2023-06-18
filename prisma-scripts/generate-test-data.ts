import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.coach.createMany({
  data: [
    { name: 'Vika', email: 'test@vika.com' },
    { name: 'Sasha', email: 'test@sasha.com' },
  ],
});
