import {
  Injectable,
  Logger,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { IChannelRepository } from '../../domain/interfaces/channel.repository.interface';
import { CreateChannelDto } from '../dtos/channel.dto';
import { ChannelEntity } from '../../domain/entities/channel.entity';

@Injectable()
export class CreateChannelUseCase {
  private readonly logger = new Logger(CreateChannelUseCase.name);

  constructor(
    @Inject('IChannelRepository')
    private readonly repo: IChannelRepository,
  ) {}

  async execute(dto: CreateChannelDto): Promise<ChannelEntity> {
    try {
      this.logger.log(`Creating channel for user ${dto.userId}`);
      return await this.repo.create(dto);
    } catch (error) {
      this.logger.error('Error in use-case', error.stack);
      throw new BadRequestException(
        error.message || 'Erreur lors de la création de la chaîne',
      );
    }
  }
}
