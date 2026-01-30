/**
 * Use Case pour récupérer tous les Likes.
 */
import { Inject, Logger } from '@nestjs/common';
import { ILikeRepository } from 'src/like/application/interfaces/like.repository.interface';
import { LikeEntity } from 'src/like/domain/entities/like.entity';

export class GetAllLikeUseCase {
  private readonly logger = new Logger(GetAllLikeUseCase.name);

  constructor(
    @Inject('ILikeRepository')
    private readonly likeRepository: ILikeRepository,
  ) {}

  async execute(): Promise<LikeEntity[]> {
    this.logger.log('Récupération de tous les Likes');
    try {
      const result = await this.likeRepository.findAll();
      this.logger.log('Récupération réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération', error.stack);
      throw error;
    }
  }
}
