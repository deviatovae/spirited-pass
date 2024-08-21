import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

type Station = { name: string; image: string };
const stations: Station[] = [
  { name: 'Bath House', image: '/images/bathhouse.png' },
  { name: 'Swamp Beach', image: '/images/beach.webp' },
  { name: 'Swamp Bottom', image: '/images/swampBottom.jpg' },
];

async function main() {
  stations.map(async ({ name, image }, i) => {
    const id = i + 1;
    await prisma.station.upsert({
      where: { id },
      update: {},
      create: { id, name, image },
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
