/**
 * Use Case pour supprimer un Video.
 */
import {
  Inject,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IVideoRepository } from 'src/video/application/interfaces/video.repository.interface';
import { ChannelService } from 'src/channel/infrastructure/services/channel.service';

export class DeleteVideoUseCase {
  private readonly logger = new Logger(DeleteVideoUseCase.name);

  constructor(
    @Inject('IVideoRepository')
    private readonly videoRepository: IVideoRepository,
    private readonly channelService: ChannelService,
  ) {}

  async execute(id: string, authorId: string): Promise<void> {
    this.logger.log(`Suppression de Video id: ${id}`);

    // 1. Vérifier que la vidéo existe
    const video = await this.videoRepository.findById(id);
    if (!video) {
      this.logger.warn(`Vidéo non trouvée: ${id}`);
      throw new NotFoundException('Vidéo non trouvée');
    }

    // 2. Vérifier que l'utilisateur est bien le propriétaire de la chaîne de la vidéo
    const channel = await this.channelService.findById(video.getChannel().id);
    if (!channel || channel.getUserId() !== authorId) {
      this.logger.warn(
        `User ${authorId} n'est pas propriétaire de la chaîne ${video.getChannel().id}`,
      );
      throw new ForbiddenException(
        'Vous ne pouvez supprimer que vos propres vidéos',
      );
    }

    try {
      await this.videoRepository.delete(id);
      this.logger.log('Suppression réussie');
    } catch (error) {
      this.logger.error('Erreur lors de la suppression', error.stack);
      throw error;
    }
  }
}
