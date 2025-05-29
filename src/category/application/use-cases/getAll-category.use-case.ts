/**
 * Use Case pour récupérer tous les Categorys.
 */
import { Inject, Logger } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interfaces/category.repository.interface';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';

export class GetAllCategoryUseCase {
  private readonly logger = new Logger(GetAllCategoryUseCase.name);

  constructor(
    @Inject("ICategoryRepository")
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    this.logger.log('Récupération de tous les Categorys');
    try {
      const result = await this.categoryRepository.findAll();
      this.logger.log('Récupération réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération', error.stack);
      throw error;
    }
  }
}