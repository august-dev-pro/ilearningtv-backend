import { Inject, Logger } from '@nestjs/common';
import { ICategoryRepository } from '../interfaces/category.repository.interface';
import { CategoryEntity } from '../../domain/entities/category.entity';

export class GetCategoryWithVideosUseCase {
  private readonly logger = new Logger(GetCategoryWithVideosUseCase.name);

  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<CategoryEntity> {
    this.logger.log(`Recherche de la catégorie ${id} avec ses vidéos`);
    return this.categoryRepository.findByIdWithVideos(id);
  }
}
