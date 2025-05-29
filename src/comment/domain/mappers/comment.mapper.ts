import { Injectable } from '@nestjs/common';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from 'src/comment/application/dtos/comment.dto';

@Injectable()
export class CommentMapper {
  toDomain(data: any): CommentEntity {
    return new CommentEntity(
      data.id,
      data.userId,
      data.videoId,
      data.content,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }

  toPersistence(dto: CreateCommentDto): any {
    return {
      content: dto.content,
      userId: dto.userId,
      videoId: dto.videoId,
    };
  }

  toUpdatePersistence(dto: UpdateCommentDto): any {
    const data: any = {};
    if (dto.content !== undefined) data.content = dto.content;
    return data;
  }
}
