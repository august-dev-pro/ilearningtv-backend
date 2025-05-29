import { CommentEntity } from 'src/comment/domain/entities/comment.entity';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dtos/user.dto';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { VideoEntity } from 'src/video/domain/entities/video.entity';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, data: UpdateUserDto): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;

  deactivate(id: string): Promise<UserEntity>;
  changeRole(id: string, role: string): Promise<UserEntity>;
}
