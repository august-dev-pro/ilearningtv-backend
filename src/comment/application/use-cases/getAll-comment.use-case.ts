/**
 * Use Case pour récupérer tous les Comments.
 */
import { Inject, Logger } from '@nestjs/common';
import { ICommentRepository } from 'src/comment/application/interfaces/comment.repository.interface';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';

export class GetAllCommentUseCase {
  private readonly logger = new Logger(GetAllCommentUseCase.name);

  constructor(
    @Inject('ICommentRepository')
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(): Promise<CommentEntity[]> {
    this.logger.log('Récupération de tous les Comments');
    try {
      const result = await this.commentRepository.findAll();
      this.logger.log('Récupération réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération', error.stack);
      throw error;
    }
  }
}
