/**
 * Use Case pour supprimer un Thumbnail.
 */
import { Inject, Logger } from '@nestjs/common';
import { IThumbnailRepository } from 'src/thumbnail/application/interfaces/thumbnail.repository.interface';

export class DeleteThumbnailUseCase {
  private readonly logger = new Logger(DeleteThumbnailUseCase.name);

  constructor(
    @Inject('IThumbnailRepository')
    private readonly thumbnailRepository: IThumbnailRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Suppression de Thumbnail id: ${id}`);
    try {
      await this.thumbnailRepository.delete(id);
      this.logger.log('Suppression réussie');
    } catch (error) {
      this.logger.error('Erreur lors de la suppression', error.stack);
      throw error;
    }
  }
}
