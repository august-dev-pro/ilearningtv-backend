import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { IChannelRepository } from '../../domain/interfaces/channel.repository.interface';
import { UpdateChannelDto } from '../dtos/channel.dto';
import { ChannelEntity } from '../../domain/entities/channel.entity';

@Injectable()
export class UpdateChannelUseCase {
  private readonly logger = new Logger(UpdateChannelUseCase.name);

  constructor(
    @Inject('IChannelRepository')
    private readonly repo: IChannelRepository,
  ) {}

  async execute(id: string, dto: UpdateChannelDto): Promise<ChannelEntity> {
    try {
      this.logger.log(`Mise à jour de la chaîne ${id}`);
      return await this.repo.update(id, dto);
    } catch (error) {
      this.logger.error(
        'Erreur lors de la mise à jour de la chaîne',
        error.stack,
      );
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        error.message || 'Erreur lors de la mise à jour de la chaîne',
      );
    }
  }
}
