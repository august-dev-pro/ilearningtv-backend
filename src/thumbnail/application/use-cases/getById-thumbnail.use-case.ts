/**
 * Use Case pour récupérer un Thumbnail par son ID.
 */
import { Inject, Logger } from '@nestjs/common';
import { IThumbnailRepository } from 'src/thumbnail/application/interfaces/thumbnail.repository.interface';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';

export class GetByIdThumbnailUseCase {
  private readonly logger = new Logger(GetByIdThumbnailUseCase.name);

  constructor(
    @Inject("IThumbnailRepository")
    private readonly thumbnailRepository: IThumbnailRepository,
  ) {}

  async execute(id: string): Promise<ThumbnailEntity | null> {
    this.logger.log(`Recherche de Thumbnail par id: ${id}`);
    try {
      const result = await this.thumbnailRepository.findById(id);
      this.logger.log('Recherche réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche', error.stack);
      throw error;
    }
  }
}