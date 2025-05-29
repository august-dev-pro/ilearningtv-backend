import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateThumbnailDto,
  UpdateThumbnailDto,
} from 'src/thumbnail/application/dtos/thumbnail.dto';
import { IThumbnailRepository } from 'src/thumbnail/application/interfaces/thumbnail.repository.interface';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';
import { ThumbnailMapper } from 'src/thumbnail/domain/mappers/thumbnail.mapper';

@Injectable()
export class ThumbnailRepository implements IThumbnailRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ThumbnailMapper,
  ) {}

  // create
  async create(data: CreateThumbnailDto): Promise<ThumbnailEntity> {
    const toPersist = this.mapper.toPersistence(data);
    const created = await this.prisma.thumbnail.create({
      data: {
        ...toPersist,
        video: {
          connect: { id: data.videoId }, // Assure-toi que CreateThumbnailDto contient bien videoId
        },
      },
    });
    return this.mapper.toDomain(created);
  }

  // find by id
  async findById(id: string): Promise<ThumbnailEntity> {
    const record = await this.prisma.thumbnail.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`ThumbnailEntity with id ${id} not found`);
    }

    return this.mapper.toDomain(record);
  }

  // update
  async update(id: string, data: UpdateThumbnailDto): Promise<ThumbnailEntity> {
    const toUpdate = this.mapper.toUpdatePersistence(data);
    const updated = await this.prisma.thumbnail.update({
      where: { id },
      data: toUpdate,
    });

    return this.mapper.toDomain(updated);
  }

  // find all
  async findAll(): Promise<ThumbnailEntity[]> {
    const records = await this.prisma.thumbnail.findMany();
    return records.map((record) => this.mapper.toDomain(record));
  }

  // delete
  async delete(id: string): Promise<void> {
    await this.prisma.thumbnail.delete({
      where: { id },
    });
  }

  // Pour récupérer tous les thumbnails d'une vidéo
  async findByVideoId(videoId: string): Promise<ThumbnailEntity | null> {
    const record = await this.prisma.thumbnail.findUnique({
      where: { videoId },
    });
    return record ? this.mapper.toDomain(record) : null;
  }
}
