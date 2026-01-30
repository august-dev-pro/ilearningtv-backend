/**
 * Use Case pour supprimer un Category.
 */
import { Inject, Logger } from '@nestjs/common';
import { ICategoryRepository } from 'src/category/application/interfaces/category.repository.interface';

export class DeleteCategoryUseCase {
  private readonly logger = new Logger(DeleteCategoryUseCase.name);

  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Suppression de Category id: ${id}`);
    try {
      await this.categoryRepository.delete(id);
      this.logger.log('Suppression réussie');
    } catch (error) {
      this.logger.error('Erreur lors de la suppression', error.stack);
      throw error;
    }
  }
}
