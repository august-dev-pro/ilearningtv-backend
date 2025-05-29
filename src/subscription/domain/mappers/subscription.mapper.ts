import { Injectable } from '@nestjs/common';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { CreateSubscriptionDto } from '../../application/dtos/subscription.dto';

@Injectable()
export class SubscriptionMapper {
  toDomain(data: any): SubscriptionEntity {
    return new SubscriptionEntity(
      data.id,
      data.userId,
      data.channelId,
      data.createdAt,
    );
  }

  toPersistence(dto: CreateSubscriptionDto): any {
    return {
      userId: dto.userId,
      channelId: dto.channelId,
    };
  }

  // Pour update, mais ici il n'y a rien à updater sur Subscription (clé composite)
  toUpdatePersistence(dto: Partial<{ channelId: string }>): any {
    const data: any = {};
    if (dto.channelId) data.channelId = dto.channelId;
    return data;
  }
}
