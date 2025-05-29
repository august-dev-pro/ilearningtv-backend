import { Injectable } from '@nestjs/common';
import { CreateThumbnailUseCase } from 'src/thumbnail/application/use-cases/create-thumbnail.use-case';
import { UpdateThumbnailUseCase } from 'src/thumbnail/application/use-cases/update-thumbnail.use-case';
import { GetByIdThumbnailUseCase } from 'src/thumbnail/application/use-cases/getById-thumbnail.use-case';
import { GetAllThumbnailUseCase } from 'src/thumbnail/application/use-cases/getAll-thumbnail.use-case';
import { DeleteThumbnailUseCase } from 'src/thumbnail/application/use-cases/delete-thumbnail.use-case';
import { GetThumbnailsByVideoIdUseCase } from 'src/thumbnail/application/use-cases/get-thumbnails-by-video-id.use-case';
import {
  CreateThumbnailDto,
  UpdateThumbnailDto,
} from 'src/thumbnail/application/dtos/thumbnail.dto';
import { ThumbnailEntity } from 'src/thumbnail/domain/entities/thumbnail.entity';

@Injectable()
export class ThumbnailService {
  constructor(
    private readonly createUseCase: CreateThumbnailUseCase,
    private readonly updateUseCase: UpdateThumbnailUseCase,
    private readonly getByIdUseCase: GetByIdThumbnailUseCase,
    private readonly getAllUseCase: GetAllThumbnailUseCase,
    private readonly deleteUseCase: DeleteThumbnailUseCase,
    private readonly getThumbnailsByVideoIdUseCase: GetThumbnailsByVideoIdUseCase,
  ) {}

  async create(dto: CreateThumbnailDto): Promise<ThumbnailEntity> {
    return await this.createUseCase.execute(dto);
  }
  async update(
    id: string,
    dto: UpdateThumbnailDto,
  ): Promise<ThumbnailEntity | null> {
    return await this.updateUseCase.execute(id, dto);
  }
  async getById(id: string): Promise<ThumbnailEntity | null> {
    return await this.getByIdUseCase.execute(id);
  }
  async getAll(): Promise<ThumbnailEntity[]> {
    return await this.getAllUseCase.execute();
  }
  async delete(id: string): Promise<void> {
    return await this.deleteUseCase.execute(id);
  }
  async getByVideoId(videoId: string) {
    return this.getThumbnailsByVideoIdUseCase.execute(videoId);
  }
}
