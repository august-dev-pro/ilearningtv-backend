/**
 * Use Case pour récupérer un Comment par son ID.
 */
import { Inject, Logger } from '@nestjs/common';
import { ICommentRepository } from 'src/comment/application/interfaces/comment.repository.interface';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';

export class GetByIdCommentUseCase {
  private readonly logger = new Logger(GetByIdCommentUseCase.name);

  constructor(
    @Inject('ICommentRepository')
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(id: string): Promise<CommentEntity | null> {
    this.logger.log(`Recherche de Comment par id: ${id}`);
    try {
      const result = await this.commentRepository.findById(id);
      this.logger.log('Recherche réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche', error.stack);
      throw error;
    }
  }
}
