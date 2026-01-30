import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seed-users';
import { seedChannels } from './seed-channels';
import { seedVideos } from './seed-videos';

export async function seedDev(prisma: PrismaClient) {
  console.log('🌱 Starting Seeding DEV data...!');
  const users = await seedUsers(prisma);
  const channels = await seedChannels(prisma, users);
  await seedVideos(prisma, users, channels);
  console.log('✅ Success Seeding DEV data');
}
