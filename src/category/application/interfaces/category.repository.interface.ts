import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/category/application/dtos/category.dto';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';

export interface ICategoryRepository {
  create(data: CreateCategoryDto): Promise<CategoryEntity>;
  findById(id: string): Promise<CategoryEntity>;
  findAll(): Promise<CategoryEntity[]>;
  update(id: string, data: UpdateCategoryDto): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
  findByIdWithVideos(id: string): Promise<CategoryEntity>;
}
