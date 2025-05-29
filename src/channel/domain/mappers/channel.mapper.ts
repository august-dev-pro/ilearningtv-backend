import { Injectable } from '@nestjs/common';
import { ChannelEntity } from '../entities/channel.entity';

@Injectable()
export class ChannelMapper {
  toDomain(data: any): ChannelEntity {
    return new ChannelEntity(
      data.id,
      data.name,
      data.userId,
      data.createdAt,
      data.updatedAt,
    );
  }
}
