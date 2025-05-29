import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 'channel-uuid' })
  @IsString()
  channelId: string;

  @IsString()
  userId: string;
}
