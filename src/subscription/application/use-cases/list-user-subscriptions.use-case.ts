import { Injectable, Inject, Logger } from '@nestjs/common';
import { ISubscriptionRepository } from '../../domain/interfaces/subscription.repository.interface';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

@Injectable()
export class ListUserSubscriptionsUseCase {
  private readonly logger = new Logger(ListUserSubscriptionsUseCase.name);

  constructor(
    @Inject('ISubscriptionRepository')
    private readonly repo: ISubscriptionRepository,
  ) {}

  async execute(userId: string): Promise<SubscriptionEntity[]> {
    this.logger.log(`Listing subscriptions for user ${userId}`);
    return this.repo.findByUser(userId);
  }
}
