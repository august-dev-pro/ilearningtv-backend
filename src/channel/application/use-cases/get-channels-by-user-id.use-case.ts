import { Inject, Injectable, Logger } from '@nestjs/common';
import { IChannelRepository } from '../../domain/interfaces/channel.repository.interface';
import { ChannelEntity } from '../../domain/entities/channel.entity';

@Injectable()
export class GetChannelsByUserIdUseCase {
  private readonly logger = new Logger(GetChannelsByUserIdUseCase.name);

  constructor(
    @Inject('IChannelRepository')
    private readonly repo: IChannelRepository,
  ) {}

  async execute(userId: string): Promise<ChannelEntity[]> {
    try {
      this.logger.log(`Récupération des chaînes pour l'utilisateur ${userId}`);
      return await this.repo.findByUserId(userId);
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des chaînes par user',
        error.stack,
      );
      throw error;
    }
  }
}
