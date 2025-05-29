/**
 * VideoModule est le module principal qui gère l'entité Video.
 * Il regroupe tous les composants nécessaires pour traiter cette entité :
 * - Contrôleur
 * - Repository
 * - Use Cases
 * - Mapper
 * - Service
 */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VideoService } from 'src/video/infrastructure/services/video.service';
import { VideoController } from 'src/video/presentation/controllers/video.controller';
import { VideoRepository } from 'src/video/infrastructure/repositories/video.repository';
import { CreateVideoUseCase } from 'src/video/application/use-cases/create-video.use-case';
import { UpdateVideoUseCase } from 'src/video/application/use-cases/update-video.use-case';
import { GetByIdVideoUseCase } from 'src/video/application/use-cases/getById-video.use-case';
import { GetAllVideoUseCase } from 'src/video/application/use-cases/getAll-video.use-case';
import { DeleteVideoUseCase } from 'src/video/application/use-cases/delete-video.use-case';
import { VideoMapper } from 'src/video/domain/mappers/video.mapper';
import { GetByChannelVideoUseCase } from './application/use-cases/get-by-channel-video.use-case';
import { GetCommentedByUserVideoUseCase } from './application/use-cases/get-commented-by-user-video.use-case';
import { GetLikedByUserVideoUseCase } from './application/use-cases/get-liked-by-user-video.use-case';
import { ThumbnailModule } from 'src/thumbnail/thumbnail.module';
import { CategoryModule } from 'src/category/category.module';
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  imports: [ThumbnailModule, CategoryModule, ChannelModule],
  controllers: [VideoController],
  providers: [
    PrismaService,
    {
      provide: 'IVideoRepository',
      useClass: VideoRepository,
    },
    VideoService,
    VideoRepository,
    CreateVideoUseCase,
    UpdateVideoUseCase,
    GetByIdVideoUseCase,
    GetAllVideoUseCase,
    DeleteVideoUseCase,
    GetByChannelVideoUseCase,
    GetLikedByUserVideoUseCase,
    GetCommentedByUserVideoUseCase,
    VideoMapper,
  ],
  exports: [VideoService],
})
export class VideoModule {}
