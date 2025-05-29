import {
  CreateLikeDto,
  UpdateLikeDto,
} from 'src/like/application/dtos/like.dto';
import { LikeEntity } from 'src/like/domain/entities/like.entity';

export interface ILikeRepository {
  create(data: CreateLikeDto): Promise<LikeEntity>;
  findById(id: string): Promise<LikeEntity | null>;
  findAll(): Promise<LikeEntity[]>;
  update(id: string, data: UpdateLikeDto): Promise<LikeEntity | null>;
  delete(id: string): Promise<void>;
  exists(userId: string, videoId: string): Promise<boolean>;
}
