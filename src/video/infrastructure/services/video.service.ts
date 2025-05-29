import { Injectable } from '@nestjs/common';
import { CreateVideoUseCase } from 'src/video/application/use-cases/create-video.use-case';
import { UpdateVideoUseCase } from 'src/video/application/use-cases/update-video.use-case';
import { GetByIdVideoUseCase } from 'src/video/application/use-cases/getById-video.use-case';
import { GetAllVideoUseCase } from 'src/video/application/use-cases/getAll-video.use-case';
import { DeleteVideoUseCase } from 'src/video/application/use-cases/delete-video.use-case';
import {
  CreateVideoDto,
  UpdateVideoDto,
} from 'src/video/application/dtos/video.dto';
import { VideoEntity } from 'src/video/domain/entities/video.entity';
import { GetByChannelVideoUseCase } from 'src/video/application/use-cases/get-by-channel-video.use-case';
import { GetLikedByUserVideoUseCase } from 'src/video/application/use-cases/get-liked-by-user-video.use-case';
import { GetCommentedByUserVideoUseCase } from 'src/video/application/use-cases/get-commented-by-user-video.use-case';

@Injectable()
export class VideoService {
  constructor(
    private readonly createUseCase: CreateVideoUseCase,
    private readonly updateUseCase: UpdateVideoUseCase,
    private readonly getByIdUseCase: GetByIdVideoUseCase,
    private readonly getAllUseCase: GetAllVideoUseCase,
    private readonly deleteUseCase: DeleteVideoUseCase,
    private readonly getByChannelUseCase: GetByChannelVideoUseCase,
    private readonly getLikedByUserUseCase: GetLikedByUserVideoUseCase,
    private readonly getCommentedByUserUseCase: GetCommentedByUserVideoUseCase,
  ) {}

  async create(dto: CreateVideoDto): Promise<VideoEntity> {
    return await this.createUseCase.execute(dto);
  }
  async update(id: string, dto: UpdateVideoDto): Promise<VideoEntity | null> {
    return await this.updateUseCase.execute(id, dto);
  }
  async getById(id: string): Promise<VideoEntity | null> {
    return await this.getByIdUseCase.execute(id);
  }
  async getAll(): Promise<VideoEntity[]> {
    return await this.getAllUseCase.execute();
  }
  async delete(id: string, authorId: string): Promise<void> {
    return await this.deleteUseCase.execute(id, authorId);
  }
  async getByChannel(channelId: string) {
    return this.getByChannelUseCase.execute(channelId);
  }
  async getLikedByUser(userId: string) {
    return this.getLikedByUserUseCase.execute(userId);
  }
  async getCommentedByUser(userId: string) {
    return this.getCommentedByUserUseCase.execute(userId);
  }
}
