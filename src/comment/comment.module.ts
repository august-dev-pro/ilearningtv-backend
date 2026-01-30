/**
 * CommentModule est le module principal qui gère l'entité Comment.
 * Il regroupe tous les composants nécessaires pour traiter cette entité :
 * - Contrôleur
 * - Repository
 * - Use Cases
 * - Mapper
 * - Service
 */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentService } from 'src/comment/infrastructure/services/comment.service';
import { CommentController } from 'src/comment/presentation/controllers/comment.controller';
import { CommentRepository } from 'src/comment/infrastructure/repositories/comment.repository';
import { CreateCommentUseCase } from 'src/comment/application/use-cases/create-comment.use-case';
import { UpdateCommentUseCase } from 'src/comment/application/use-cases/update-comment.use-case';
import { GetByIdCommentUseCase } from 'src/comment/application/use-cases/getById-comment.use-case';
import { GetAllCommentUseCase } from 'src/comment/application/use-cases/getAll-comment.use-case';
import { DeleteCommentUseCase } from 'src/comment/application/use-cases/delete-comment.use-case';
import { CommentMapper } from 'src/comment/domain/mappers/comment.mapper';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [
    PrismaService,
    {
      provide: 'ICommentRepository',
      useClass: CommentRepository,
    },
    CommentService,
    CommentRepository,
    CreateCommentUseCase,
    UpdateCommentUseCase,
    GetByIdCommentUseCase,
    GetAllCommentUseCase,
    DeleteCommentUseCase,
    CommentMapper,
  ],
  exports: [CommentService],
})
export class CommentModule {}
