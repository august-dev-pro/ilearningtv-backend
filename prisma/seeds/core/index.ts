import { PrismaClient } from '@prisma/client';
import { seedCategories } from './seed-categories';
import { seedAdmin } from './seed-admin';

export async function seedCore(prisma: PrismaClient) {
  console.log('🌱 Starting CORE seeds ...');
  await seedCategories(prisma);
  await seedAdmin(prisma);
  console.log('\n✅ Success CORE seeds\n');
}
