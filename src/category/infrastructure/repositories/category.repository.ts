import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/category/application/dtos/category.dto';
import { ICategoryRepository } from 'src/category/application/interfaces/category.repository.interface';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';
import { CategoryMapper } from 'src/category/domain/mappers/category.mapper';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: CategoryMapper,
  ) {}

  // create
  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    const toPersist = this.mapper.toPersistence(data);
    const created = await this.prisma.category.create({ data: toPersist });
    return this.mapper.toDomain(created);
  }

  // find by id
  async findById(id: string): Promise<CategoryEntity> {
    const record = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`CategoryEntity with id ${id} not found`);
    }

    return this.mapper.toDomain(record);
  }

  // update
  async update(id: string, data: UpdateCategoryDto): Promise<CategoryEntity> {
    const toUpdate = this.mapper.toUpdatePersistence(data);
    const updated = await this.prisma.category.update({
      where: { id },
      data: toUpdate,
    });

    return this.mapper.toDomain(updated);
  }

  // find all
  async findAll(): Promise<CategoryEntity[]> {
    const records = await this.prisma.category.findMany({
      include: { videos: true },
    });
    return records.map((record) => this.mapper.toDomain(record));
  }

  // delete
  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  async findByIdWithVideos(id: string): Promise<CategoryEntity> {
    const record = await this.prisma.category.findUnique({
      where: { id },
      include: { videos: true }, // Inclure les vidéos liées
    });

    if (!record) {
      throw new NotFoundException(`CategoryEntity with id ${id} not found`);
    }

    return this.mapper.toDomain(record);
  }
}
