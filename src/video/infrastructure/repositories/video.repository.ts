import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateVideoDto,
  UpdateVideoDto,
} from 'src/video/application/dtos/video.dto';
import { IVideoRepository } from 'src/video/application/interfaces/video.repository.interface';
import { VideoEntity } from 'src/video/domain/entities/video.entity';
import { VideoMapper } from 'src/video/domain/mappers/video.mapper';

@Injectable()
export class VideoRepository implements IVideoRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: VideoMapper,
  ) {}

  // create
  async create(data: CreateVideoDto): Promise<VideoEntity> {
    const toPersist = this.mapper.toPersistence(data);
    const created = await this.prisma.video.create({
      data: toPersist,
      include: {
        likes: true,
        comments: true,
        thumbnail: true,
        category: true,
        channel: true,
      },
    });
    return this.mapper.toDomain(created);
  }

  // find by id
  async findById(id: string): Promise<VideoEntity> {
    const record = await this.prisma.video.findUnique({
      where: { id },
      include: {
        likes: true,
        comments: true,
        thumbnail: true,
        category: true, // Ajouté
        channel: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`VideoEntity with id ${id} not found`);
    }

    return this.mapper.toDomain(record);
  }

  // update
  async update(id: string, data: UpdateVideoDto): Promise<VideoEntity> {
    const toUpdate = this.mapper.toUpdatePersistence(data);
    const updated = await this.prisma.video.update({
      where: { id },
      data: toUpdate,
    });

    return this.mapper.toDomain(updated);
  }

  // find all
  async findAll(): Promise<VideoEntity[]> {
    const records = await this.prisma.video.findMany({
      include: {
        likes: true,
        comments: true,
        thumbnail: true,
        category: true, // Ajouté
        channel: true,
      },
    });
    return records.map((record) => this.mapper.toDomain(record));
  }

  // delete
  async delete(id: string): Promise<void> {
    await this.prisma.video.delete({
      where: { id },
    });
  }

  async findByChannelId(channelId: string): Promise<VideoEntity[]> {
    const records = await this.prisma.video.findMany({
      where: { channelId },
      include: {
        likes: true,
        comments: true,
        thumbnail: true,
        category: true,
        channel: true,
      },
    });
    return records.map(this.mapper.toDomain);
  }

  async findLikedByUser(userId: string): Promise<VideoEntity[]> {
    const likes = await this.prisma.like.findMany({
      where: { userId },
      include: { video: true },
    });
    return likes.map((like) => this.mapper.toDomain(like.video));
  }

  async findCommentedByUser(userId: string): Promise<VideoEntity[]> {
    const comments = await this.prisma.comment.findMany({
      where: { userId },
      include: { video: true },
    });
    // Pour éviter les doublons si plusieurs commentaires sur la même vidéo
    const uniqueVideos = Array.from(
      new Map(comments.map((c) => [c.video.id, c.video])).values(),
    );
    return uniqueVideos.map(this.mapper.toDomain);
  }
}
