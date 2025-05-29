import { Inject, Logger } from '@nestjs/common';
import { IVideoRepository } from '../interfaces/video.repository.interface';
import { VideoEntity } from '../../domain/entities/video.entity';

export class GetByChannelVideoUseCase {
  private readonly logger = new Logger(GetByChannelVideoUseCase.name);

  constructor(
    @Inject('IVideoRepository')
    private readonly videoRepository: IVideoRepository,
  ) {}

  async execute(channelId: string): Promise<VideoEntity[]> {
    this.logger.log(`Recherche des vidéos de la chaine ${channelId}`);
    return this.videoRepository.findByChannelId(channelId);
  }
}
