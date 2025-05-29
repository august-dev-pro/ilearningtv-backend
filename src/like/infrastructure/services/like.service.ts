import { Injectable } from '@nestjs/common';
import { CreateLikeUseCase } from 'src/like/application/use-cases/create-like.use-case';
import { UpdateLikeUseCase } from 'src/like/application/use-cases/update-like.use-case';
import { GetByIdLikeUseCase } from 'src/like/application/use-cases/getById-like.use-case';
import { GetAllLikeUseCase } from 'src/like/application/use-cases/getAll-like.use-case';
import { DeleteLikeUseCase } from 'src/like/application/use-cases/delete-like.use-case';
import { ExistsLikeUseCase } from 'src/like/application/use-cases/exists-like.use-case';
import {
  CreateLikeDto,
  UpdateLikeDto,
} from 'src/like/application/dtos/like.dto';
import { LikeEntity } from 'src/like/domain/entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly createUseCase: CreateLikeUseCase,
    private readonly updateUseCase: UpdateLikeUseCase,
    private readonly getByIdUseCase: GetByIdLikeUseCase,
    private readonly getAllUseCase: GetAllLikeUseCase,
    private readonly deleteUseCase: DeleteLikeUseCase,
    private readonly existsLikeUseCase: ExistsLikeUseCase,
  ) {}

  async create(dto: CreateLikeDto): Promise<LikeEntity> {
    return await this.createUseCase.execute(dto);
  }
  async update(id: string, dto: UpdateLikeDto): Promise<LikeEntity | null> {
    return await this.updateUseCase.execute(id, dto);
  }
  async getById(id: string): Promise<LikeEntity | null> {
    return await this.getByIdUseCase.execute(id);
  }
  async getAll(): Promise<LikeEntity[]> {
    return await this.getAllUseCase.execute();
  }
  async delete(id: string): Promise<void> {
    return await this.deleteUseCase.execute(id);
  }
  async exists(userId: string, videoId: string): Promise<boolean> {
    return this.existsLikeUseCase.execute(userId, videoId);
  }
}
