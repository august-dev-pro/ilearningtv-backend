import { Inject, Logger } from '@nestjs/common';
import { IThumbnailRepository } from '../interfaces/thumbnail.repository.interface';
import { ThumbnailEntity } from '../../domain/entities/thumbnail.entity';

export class GetThumbnailsByVideoIdUseCase {
  private readonly logger = new Logger(GetThumbnailsByVideoIdUseCase.name);

  constructor(
    @Inject('IThumbnailRepository')
    private readonly thumbnailRepository: IThumbnailRepository,
  ) {}

  async execute(videoId: string): Promise<ThumbnailEntity | null> {
    this.logger.log(`Recherche des thumbnails pour la vidéo ${videoId}`);
    return this.thumbnailRepository.findByVideoId(videoId);
  }
}
