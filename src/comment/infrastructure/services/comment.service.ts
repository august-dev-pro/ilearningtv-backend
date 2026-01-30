import { Injectable } from '@nestjs/common';
import { CreateCommentUseCase } from 'src/comment/application/use-cases/create-comment.use-case';
import { UpdateCommentUseCase } from 'src/comment/application/use-cases/update-comment.use-case';
import { GetByIdCommentUseCase } from 'src/comment/application/use-cases/getById-comment.use-case';
import { GetAllCommentUseCase } from 'src/comment/application/use-cases/getAll-comment.use-case';
import { DeleteCommentUseCase } from 'src/comment/application/use-cases/delete-comment.use-case';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from 'src/comment/application/dtos/comment.dto';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly createUseCase: CreateCommentUseCase,
    private readonly updateUseCase: UpdateCommentUseCase,
    private readonly getByIdUseCase: GetByIdCommentUseCase,
    private readonly getAllUseCase: GetAllCommentUseCase,
    private readonly deleteUseCase: DeleteCommentUseCase,
  ) {}

  async create(dto: CreateCommentDto): Promise<CommentEntity> {
    return await this.createUseCase.execute(dto);
  }
  async update(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentEntity | null> {
    return await this.updateUseCase.execute(id, dto);
  }
  async getById(id: string): Promise<CommentEntity | null> {
    return await this.getByIdUseCase.execute(id);
  }
  async getAll(): Promise<CommentEntity[]> {
    return await this.getAllUseCase.execute();
  }
  async delete(id: string): Promise<void> {
    return await this.deleteUseCase.execute(id);
  }
}
