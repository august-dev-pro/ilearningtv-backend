/**
 * LikeModule est le module principal qui gère l'entité Like.
 * Il regroupe tous les composants nécessaires pour traiter cette entité :
 * - Contrôleur
 * - Repository
 * - Use Cases
 * - Mapper
 * - Service
 */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeService } from 'src/like/infrastructure/services/like.service';
import { LikeController } from 'src/like/presentation/controllers/like.controller';
import { LikeRepository } from 'src/like/infrastructure/repositories/like.repository';
import { CreateLikeUseCase } from 'src/like/application/use-cases/create-like.use-case';
import { UpdateLikeUseCase } from 'src/like/application/use-cases/update-like.use-case';
import { GetByIdLikeUseCase } from 'src/like/application/use-cases/getById-like.use-case';
import { GetAllLikeUseCase } from 'src/like/application/use-cases/getAll-like.use-case';
import { DeleteLikeUseCase } from 'src/like/application/use-cases/delete-like.use-case';
import { LikeMapper } from 'src/like/domain/mappers/like.mapper';
import { ExistsLikeUseCase } from './application/use-cases/exists-like.use-case';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [
    PrismaService,
    {
      provide: 'ILikeRepository',
      useClass: LikeRepository,
    },
    LikeService,
    LikeRepository,
    CreateLikeUseCase,
    UpdateLikeUseCase,
    GetByIdLikeUseCase,
    GetAllLikeUseCase,
    DeleteLikeUseCase,
    ExistsLikeUseCase,
    LikeMapper,
  ],
  exports: [LikeService],
})
export class LikeModule {}
