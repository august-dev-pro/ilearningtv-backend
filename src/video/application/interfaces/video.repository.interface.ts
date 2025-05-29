import {
  CreateVideoDto,
  UpdateVideoDto,
} from 'src/video/application/dtos/video.dto';
import { VideoEntity } from 'src/video/domain/entities/video.entity';

export interface IVideoRepository {
  create(data: CreateVideoDto): Promise<VideoEntity>;
  findById(id: string): Promise<VideoEntity | null>;
  findAll(): Promise<VideoEntity[]>;
  update(id: string, data: UpdateVideoDto): Promise<VideoEntity | null>;
  delete(id: string): Promise<void>;
  findByChannelId(authorId: string): Promise<VideoEntity[]>;
  findLikedByUser(userId: string): Promise<VideoEntity[]>;
  findCommentedByUser(userId: string): Promise<VideoEntity[]>;
}
