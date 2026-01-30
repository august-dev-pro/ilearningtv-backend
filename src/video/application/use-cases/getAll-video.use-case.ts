/**
 * Use Case pour récupérer tous les Videos.
 */
import { Inject, Logger } from '@nestjs/common';
import { IVideoRepository } from 'src/video/application/interfaces/video.repository.interface';
import { VideoEntity } from 'src/video/domain/entities/video.entity';

export class GetAllVideoUseCase {
  private readonly logger = new Logger(GetAllVideoUseCase.name);

  constructor(
    @Inject('IVideoRepository')
    private readonly videoRepository: IVideoRepository,
  ) {}

  async execute(): Promise<VideoEntity[]> {
    this.logger.log('Récupération de tous les Videos');
    try {
      const result = await this.videoRepository.findAll();
      this.logger.log('Récupération réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération', error.stack);
      throw error;
    }
  }
}
