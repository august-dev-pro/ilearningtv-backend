/**
 * CategoryModule est le module principal qui gère l'entité Category.
 * Il regroupe tous les composants nécessaires pour traiter cette entité :
 * - Contrôleur
 * - Repository
 * - Use Cases
 * - Mapper
 * - Service
 */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from 'src/category/infrastructure/services/category.service';
import { CategoryController } from 'src/category/presentation/controllers/category.controller';
import { CategoryRepository } from 'src/category/infrastructure/repositories/category.repository';
import { CreateCategoryUseCase } from 'src/category/application/use-cases/create-category.use-case';
import { UpdateCategoryUseCase } from 'src/category/application/use-cases/update-category.use-case';
import { GetByIdCategoryUseCase } from 'src/category/application/use-cases/getById-category.use-case';
import { GetAllCategoryUseCase } from 'src/category/application/use-cases/getAll-category.use-case';
import { DeleteCategoryUseCase } from 'src/category/application/use-cases/delete-category.use-case';
import { CategoryMapper } from 'src/category/domain/mappers/category.mapper';
import { GetCategoryWithVideosUseCase } from 'src/category/application/use-cases/get-category-with-videos.use-case';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [
    PrismaService,
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
    CategoryService,
    CategoryRepository,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    GetByIdCategoryUseCase,
    GetAllCategoryUseCase,
    DeleteCategoryUseCase,
    CategoryMapper,
    GetCategoryWithVideosUseCase,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
