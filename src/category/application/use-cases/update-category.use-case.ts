/**
 * Use Case pour mettre à jour un Category existant.
 */
import { Inject, Logger } from '@nestjs/common';
import { UpdateCategoryDto } from 'src/category/application/dtos/category.dto';
import { ICategoryRepository } from 'src/category/application/interfaces/category.repository.interface';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';

export class UpdateCategoryUseCase {
  private readonly logger = new Logger(UpdateCategoryUseCase.name);

  constructor(
    @Inject("ICategoryRepository")
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string, data: UpdateCategoryDto): Promise<CategoryEntity | null> {
    this.logger.log(`Mise à jour de Category id: ${id}`);
    try {
      const result = await this.categoryRepository.update(id, data);
      this.logger.log('Mise à jour réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la mise à jour', error.stack);
      throw error;
    }
  }
}