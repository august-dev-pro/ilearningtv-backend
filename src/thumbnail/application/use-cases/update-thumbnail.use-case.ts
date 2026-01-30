/**
 * Use Case pour mettre à jour un Thumbnail existant.
 */
import { Inject, Logger } from '@nestjs/common';
import { UpdateThumbnailDto } from 'src/thumbnail/application/dtos/thumbnail.dto';
import { IThumbnailRepository } from 'src/thumbnail/application/interfaces/thumbnail.repository.interface';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';

export class UpdateThumbnailUseCase {
  private readonly logger = new Logger(UpdateThumbnailUseCase.name);

  constructor(
    @Inject('IThumbnailRepository')
    private readonly thumbnailRepository: IThumbnailRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateThumbnailDto,
  ): Promise<ThumbnailEntity | null> {
    this.logger.log(`Mise à jour de Thumbnail id: ${id}`);
    try {
      const result = await this.thumbnailRepository.update(id, data);
      this.logger.log('Mise à jour réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la mise à jour', error.stack);
      throw error;
    }
  }
}
