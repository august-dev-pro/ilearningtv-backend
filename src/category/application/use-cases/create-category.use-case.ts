/**
 * Use Case pour créer un Category.
 */
import { Inject, Logger } from '@nestjs/common';
import { CreateCategoryDto } from 'src/category/application/dtos/category.dto';
import { ICategoryRepository } from 'src/category/application/interfaces/category.repository.interface';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';

export class CreateCategoryUseCase {
  private readonly logger = new Logger(CreateCategoryUseCase.name);

  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: CreateCategoryDto): Promise<CategoryEntity> {
    this.logger.log('Début création Category');
    try {
      const result = await this.categoryRepository.create(data);
      this.logger.log('Création réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la création', error.stack);
      throw error;
    }
  }
}
