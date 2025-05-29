import { Injectable } from '@nestjs/common';
import { VideoEntity } from 'src/video/domain/entities/video.entity';
import {
  CreateVideoDto,
  UpdateVideoDto,
} from 'src/video/application/dtos/video.dto';
import { VideoTypeEnum } from '../enums/video-type.enum';

@Injectable()
export class VideoMapper {
  toDomain(data: any): VideoEntity {
    return new VideoEntity(
      data.id,
      data.title,
      data.description,
      data.fileUrl,
      {
        id: data.category?.id,
        name: data.category?.name,
      },
      {
        id: data.channel?.id,
        name: data.channel?.name,
      },
      data.videoType as VideoTypeEnum,
      data.views,
      data.liveViewers,
      data.publishedAt,
      data.duration,
      data.tags,
      data.isLive,
      data.shares,
      data.reports,
      data.thumbnail
        ? { id: data.thumbnail.id, url: data.thumbnail.imageUrl }
        : undefined,
      Array.isArray(data.likes) ? data.likes.length : 0,
      Array.isArray(data.comments) ? data.comments.length : 0,
      data.createdAt,
      data.updatedAt,
    );
  }

  toPersistence(dto: CreateVideoDto): any {
    return {
      title: dto.title,
      description: dto.description,
      fileUrl: dto.videoUrl,
      categoryId: dto.categoryId,
      channelId: dto.channelId,
      videoType: dto.videoType,
      views: dto.views ?? 0,
      liveViewers: dto.liveViewers,
      duration: dto.duration,
      tags: dto.tags,
      isLive: dto.isLive,
      shares: dto.shares ?? 0,
      reports: dto.reports ?? 0,
    };
  }

  toUpdatePersistence(dto: UpdateVideoDto): any {
    const data: any = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.fileUrl !== undefined) data.fileUrl = dto.fileUrl;
    if (dto.categoryId !== undefined) data.categoryId = dto.categoryId;
    if (dto.channelId !== undefined) data.channelId = dto.channelId;
    if (dto.videoType !== undefined) data.videoType = dto.videoType;
    if (dto.views !== undefined) data.views = dto.views;
    if (dto.liveViewers !== undefined) data.liveViewers = dto.liveViewers;
    if (dto.duration !== undefined) data.duration = dto.duration;
    if (dto.tags !== undefined) data.tags = dto.tags;
    if (dto.isLive !== undefined) data.isLive = dto.isLive;
    if (dto.shares !== undefined) data.shares = dto.shares;
    if (dto.reports !== undefined) data.reports = dto.reports;
    return data;
  }
}
