import {
  CreateThumbnailDto,
  UpdateThumbnailDto,
} from 'src/thumbnail/application/dtos/thumbnail.dto';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';

export interface IThumbnailRepository {
  create(data: CreateThumbnailDto): Promise<ThumbnailEntity>;
  findById(id: string): Promise<ThumbnailEntity | null>;
  findAll(): Promise<ThumbnailEntity[]>;
  update(id: string, data: UpdateThumbnailDto): Promise<ThumbnailEntity | null>;
  delete(id: string): Promise<void>;
  findByVideoId(videoId: string): Promise<ThumbnailEntity | null>;
}
