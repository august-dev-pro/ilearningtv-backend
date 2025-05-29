import { CreateCommentDto, UpdateCommentDto } from 'src/comment/application/dtos/comment.dto';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';

export interface ICommentRepository {
  create(data: CreateCommentDto): Promise<CommentEntity>;
  findById(id: string): Promise<CommentEntity | null>;
  findAll(): Promise<CommentEntity[]>;
  update(id: string, data: UpdateCommentDto): Promise<CommentEntity | null>;
  delete(id: string): Promise<void>;
}