import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { IChannelRepository } from '../../domain/interfaces/channel.repository.interface';

@Injectable()
export class DeleteChannelUseCase {
  private readonly logger = new Logger(DeleteChannelUseCase.name);

  constructor(
    @Inject('IChannelRepository')
    private readonly repo: IChannelRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      this.logger.log(`Suppression de la chaîne ${id}`);
      await this.repo.delete(id);
    } catch (error) {
      this.logger.error(
        'Erreur lors de la suppression de la chaîne',
        error.stack,
      );
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        error.message || 'Erreur lors de la suppression de la chaîne',
      );
    }
  }
}
