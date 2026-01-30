/**
 * Use Case pour récupérer un Like par son ID.
 */
import { Inject, Logger } from '@nestjs/common';
import { ILikeRepository } from 'src/like/application/interfaces/like.repository.interface';
import { LikeEntity } from 'src/like/domain/entities/like.entity';

export class GetByIdLikeUseCase {
  private readonly logger = new Logger(GetByIdLikeUseCase.name);

  constructor(
    @Inject('ILikeRepository')
    private readonly likeRepository: ILikeRepository,
  ) {}

  async execute(id: string): Promise<LikeEntity | null> {
    this.logger.log(`Recherche de Like par id: ${id}`);
    try {
      const result = await this.likeRepository.findById(id);
      this.logger.log('Recherche réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche', error.stack);
      throw error;
    }
  }
}
