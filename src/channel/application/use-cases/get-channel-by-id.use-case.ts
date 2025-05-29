import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IChannelRepository } from '../../domain/interfaces/channel.repository.interface';
import { ChannelEntity } from '../../domain/entities/channel.entity';

@Injectable()
export class GetChannelByIdUseCase {
  private readonly logger = new Logger(GetChannelByIdUseCase.name);

  constructor(
    @Inject('IChannelRepository')
    private readonly repo: IChannelRepository,
  ) {}

  async execute(id: string): Promise<ChannelEntity> {
    try {
      this.logger.log(`Recherche de la chaîne ${id}`);
      const channel = await this.repo.findById(id);
      if (!channel) {
        this.logger.warn(`Chaîne non trouvée: ${id}`);
        throw new NotFoundException('Chaîne non trouvée');
      }
      return channel;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la recherche de la chaîne',
        error.stack,
      );
      throw error;
    }
  }
}
