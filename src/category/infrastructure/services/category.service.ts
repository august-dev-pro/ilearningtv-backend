import { Injectable } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/category/application/use-cases/create-category.use-case';
import { UpdateCategoryUseCase } from 'src/category/application/use-cases/update-category.use-case';
import { GetByIdCategoryUseCase } from 'src/category/application/use-cases/getById-category.use-case';
import { GetAllCategoryUseCase } from 'src/category/application/use-cases/getAll-category.use-case';
import { DeleteCategoryUseCase } from 'src/category/application/use-cases/delete-category.use-case';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/category/application/dtos/category.dto';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';
import { GetCategoryWithVideosUseCase } from 'src/category/application/use-cases/get-category-with-videos.use-case';

@Injectable()
export class CategoryService {
  constructor(
    private readonly createUseCase: CreateCategoryUseCase,
    private readonly updateUseCase: UpdateCategoryUseCase,
    private readonly getByIdUseCase: GetByIdCategoryUseCase,
    private readonly getAllUseCase: GetAllCategoryUseCase,
    private readonly deleteUseCase: DeleteCategoryUseCase,
    private readonly getCategoryWithVideosUseCase: GetCategoryWithVideosUseCase,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.createUseCase.execute(dto);
  }
  async update(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryEntity | null> {
    return await this.updateUseCase.execute(id, dto);
  }
  async getById(id: string): Promise<CategoryEntity | null> {
    return await this.getByIdUseCase.execute(id);
  }
  async getAll(): Promise<CategoryEntity[]> {
    return await this.getAllUseCase.execute();
  }
  async delete(id: string): Promise<void> {
    return await this.deleteUseCase.execute(id);
  }
  async getByIdWithVideos(id: string) {
    return this.getCategoryWithVideosUseCase.execute(id);
  }
}
