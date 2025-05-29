import { Injectable } from '@nestjs/common';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';
import {
  CreateThumbnailDto,
  UpdateThumbnailDto,
} from 'src/thumbnail/application/dtos/thumbnail.dto';

@Injectable()
export class ThumbnailMapper {
  toDomain(data: any): ThumbnailEntity {
    return new ThumbnailEntity(
      data.id,
      data.imageUrl,
      data.videoId,
      data.createdAt,
      data.updatedAt,
    );
  }

  toPersistence(dto: CreateThumbnailDto): any {
    return {
      imageUrl: dto.imageUrl,
    };
  }

  toUpdatePersistence(dto: UpdateThumbnailDto): any {
    const data: any = {};
    if (dto.imageUrl !== undefined) data.imageUrl = dto.imageUrl;
    return data;
  }
}
