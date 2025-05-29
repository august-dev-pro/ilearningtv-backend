/**
 * Use Case pour créer un Thumbnail.
 */
import { Inject, Logger } from '@nestjs/common';
import { CreateThumbnailDto } from 'src/thumbnail/application/dtos/thumbnail.dto';
import { IThumbnailRepository } from 'src/thumbnail/application/interfaces/thumbnail.repository.interface';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';

export class CreateThumbnailUseCase {
  private readonly logger = new Logger(CreateThumbnailUseCase.name);

  constructor(
    @Inject('IThumbnailRepository')
    private readonly thumbnailRepository: IThumbnailRepository,
  ) {}

  async execute(data: CreateThumbnailDto): Promise<ThumbnailEntity> {
    this.logger.log('Début création Thumbnail');
    try {
      // Vérifier si la vidéo a déjà un thumbnail
      const existingThumbnail = await this.thumbnailRepository.findByVideoId(
        data.videoId,
      );

      if (existingThumbnail) {
        throw new Error('Cette vidéo possède déjà un thumbnail.');
      }

      const result = await this.thumbnailRepository.create(data);
      this.logger.log('Création réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la création', error.stack);
      throw error;
    }
  }
}
