/**
 * Use Case pour supprimer un Comment.
 */
import { Inject, Logger } from '@nestjs/common';
import { ICommentRepository } from 'src/comment/application/interfaces/comment.repository.interface';

export class DeleteCommentUseCase {
  private readonly logger = new Logger(DeleteCommentUseCase.name);

  constructor(
    @Inject('ICommentRepository')
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Suppression de Comment id: ${id}`);
    try {
      await this.commentRepository.delete(id);
      this.logger.log('Suppression réussie');
    } catch (error) {
      this.logger.error('Erreur lors de la suppression', error.stack);
      throw error;
    }
  }
}
