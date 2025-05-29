/**
 * Use Case pour mettre à jour un Comment existant.
 */
import { Inject, Logger } from '@nestjs/common';
import { UpdateCommentDto } from 'src/comment/application/dtos/comment.dto';
import { ICommentRepository } from 'src/comment/application/interfaces/comment.repository.interface';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';

export class UpdateCommentUseCase {
  private readonly logger = new Logger(UpdateCommentUseCase.name);

  constructor(
    @Inject("ICommentRepository")
    private readonly commentRepository: ICommentRepository,
  ) {}

  async execute(id: string, data: UpdateCommentDto): Promise<CommentEntity | null> {
    this.logger.log(`Mise à jour de Comment id: ${id}`);
    try {
      const result = await this.commentRepository.update(id, data);
      this.logger.log('Mise à jour réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la mise à jour', error.stack);
      throw error;
    }
  }
}