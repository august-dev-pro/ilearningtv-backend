import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { ISubscriptionRepository } from '../../domain/interfaces/subscription.repository.interface';
import { CreateSubscriptionDto } from '../dtos/subscription.dto';

@Injectable()
export class UnsubscribeUseCase {
  private readonly logger = new Logger(UnsubscribeUseCase.name);

  constructor(
    @Inject('ISubscriptionRepository')
    private readonly repo: ISubscriptionRepository,
  ) {}

  async execute(dto: CreateSubscriptionDto): Promise<void> {
    this.logger.log(
      `User ${dto.userId} unsubscribing from channel ${dto.channelId}`,
    );
    const exists = await this.repo.isSubscribed(dto.userId, dto.channelId);
    if (!exists) {
      this.logger.warn(
        `Abonnement introuvable pour user ${dto.userId} et channel ${dto.channelId}`,
      );
      throw new NotFoundException('Abonnement non trouvé');
    }
    return this.repo.delete(dto.userId, dto.channelId);
  }
}
