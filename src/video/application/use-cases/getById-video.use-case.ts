/**
 * Use Case pour récupérer un Video par son ID.
 */
import { Inject, Logger } from '@nestjs/common';
import { IVideoRepository } from 'src/video/application/interfaces/video.repository.interface';
import { VideoEntity } from 'src/video/domain/entities/video.entity';

export class GetByIdVideoUseCase {
  private readonly logger = new Logger(GetByIdVideoUseCase.name);

  constructor(
    @Inject('IVideoRepository')
    private readonly videoRepository: IVideoRepository,
  ) {}

  async execute(id: string): Promise<VideoEntity | null> {
    this.logger.log(`Recherche de Video par id: ${id}`);
    try {
      const result = await this.videoRepository.findById(id);
      this.logger.log('Recherche réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche', error.stack);
      throw error;
    }
  }
}
