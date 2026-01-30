/**
 * Use Case pour supprimer un Like.
 */
import { Inject, Logger } from '@nestjs/common';
import { ILikeRepository } from 'src/like/application/interfaces/like.repository.interface';

export class DeleteLikeUseCase {
  private readonly logger = new Logger(DeleteLikeUseCase.name);

  constructor(
    @Inject('ILikeRepository')
    private readonly likeRepository: ILikeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Suppression de Like id: ${id}`);
    try {
      await this.likeRepository.delete(id);
      this.logger.log('Suppression réussie');
    } catch (error) {
      this.logger.error('Erreur lors de la suppression', error.stack);
      throw error;
    }
  }
}
