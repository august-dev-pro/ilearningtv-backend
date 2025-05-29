import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ChannelMapper } from './domain/mappers/channel.mapper';
import { ChannelRepository } from './infrastructure/repositories/channel.repository';

import { CreateChannelUseCase } from './application/use-cases/create-channel.use-case';
import { GetChannelByIdUseCase } from './application/use-cases/get-channel-by-id.use-case';
import { GetAllChannelsUseCase } from './application/use-cases/get-all-channels.use-case';
import { GetChannelsByUserIdUseCase } from './application/use-cases/get-channels-by-user-id.use-case';
import { UpdateChannelUseCase } from './application/use-cases/update-channel.use-case';
import { DeleteChannelUseCase } from './application/use-cases/delete-channel.use-case';

import { ChannelService } from './infrastructure/services/channel.service';
import { ChannelController } from './presentation/controllers/channel.controller';

@Module({
  providers: [
    PrismaService,
    ChannelMapper,
    {
      provide: 'IChannelRepository',
      useClass: ChannelRepository,
    },
    CreateChannelUseCase,
    GetChannelByIdUseCase,
    GetAllChannelsUseCase,
    GetChannelsByUserIdUseCase,
    UpdateChannelUseCase,
    DeleteChannelUseCase,
    ChannelService,
    ChannelRepository,
    ChannelMapper,
  ],
  controllers: [ChannelController],
  exports: [ChannelService, ChannelMapper, ChannelRepository],
})
export class ChannelModule {}
