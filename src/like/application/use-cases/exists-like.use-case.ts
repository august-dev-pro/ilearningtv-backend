import { Inject, Logger } from '@nestjs/common';
import { ILikeRepository } from '../interfaces/like.repository.interface';

export class ExistsLikeUseCase {
  private readonly logger = new Logger(ExistsLikeUseCase.name);

  constructor(
    @Inject('ILikeRepository')
    private readonly likeRepository: ILikeRepository,
  ) {}

  async execute(userId: string, videoId: string): Promise<boolean> {
    this.logger.log(
      `Vérification du like pour user ${userId} et video ${videoId}`,
    );
    return this.likeRepository.exists(userId, videoId);
  }
}
