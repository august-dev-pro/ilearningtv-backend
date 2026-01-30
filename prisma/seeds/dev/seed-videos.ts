import { Category, Channel, PrismaClient, User } from '@prisma/client';
import { VideoTypeEnum } from 'src/video/domain/enums/video-type.enum';
import { v4 as uuidv4 } from 'uuid';

const randomComments = [
  'Super vidéo, merci !',
  "Très clair, j'ai tout compris.",
  "J'adore ce sujet.",
  'Peux-tu approfondir la prochaine fois ?',
  'Excellent travail !',
  'Vidéo très instructive.',
  'Merci pour le partage.',
  "C'était passionnant.",
  'Bravo pour la pédagogie.',
  'Je recommande à tous !',
  "J'ai appris beaucoup de choses.",
  'Top !',
  'Vivement la suite.',
  'Merci pour cette explication.',
  'Je ne connaissais pas, super découverte.',
  'Contenu très utile, merci !',
  'J’ai partagé à mes amis.',
  'La qualité est au rendez-vous.',
  'Sujet complexe bien expliqué.',
  'Continue comme ça !',
  'Ça m’a vraiment aidé, merci.',
  'Très bien expliqué, accessible à tous.',
  'Je ne pensais pas comprendre aussi vite.',
  'On sent le travail derrière, bravo.',
  'Parfait pour les débutants comme moi.',
  'Clair, net et précis.',
  'Un exemple à suivre pour les autres créateurs.',
  'J’attends la prochaine vidéo avec impatience.',
  'Merci pour la clarté des explications.',
  'Des infos concrètes, c’est top.',
  'Le sujet est traité en profondeur, super !',
  'Tu rends le sujet vraiment intéressant.',
  'Très professionnel, bravo.',
  'J’ai appris sans m’en rendre compte.',
  'Toujours un plaisir de regarder tes vidéos.',
  'Pédagogie au top comme toujours.',
  'Ça m’a motivé à me lancer !',
  'Une belle découverte.',
  'Simple, efficace, pertinent.',
  'Merci pour ton travail de vulgarisation.',
  'J’ai compris ce que je n’avais jamais compris à l’école.',
  'Tu mérites plus de vues !',
  'Wow, je suis impressionné.',
  'Chaque minute était utile.',
  'Je vais regarder plusieurs fois pour bien assimiler.',
  'C’est exactement ce que je cherchais !',
  'Merci pour ton temps et ton énergie.',
  'Franchement, chapeau bas.',
];

export async function seedVideos(
  prisma: PrismaClient,
  users: User[],
  channels: Channel[],
) {
  console.log('\n--- Starting VIDEOS seeds... ---');

  const videos = [
    {
      title: 'Coding Challenge React',
      description: 'Défi de programmation React en direct avec correction.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-react.jpg',
      category: 'Informatique',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-06'),
    },
    {
      title: 'Découverte du ciel profond',
      description: 'Soirée d’observation des galaxies et nébuleuses en direct.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-ciel.jpg',
      category: 'Astronomie',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-07'),
    },
    {
      title: 'Table ronde sur l’IA',
      description: 'Experts et chercheurs débattent sur l’avenir de l’IA.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-table-ia.jpg',
      category: 'Technologie',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-08'),
    },
    {
      title: 'Quiz Sciences pour tous',
      description: 'Participez à un quiz interactif sur les sciences.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-quiz-sciences.jpg',
      category: 'Sciences',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-09'),
    },
    {
      title: 'Yoga et bien-être',
      description: 'Séance de yoga en direct pour tous niveaux.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-yoga.jpg',
      category: 'Santé',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-10'),
    },
    {
      title: 'Tendance : Les métiers du futur',
      description: 'Quels seront les jobs les plus demandés en 2030 ?',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-metiers.jpg',
      category: 'Technologie',
      videoType: 'TREND',
      createdAt: new Date('2025-03-25'),
    },
    {
      title: 'Tendance : Les mystères de la matière noire',
      description: 'Plongée dans l’inconnu avec la matière noire.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-matiere-noire.jpg',
      category: 'Astronomie',
      videoType: 'TREND',
      createdAt: new Date('2025-03-26'),
    },
    {
      title: 'Tendance : Apprendre le Rust',
      description: 'Pourquoi Rust séduit de plus en plus de développeurs ?',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-rust.jpg',
      category: 'Informatique',
      videoType: 'TREND',
      createdAt: new Date('2025-03-27'),
    },
    {
      title: 'Tendance : Réchauffement des océans',
      description:
        'Conséquences et solutions face à la montée des températures marines.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-oceans.jpg',
      category: 'Environnement',
      videoType: 'TREND',
      createdAt: new Date('2025-03-28'),
    },
    {
      title: 'Tendance : Bien manger en 2025',
      description:
        'Les nouvelles tendances alimentaires pour une meilleure santé.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-manger.jpg',
      category: 'Santé',
      videoType: 'TREND',
      createdAt: new Date('2025-03-29'),
    },
    {
      title: 'Comprendre les bases de l’électricité moderne',
      description:
        'Explorez les concepts fondamentaux de l’électricité, des circuits simples aux lois qui régissent le courant.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/electricite.jpg',
      category: 'Sciences',
      views: 1224,
      likes: 850,
      comment: 120,
      authorId: 'Jean Dupont',
      createdAt: '2025-02-10',
    },
    {
      title: 'Voyage à travers l’Égypte antique',
      description:
        'Remontez le temps et découvrez la civilisation égyptienne ancienne, ses pharaons, pyramides et son héritage.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/egypte-antique.jpg',
      category: 'Histoire',
      views: 984,
      likes: 1300,
      comment: 245,
      authorId: 'Nadia El Fassi',
      createdAt: '2025-01-22',
    },
    {
      title: 'Démarrer la programmation informatique',
      description:
        'Une introduction claire à la programmation, idéale pour les débutants qui veulent apprendre à coder.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/programmation.jpg',
      category: 'Informatique',
      views: 2120,
      likes: 1790,
      comment: 310,
      authorId: 'Claire Martin',
      createdAt: '2025-03-05',
    },
    {
      title: 'Le système solaire expliqué aux curieux',
      description:
        'Découvrez le Soleil et ses planètes dans une exploration captivante de notre système solaire.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/systeme-solaire.jpg',
      category: 'Astronomie',
      views: 1680,
      likes: 980,
      comment: 145,
      authorId: 'Lucie Moreau',
      createdAt: '2024-11-29',
    },
    {
      title: 'L’intelligence artificielle pour les débutants',
      description:
        'Une introduction imagée à l’intelligence artificielle, ses applications et son impact sur notre quotidien.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/intelligence-artificielle.jpg',
      category: 'Technologie',
      views: 2510,
      likes: 1900,
      comment: 375,
      authorId: 'Émilie Fabre',
      createdAt: '2025-03-02',
    },
    {
      title: 'Introduction à la biologie cellulaire',
      description:
        'Découvrez les bases de la biologie cellulaire : structure, fonctions et rôles des organites.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/biologie-cellulaire.jpg',
      category: 'Biologie',
      views: 1980,
      likes: 1325,
      comment: 212,
      authorId: 'Marc Lefèvre',
      createdAt: '2024-11-12',
    },
    {
      title: 'La Révolution française en profondeur',
      description:
        'Comprenez les causes, les événements et les conséquences de la Révolution française.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/revolution-francaise.jpg',
      category: 'Histoire',
      views: 1390,
      likes: 1205,
      comment: 210,
      authorId: 'Marc Lefèvre',
      createdAt: '2025-01-15',
    },
    {
      title: 'Comment fonctionne Internet ?',
      description:
        "Explorez les coulisses du web : câbles, serveurs, DNS et technologies fondamentales d'Internet.",
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/fonctionnement-internet.jpg',
      category: 'Technologie',
      views: 2215,
      likes: 1730,
      comment: 300,
      authorId: 'Jean Dupont',
      createdAt: '2025-01-06',
    },
    {
      title: 'Premiers secours : les gestes essentiels',
      description:
        'Apprenez les gestes qui sauvent : PLS, massage cardiaque, traiter les hémorragies.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/premiers-secours.jpg',
      category: 'Santé',
      views: 3120,
      likes: 1890,
      comment: 310,
      authorId: 'Claire Fontaine',
      createdAt: '2025-03-03',
    },
    {
      title: 'Le réchauffement climatique expliqué',
      description:
        'Découvrez les causes, les effets et les solutions face au réchauffement climatique mondial.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/rechauffement-climatique.jpg',
      category: 'Environnement',
      views: 2875,
      likes: 1580,
      comment: 240,
      authorId: 'Jean Dupont',
      createdAt: '2024-12-22',
    },
    {
      title: 'Atelier JavaScript en direct',
      description:
        'Participez à notre atelier interactif sur JavaScript avec questions/réponses en direct.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-js.jpg',
      category: 'Technologie',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-01'),
    },
    {
      title: 'Découverte de l’astronomie',
      description:
        'Observation des étoiles et explications en direct avec un astronome.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-astro.jpg',
      category: 'Astronomie',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-02'),
    },
    {
      title: 'Révisions Bac Sciences',
      description:
        'Révisez le Bac avec nos profs en direct, toutes vos questions sont les bienvenues.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-bac.jpg',
      category: 'Sciences',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-03'),
    },
    {
      title: 'Programmation Python pour débutants',
      description:
        'Cours interactif Python en direct, idéal pour les débutants.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-python.jpg',
      category: 'Informatique',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-04'),
    },
    {
      title: 'Santé et bien-être',
      description: 'Conseils santé et bien-être avec un expert en direct.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/live-sante.jpg',
      category: 'Santé',
      videoType: 'LIVE',
      createdAt: new Date('2025-04-05'),
    },
    {
      title: 'Tendance : IA et avenir du travail',
      description:
        'Découvrez comment l’intelligence artificielle transforme le monde du travail.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-ia.jpg',
      category: 'Technologie',
      videoType: 'TREND',
      createdAt: new Date('2025-03-20'),
    },
    {
      title: 'Tendance : Les secrets de l’univers',
      description:
        'Une vidéo fascinante sur les mystères de l’univers et les dernières découvertes.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-univers.jpg',
      category: 'Astronomie',
      videoType: 'TREND',
      createdAt: new Date('2025-03-21'),
    },
    {
      title: 'Tendance : Apprendre à coder en 2025',
      description:
        'Les meilleures méthodes et ressources pour apprendre à coder cette année.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-coder.jpg',
      category: 'Informatique',
      videoType: 'TREND',
      createdAt: new Date('2025-03-22'),
    },
    {
      title: 'Tendance : Les enjeux du climat',
      description:
        'Analyse des enjeux climatiques actuels et solutions innovantes.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-climat.jpg',
      category: 'Environnement',
      videoType: 'TREND',
      createdAt: new Date('2025-03-23'),
    },
    {
      title: 'Tendance : Nutrition et santé',
      description: 'Conseils nutritionnels pour rester en forme toute l’année.',
      videoUrl: '/uploads/videos/educational_video.mp4',
      thumbnailFile: '/uploads/thumbnails/trend-nutrition.jpg',
      category: 'Santé',
      videoType: 'TREND',
      createdAt: new Date('2025-03-24'),
    },
  ];

  const possibleTags = [
    'tuto',
    'science',
    'histoire',
    'live',
    'tech',
    'santé',
    'écologie',
    'python',
    'javascript',
    'astro',
    'débat',
    'quiz',
    'bien-être',
    'nutrition',
    'environnement',
  ];

  const userChannelMap = Object.fromEntries(
    channels.map((ch) => [ch.userId, ch.id]),
  );

  const categories: Category[] = await prisma.category.findMany();

  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.name, cat.id]),
  );

  for (const v of videos) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const channelId = userChannelMap[randomUser.id];
    const isLive = v.videoType === 'LIVE';
    const liveViewers = isLive ? Math.floor(Math.random() * 500) + 10 : null;
    const tags = Array.from(
      new Set(
        Array(Math.floor(Math.random() * 3) + 1)
          .fill(null)
          .map(
            () => possibleTags[Math.floor(Math.random() * possibleTags.length)],
          ),
      ),
    );

    const video = await prisma.video.create({
      data: {
        id: uuidv4(),
        title: v.title,
        description: v.description,
        channelId,
        categoryId: categoryMap[v.category],
        fileUrl: v.videoUrl,
        videoType: v.videoType as VideoTypeEnum,
        views: v.views ?? Math.floor(Math.random() * 5000),
        liveViewers,
        duration: Math.floor(Math.random() * 3600) + 60,
        tags,
        isLive,
        shares: Math.floor(Math.random() * 100),
        reports: Math.floor(Math.random() * 5),
        createdAt: v.createdAt ? new Date(v.createdAt) : new Date(),
      },
    });

    await prisma.thumbnail.upsert({
      where: { videoId: video.id },
      update: {},
      create: {
        id: uuidv4(),
        videoId: video.id,
        imageUrl: v.thumbnailFile,
      },
    });

    // Crée des likes aléatoires sans doublon
    const likeCount = Math.floor(Math.random() * 5) + 1;
    const shuffledUsers = users.sort(() => 0.5 - Math.random());
    for (let i = 0; i < likeCount; i++) {
      await prisma.like.create({
        data: {
          id: uuidv4(),
          videoId: video.id,
          userId: shuffledUsers[i].id,
        },
      });
    }

    // Crée des commentaires aléatoires
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      await prisma.comment.create({
        data: {
          id: uuidv4(),
          videoId: video.id,
          userId: users[Math.floor(Math.random() * users.length)].id,
          content:
            randomComments[Math.floor(Math.random() * randomComments.length)],
          createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 1000000000),
          ), // date aléatoire récente
        },
      });
    }
  }
  console.log('--- Success VIDEOS seeds ---');
}
