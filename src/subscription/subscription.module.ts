import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionMapper } from './domain/mappers/subscription.mapper';
import { SubscriptionRepository } from './infrastructure/repositories/subscription.repository';
import { SubscribeUseCase } from './application/use-cases/subscribe.use-case';
import { UnsubscribeUseCase } from './application/use-cases/unsubscribe.use-case';
import { ListUserSubscriptionsUseCase } from './application/use-cases/list-user-subscriptions.use-case';
import { ListChannelSubscribersUseCase } from './application/use-cases/list-channel-subscribers.use-case';
import { SubscriptionService } from './infrastructure/services/subscription.service';
import { SubscriptionController } from './presentation/controllers/subscription.controller';

@Module({
  providers: [
    PrismaService,
    SubscriptionMapper,
    {
      provide: 'ISubscriptionRepository',
      useClass: SubscriptionRepository,
    },
    SubscribeUseCase,
    UnsubscribeUseCase,
    ListUserSubscriptionsUseCase,
    ListChannelSubscribersUseCase,
    SubscriptionService,
  ],
  controllers: [SubscriptionController],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
