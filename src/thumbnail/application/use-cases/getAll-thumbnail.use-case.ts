/**
 * Use Case pour récupérer tous les Thumbnails.
 */
import { Inject, Logger } from '@nestjs/common';
import { IThumbnailRepository } from 'src/thumbnail/application/interfaces/thumbnail.repository.interface';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';

export class GetAllThumbnailUseCase {
  private readonly logger = new Logger(GetAllThumbnailUseCase.name);

  constructor(
    @Inject("IThumbnailRepository")
    private readonly thumbnailRepository: IThumbnailRepository,
  ) {}

  async execute(): Promise<ThumbnailEntity[]> {
    this.logger.log('Récupération de tous les Thumbnails');
    try {
      const result = await this.thumbnailRepository.findAll();
      this.logger.log('Récupération réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération', error.stack);
      throw error;
    }
  }
}