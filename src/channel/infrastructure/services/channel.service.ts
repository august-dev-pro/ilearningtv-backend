import { Injectable } from '@nestjs/common';
import { CreateChannelUseCase } from '../../application/use-cases/create-channel.use-case';
import { GetChannelByIdUseCase } from '../../application/use-cases/get-channel-by-id.use-case';
import { GetAllChannelsUseCase } from '../../application/use-cases/get-all-channels.use-case';
import { GetChannelsByUserIdUseCase } from '../../application/use-cases/get-channels-by-user-id.use-case';
import { UpdateChannelUseCase } from '../../application/use-cases/update-channel.use-case';
import { DeleteChannelUseCase } from '../../application/use-cases/delete-channel.use-case';
import {
  CreateChannelDto,
  UpdateChannelDto,
} from 'src/channel/application/dtos/channel.dto';
import { ChannelEntity } from 'src/channel/domain/entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    private readonly createChannel: CreateChannelUseCase,
    private readonly getChannelById: GetChannelByIdUseCase,
    private readonly getAllChannels: GetAllChannelsUseCase,
    private readonly getChannelsByUserId: GetChannelsByUserIdUseCase,
    private readonly updateChannel: UpdateChannelUseCase,
    private readonly deleteChannel: DeleteChannelUseCase,
  ) {}

  create(dto: CreateChannelDto): Promise<ChannelEntity> {
    return this.createChannel.execute(dto);
  }

  findById(id: string): Promise<ChannelEntity> {
    return this.getChannelById.execute(id);
  }

  findAll(): Promise<ChannelEntity[]> {
    return this.getAllChannels.execute();
  }

  findByUserId(userId: string): Promise<ChannelEntity[]> {
    return this.getChannelsByUserId.execute(userId);
  }

  update(id: string, dto: UpdateChannelDto): Promise<ChannelEntity> {
    return this.updateChannel.execute(id, dto);
  }

  delete(id: string): Promise<void> {
    return this.deleteChannel.execute(id);
  }
}
