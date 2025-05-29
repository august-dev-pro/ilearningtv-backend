/**
 * Use Case pour créer un Video.
 */
import {
  Inject,
  Logger,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/infrastructure/services/category.service';
import { ChannelService } from 'src/channel/infrastructure/services/channel.service';
import { ThumbnailService } from 'src/thumbnail/infrastructure/services/thumbnail.service';
import { CreateVideoDto } from 'src/video/application/dtos/video.dto';
import { IVideoRepository } from 'src/video/application/interfaces/video.repository.interface';
import { VideoEntity } from 'src/video/domain/entities/video.entity';

export class CreateVideoUseCase {
  private readonly logger = new Logger(CreateVideoUseCase.name);

  constructor(
    @Inject('IVideoRepository')
    private readonly videoRepository: IVideoRepository,
    private readonly channelService: ChannelService,
    private readonly categoryService: CategoryService,
    private readonly thumbnailService: ThumbnailService,
  ) {}

  async execute(data: CreateVideoDto): Promise<VideoEntity> {
    this.logger.log('Début création Video');

    // 1. Vérifier que la chaîne existe
    const channel = await this.channelService.findById(data.channelId);
    if (!channel) {
      this.logger.warn(`Chaîne non trouvée: ${data.channelId}`);
      throw new NotFoundException('Chaîne non trouvée');
    }

    // 2. Vérifier que l'auteur est bien le propriétaire de la chaîne
    if (channel.getUserId() !== data.authorId) {
      this.logger.warn(
        `User ${data.authorId} n'est pas propriétaire de la chaîne ${data.channelId}`,
      );
      throw new ForbiddenException(
        'Vous ne pouvez publier que sur vos propres chaînes',
      );
    }

    // 3. Vérifier que la catégorie existe
    const category = await this.categoryService.getById(data.categoryId);
    if (!category) {
      this.logger.warn(`Catégorie non trouvée: ${data.categoryId}`);
      throw new NotFoundException('Catégorie non trouvée');
    }

    // 4. Vérifier unicité du titre sur la chaîne
    // const exists = await this.videoRepository.findByTitleAndChannel(data.title, data.channelId);
    // if (exists) throw new ConflictException('Une vidéo avec ce titre existe déjà sur cette chaîne');

    try {
      const result = await this.videoRepository.create(data);
      this.logger.log('Création réussie');

      // Création du thumbnail si présent
      if (data.thumbnailUrl) {
        await this.thumbnailService.create({
          imageUrl: data.thumbnailUrl,
          videoId: result.getId(),
        });
      }
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la création', error.stack);
      throw error;
    }
  }
}
