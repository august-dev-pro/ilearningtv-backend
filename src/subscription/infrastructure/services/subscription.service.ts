import { Injectable } from '@nestjs/common';
import { SubscribeUseCase } from '../../application/use-cases/subscribe.use-case';
import { UnsubscribeUseCase } from '../../application/use-cases/unsubscribe.use-case';
import { ListUserSubscriptionsUseCase } from '../../application/use-cases/list-user-subscriptions.use-case';
import { ListChannelSubscribersUseCase } from '../../application/use-cases/list-channel-subscribers.use-case';
import { CreateSubscriptionDto } from 'src/subscription/application/dtos/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscribe: SubscribeUseCase,
    private readonly unsubscribe: UnsubscribeUseCase,
    private readonly listUserSubscriptions: ListUserSubscriptionsUseCase,
    private readonly listChannelSubscribers: ListChannelSubscribersUseCase,
  ) {}

  subscribeUser(dto: CreateSubscriptionDto) {
    return this.subscribe.execute(dto);
  }

  unsubscribeUser(dto: CreateSubscriptionDto) {
    return this.unsubscribe.execute(dto);
  }

  getUserSubscriptions(userId: string) {
    return this.listUserSubscriptions.execute(userId);
  }

  getChannelSubscribers(channelId: string) {
    return this.listChannelSubscribers.execute(channelId);
  }
}
