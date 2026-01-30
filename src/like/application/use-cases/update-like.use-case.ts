/**
 * Use Case pour mettre à jour un Like existant.
 */
import { Inject, Logger } from '@nestjs/common';
import { UpdateLikeDto } from 'src/like/application/dtos/like.dto';
import { ILikeRepository } from 'src/like/application/interfaces/like.repository.interface';
import { LikeEntity } from 'src/like/domain/entities/like.entity';

export class UpdateLikeUseCase {
  private readonly logger = new Logger(UpdateLikeUseCase.name);

  constructor(
    @Inject('ILikeRepository')
    private readonly likeRepository: ILikeRepository,
  ) {}

  async execute(id: string, data: UpdateLikeDto): Promise<LikeEntity | null> {
    this.logger.log(`Mise à jour de Like id: ${id}`);
    try {
      const result = await this.likeRepository.update(id, data);
      this.logger.log('Mise à jour réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la mise à jour', error.stack);
      throw error;
    }
  }
}
