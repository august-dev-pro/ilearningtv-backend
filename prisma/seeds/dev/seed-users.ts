import { PrismaClient, Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export async function seedUsers(prisma: PrismaClient) {
  console.log('\n--- Starting USERS seeds ...---');

  const userData = [
    {
      email: 'jean@dev.com',
      name: 'Jean Dev',
      password: 'hashed_password_jean',
    },
    {
      email: 'nadia@dev.com',
      name: 'Nadia El Fassi',
      password: 'hashed_password_nadia',
    },
    {
      email: 'claire@dev.com',
      name: 'Claire Martin',
      password: 'hashed_password_claire',
    },
    {
      email: 'lucie@dev.com',
      name: 'Lucie Moreau',
      password: 'hashed_password_lucie',
    },
    {
      email: 'emilie@dev.com',
      name: 'Émilie Fabre',
      password: 'hashed_password_emilie',
    },
    {
      email: 'marc@dev.com',
      name: 'Marc Lefèvre',
      password: 'hashed_password_marc',
    },
    {
      email: 'clairef@dev.com',
      name: 'Claire Fontaine',
      password: 'hashed_password_clairef',
    },
    {
      email: 'paul@dev.com',
      name: 'Paul Bernard',
      password: 'hashed_password_paul',
    },
    {
      email: 'sophie@dev.com',
      name: 'Sophie Dubois',
      password: 'hashed_password_sophie',
    },
    {
      email: 'julien@dev.com',
      name: 'Julien Petit',
      password: 'hashed_password_julien',
    },
    {
      email: 'lea@dev.com',
      name: 'Léa Robert',
      password: 'hashed_password_lea',
    },
    {
      email: 'antoine@dev.com',
      name: 'Antoine Girard',
      password: 'hashed_password_antoine',
    },
    {
      email: 'emma@dev.com',
      name: 'Emma Laurent',
      password: 'hashed_password_emma',
    },
    {
      email: 'lucas@dev.com',
      name: 'Lucas Garcia',
      password: 'hashed_password_lucas',
    },
    {
      email: 'manon@dev.com',
      name: 'Manon Morel',
      password: 'hashed_password_manon',
    },
    {
      email: 'thomas@dev.com',
      name: 'Thomas Fournier',
      password: 'hashed_password_thomas',
    },
    {
      email: 'camille@dev.com',
      name: 'Camille Lambert',
      password: 'hashed_password_camille',
    },
    {
      email: 'maxime@dev.com',
      name: 'Maxime Rousseau',
      password: 'hashed_password_maxime',
    },
    {
      email: 'julie@dev.com',
      name: 'Julie Faure',
      password: 'hashed_password_julie',
    },
    {
      email: 'quentin@dev.com',
      name: 'Quentin Blanchard',
      password: 'hashed_password_quentin',
    },
  ];

  const users = await Promise.all(
    userData.map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          id: uuidv4(),
          email: u.email,
          password: u.password,
          name: u.name,
          avatarUrl: null,
          isActive: true,
          role: Role.USER,
        },
      }),
    ),
  );

  console.log('--- Success USERS seeds ---');

  return users;
}
