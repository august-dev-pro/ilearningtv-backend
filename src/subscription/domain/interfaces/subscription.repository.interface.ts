import { CreateSubscriptionDto } from 'src/subscription/application/dtos/subscription.dto';
import { SubscriptionEntity } from '../entities/subscription.entity';

export interface ISubscriptionRepository {
  create(dto: CreateSubscriptionDto): Promise<SubscriptionEntity>;
  delete(userId: string, channelId: string): Promise<void>;
  findByUser(userId: string): Promise<SubscriptionEntity[]>;
  findByChannel(channelId: string): Promise<SubscriptionEntity[]>;
  isSubscribed(userId: string, channelId: string): Promise<boolean>;
}
