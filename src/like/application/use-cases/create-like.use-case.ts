/**
 * Use Case pour créer un Like.
 */
import { Inject, Logger } from '@nestjs/common';
import { CreateLikeDto } from 'src/like/application/dtos/like.dto';
import { ILikeRepository } from 'src/like/application/interfaces/like.repository.interface';
import { LikeEntity } from 'src/like/domain/entities/like.entity';

export class CreateLikeUseCase {
  private readonly logger = new Logger(CreateLikeUseCase.name);

  constructor(
    @Inject("ILikeRepository")
    private readonly likeRepository: ILikeRepository,
  ) {}

  async execute(data: CreateLikeDto): Promise<LikeEntity> {
    this.logger.log('Début création Like');
    try {
      const result = await this.likeRepository.create(data);
      this.logger.log('Création réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la création', error.stack);
      throw error;
    }
  }
}