import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateLikeDto,
  UpdateLikeDto,
} from 'src/like/application/dtos/like.dto';
import { ILikeRepository } from 'src/like/application/interfaces/like.repository.interface';
import { LikeEntity } from 'src/like/domain/entities/like.entity';
import { LikeMapper } from 'src/like/domain/mappers/like.mapper';

@Injectable()
export class LikeRepository implements ILikeRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: LikeMapper,
  ) {}

  // create
  async create(data: CreateLikeDto): Promise<LikeEntity> {
    const toPersist = this.mapper.toPersistence(data);
    const created = await this.prisma.like.create({ data: toPersist });
    return this.mapper.toDomain(created);
  }

  // find by id
  async findById(id: string): Promise<LikeEntity> {
    const record = await this.prisma.like.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`LikeEntity with id ${id} not found`);
    }

    return this.mapper.toDomain(record);
  }

  // update
  async update(id: string, data: UpdateLikeDto): Promise<LikeEntity> {
    const toUpdate = this.mapper.toUpdatePersistence(data);
    const updated = await this.prisma.like.update({
      where: { id },
      data: toUpdate,
    });

    return this.mapper.toDomain(updated);
  }

  // find all
  async findAll(): Promise<LikeEntity[]> {
    const records = await this.prisma.like.findMany();
    return records.map((record) => this.mapper.toDomain(record));
  }

  // delete
  async delete(id: string): Promise<void> {
    await this.prisma.like.delete({
      where: { id },
    });
  }

  async exists(userId: string, videoId: string): Promise<boolean> {
    const like = await this.prisma.like.findUnique({
      where: { userId_videoId: { userId, videoId } },
    });
    return !!like;
  }
}
