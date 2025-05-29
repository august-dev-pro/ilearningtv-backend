/**
 * ThumbnailModule est le module principal qui gère l'entité Thumbnail.
 * Il regroupe tous les composants nécessaires pour traiter cette entité :
 * - Contrôleur
 * - Repository
 * - Use Cases
 * - Mapper
 * - Service
 */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThumbnailService } from 'src/thumbnail/infrastructure/services/thumbnail.service';
import { ThumbnailController } from 'src/thumbnail/presentation/controllers/thumbnail.controller';
import { ThumbnailRepository } from 'src/thumbnail/infrastructure/repositories/thumbnail.repository';
import { CreateThumbnailUseCase } from 'src/thumbnail/application/use-cases/create-thumbnail.use-case';
import { UpdateThumbnailUseCase } from 'src/thumbnail/application/use-cases/update-thumbnail.use-case';
import { GetByIdThumbnailUseCase } from 'src/thumbnail/application/use-cases/getById-thumbnail.use-case';
import { GetAllThumbnailUseCase } from 'src/thumbnail/application/use-cases/getAll-thumbnail.use-case';
import { DeleteThumbnailUseCase } from 'src/thumbnail/application/use-cases/delete-thumbnail.use-case';
import { ThumbnailMapper } from 'src/thumbnail/domain/mappers/thumbnail.mapper';
import { GetThumbnailsByVideoIdUseCase } from './application/use-cases/get-thumbnails-by-video-id.use-case';

@Module({
  imports: [],
  controllers: [ThumbnailController],
  providers: [
    PrismaService,
    {
      provide: 'IThumbnailRepository',
      useClass: ThumbnailRepository,
    },
    ThumbnailService,
    ThumbnailRepository,
    CreateThumbnailUseCase,
    UpdateThumbnailUseCase,
    GetByIdThumbnailUseCase,
    GetAllThumbnailUseCase,
    DeleteThumbnailUseCase,
    GetThumbnailsByVideoIdUseCase,
    ThumbnailMapper,
  ],
  exports: [ThumbnailService],
})
export class ThumbnailModule {}
