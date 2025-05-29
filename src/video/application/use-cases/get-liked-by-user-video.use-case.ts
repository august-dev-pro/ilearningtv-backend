import { Inject, Logger } from '@nestjs/common';
import { IVideoRepository } from '../interfaces/video.repository.interface';
import { VideoEntity } from '../../domain/entities/video.entity';

export class GetLikedByUserVideoUseCase {
  private readonly logger = new Logger(GetLikedByUserVideoUseCase.name);

  constructor(
    @Inject('IVideoRepository')
    private readonly videoRepository: IVideoRepository,
  ) {}

  async execute(userId: string): Promise<VideoEntity[]> {
    this.logger.log(`Recherche des vidéos likées par l'utilisateur ${userId}`);
    return this.videoRepository.findLikedByUser(userId);
  }
}
