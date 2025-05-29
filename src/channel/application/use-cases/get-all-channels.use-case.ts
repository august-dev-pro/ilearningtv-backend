import { Inject, Injectable, Logger } from '@nestjs/common';
import { IChannelRepository } from '../../domain/interfaces/channel.repository.interface';
import { ChannelEntity } from '../../domain/entities/channel.entity';

@Injectable()
export class GetAllChannelsUseCase {
  private readonly logger = new Logger(GetAllChannelsUseCase.name);

  constructor(
    @Inject('IChannelRepository')
    private readonly repo: IChannelRepository,
  ) {}

  async execute(): Promise<ChannelEntity[]> {
    try {
      this.logger.log('Récupération de toutes les chaînes');
      return await this.repo.findAll();
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des chaînes',
        error.stack,
      );
      throw error;
    }
  }
}
