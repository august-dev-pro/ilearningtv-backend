/**
 * Use Case pour récupérer un Category par son ID.
 */
import { Inject, Logger } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interfaces/category.repository.interface';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';

export class GetByIdCategoryUseCase {
  private readonly logger = new Logger(GetByIdCategoryUseCase.name);

  constructor(
    @Inject("ICategoryRepository")
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<CategoryEntity | null> {
    this.logger.log(`Recherche de Category par id: ${id}`);
    try {
      const result = await this.categoryRepository.findById(id);
      this.logger.log('Recherche réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche', error.stack);
      throw error;
    }
  }
}