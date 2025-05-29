import { Injectable } from '@nestjs/common';
import { LikeEntity } from '../entities/like.entity';
import {
  CreateLikeDto,
  UpdateLikeDto,
} from 'src/like/application/dtos/like.dto';

@Injectable()
export class LikeMapper {
  toDomain(data: any): LikeEntity {
    return new LikeEntity(
      data.id,
      data.userId,
      data.videoId,
      new Date(data.createdAt),
    );
  }

  toPersistence(dto: CreateLikeDto): any {
    return {
      userId: dto.userId,
      videoId: dto.videoId,
    };
  }

  toUpdatePersistence(dto: UpdateLikeDto): any {
    // Généralement vide, car un like ne se met pas à jour
    return {};
  }
}
