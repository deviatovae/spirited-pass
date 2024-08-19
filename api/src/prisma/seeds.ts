import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const stations: string[] = ['Bath House', 'Swamp Beach', 'Swamp Bottom'];

async function main() {
  stations.map(async (name, i) => {
    const id = i + 1;
    await prisma.station.upsert({
      where: { id },
      update: {},
      create: { id, name },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
