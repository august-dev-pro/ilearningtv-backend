import { ChannelEntity } from '../entities/channel.entity';
import {
  CreateChannelDto,
  UpdateChannelDto,
} from '../../application/dtos/channel.dto';

export interface IChannelRepository {
  create(data: CreateChannelDto): Promise<ChannelEntity>;
  findById(id: string): Promise<ChannelEntity | null>;
  findAll(): Promise<ChannelEntity[]>;
  findByUserId(userId: string): Promise<ChannelEntity[]>;
  update(id: string, data: UpdateChannelDto): Promise<ChannelEntity>;
  delete(id: string): Promise<void>;
}
