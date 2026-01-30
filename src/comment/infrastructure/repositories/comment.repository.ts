import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from 'src/comment/application/dtos/comment.dto';
import { ICommentRepository } from 'src/comment/application/interfaces/comment.repository.interface';
import { CommentEntity } from 'src/comment/domain/entities/comment.entity';
import { CommentMapper } from 'src/comment/domain/mappers/comment.mapper';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: CommentMapper,
  ) {}

  // create
  async create(data: CreateCommentDto): Promise<CommentEntity> {
    const toPersist = this.mapper.toPersistence(data);
    const created = await this.prisma.comment.create({ data: toPersist });
    return this.mapper.toDomain(created);
  }

  // find by id
  async findById(id: string): Promise<CommentEntity> {
    const record = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`CommentEntity with id ${id} not found`);
    }

    return this.mapper.toDomain(record);
  }

  // update
  async update(id: string, data: UpdateCommentDto): Promise<CommentEntity> {
    const toUpdate = this.mapper.toUpdatePersistence(data);
    const updated = await this.prisma.comment.update({
      where: { id },
      data: toUpdate,
    });

    return this.mapper.toDomain(updated);
  }

  // find all
  async findAll(): Promise<CommentEntity[]> {
    const records = await this.prisma.comment.findMany();
    return records.map((record) => this.mapper.toDomain(record));
  }

  // delete
  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    });
  }
}
