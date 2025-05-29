import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/category/application/dtos/category.dto';

@Injectable()
export class CategoryMapper {
  toDomain(data: any): CategoryEntity {
    return new CategoryEntity(
      data.id,
      data.name,
      data.createdAt,
      data.updatedAt,
      data.videos,
    );
  }

  toPersistence(dto: CreateCategoryDto): any {
    return {
      name: dto.name,
    };
  }

  toUpdatePersistence(dto: UpdateCategoryDto): any {
    const data: any = {};
    if (dto.name !== undefined) data.name = dto.name;
    return data;
  }
}
