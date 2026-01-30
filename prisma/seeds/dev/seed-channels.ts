import { Channel, PrismaClient, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export async function seedChannels(
  prisma: PrismaClient,
  users: User[],
): Promise<Channel[]> {
  console.log('\n--- Starting CHANELS seeds ...---');

  const channelNames = [
    'TechVision',
    'ScienceXplorer',
    'Histoire Vivante',
    'CodeMaster',
    'AstroDécouverte',
    'BioGénie',
    'SantéPlus',
    'EcoLogique',
    'CuisineFacile',
    'VoyageurCurieux',
    'ArtStudio',
    'FitnessZone',
    'CulturePop',
    'GamingWorld',
    'FinanceSmart',
    'AutoPassion',
    'ModeTrendy',
    'ParentZen',
    'DIYMania',
    'PhotoPro',
  ];

  const channels = await Promise.all(
    users.map((user, idx) =>
      prisma.channel.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          id: uuidv4(),
          name: channelNames[idx % channelNames.length],
          userId: user.id,
        },
      }),
    ),
  );

  console.log('--- Success CHANELS seeds ---');

  return channels;
}
