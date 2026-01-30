import { PrismaClient, Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export async function seedAdmin(prisma: PrismaClient) {
  console.log('\n--- Starting ADMIN seeds ...---');
  await prisma.user.upsert({
    where: { email: 'admin@ilearning.tv' },
    update: {},
    create: {
      id: uuidv4(),
      email: 'admin@ilearning.tv',
      password: 'hashed_admin_password',
      name: 'Admin iLearning',
      role: Role.ADMIN,
      isActive: true,
    },
  });
  console.log('--- Success ADMIN seeds ---');
}
