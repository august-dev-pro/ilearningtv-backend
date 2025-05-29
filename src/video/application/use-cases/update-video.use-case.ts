/**
 * Use Case pour mettre à jour un Video existant.
 */
import {
  Inject,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UpdateVideoDto } from 'src/video/application/dtos/video.dto';
import { IVideoRepository } from 'src/video/application/interfaces/video.repository.interface';
import { VideoEntity } from 'src/video/domain/entities/video.entity';
import { ChannelService } from 'src/channel/infrastructure/services/channel.service';

export class UpdateVideoUseCase {
  private readonly logger = new Logger(UpdateVideoUseCase.name);

  constructor(
    @Inject('IVideoRepository')
    private readonly videoRepository: IVideoRepository,
    private readonly channelService: ChannelService,
  ) {}

  async execute(id: string, data: UpdateVideoDto): Promise<VideoEntity | null> {
    this.logger.log(`Mise à jour de Video id: ${id}`);

    // 1. Vérifier que la vidéo existe
    const video = await this.videoRepository.findById(id);
    if (!video) {
      this.logger.warn(`Vidéo non trouvée: ${id}`);
      throw new NotFoundException('Vidéo non trouvée');
    }

    // 2. Vérifier que l'utilisateur est bien le propriétaire de la chaîne de la vidéo
    const channel = await this.channelService.findById(video.getChannel().id);
    if (!channel || channel.getUserId() !== data.authorId) {
      this.logger.warn(
        `User ${data.authorId} n'est pas propriétaire de la chaîne ${video.getChannel().id}`,
      );
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres vidéos',
      );
    }

    try {
      const updated = await this.videoRepository.update(id, data);
      this.logger.log('Mise à jour réussie');
      return updated;
    } catch (error) {
      this.logger.error('Erreur lors de la mise à jour', error.stack);
      throw error;
    }
  }
}
