import { PrismaClient } from '@prisma/client';
import { seedCore } from './core';
import { seedDev } from './dev';

const prisma = new PrismaClient();

async function main() {
  await seedCore(prisma);

  // ⚠️ TEMPORAIREMENT autorisé
  if (
    process.env.SEED_DEMO === 'true' ||
    process.env.NODE_ENV !== 'production'
  ) {
    await seedDev(prisma);
  }
}

void (async () => {
  try {
    await main();
  } catch (e) {
    console.error('Erreur pendant le seeding :', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
