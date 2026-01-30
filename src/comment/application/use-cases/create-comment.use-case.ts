/**
 * Use Case pour créer un Comment.
 */
import { Inject, Logger } from '@nestjs/common';
import { CreateCommentDto } from 'src/comment/application/dtos/comment.dto';
import { ICommentRepository } from 'src/comment/application/interfaces/comment.repository.interface';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';

export class CreateCommentUseCase {
  private readonly logger = new Logger(CreateCommentUseCase.name);

  constructor(
    @Inject('ICommentRepository')
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(data: CreateCommentDto): Promise<CommentEntity> {
    this.logger.log('Début création Comment');
    try {
      const result = await this.commentRepository.create(data);
      this.logger.log('Création réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la création', error.stack);
      throw error;
    }
  }
}
