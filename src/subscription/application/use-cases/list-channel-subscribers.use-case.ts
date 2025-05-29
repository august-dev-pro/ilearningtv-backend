import { Injectable, Inject, Logger } from '@nestjs/common';
import { ISubscriptionRepository } from '../../domain/interfaces/subscription.repository.interface';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

@Injectable()
export class ListChannelSubscribersUseCase {
  private readonly logger = new Logger(ListChannelSubscribersUseCase.name);

  constructor(
    @Inject('ISubscriptionRepository')
    private readonly repo: ISubscriptionRepository,
  ) {}

  async execute(channelId: string): Promise<SubscriptionEntity[]> {
    this.logger.log(`Listing subscribers for channel ${channelId}`);
    return this.repo.findByChannel(channelId);
  }
}
