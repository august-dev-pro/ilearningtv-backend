import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export async function seedCategories(prisma: PrismaClient) {
  console.log('\n--- Starting CATEGORIES seeds ...---');

  const categories = [
    'NestJS',
    'Prisma',
    'Auth',
    'Testing',
    'Sciences',
    'Histoire',
    'Informatique',
    'Astronomie',
    'Technologie',
    'Biologie',
    'Santé',
    'Environnement',
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { id: uuidv4(), name },
    });
  }

  console.log('--- Success CATEGORIES seeds ---');
}
