/**
 * CategoryController gère les endpoints de l'API pour l'entité Category.
 * Il utilise les cas d'utilisation (Use Cases) pour orchestrer les différentes actions métiers liées à l'entité.
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Injectable,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from 'src/category/infrastructure/services/category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/category/application/dtos/category.dto';

@Injectable()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  // 📌 Créer un category
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async create(@Body() dto: CreateCategoryDto) {
    return await this.service.create(dto);
  }

  // 📌 Mettre à jour un category
  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.service.update(id, dto);
  }

  // 📌 Récupérer un category par ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  // 📌 Récupérer un category par ID avec ses vidéos
  @Get(':id/with-videos')
  @ApiOperation({ summary: 'Get a category by ID with its videos' })
  async getByIdWithVideos(@Param('id') id: string) {
    return this.service.getByIdWithVideos(id);
  }

  // 📌 Récupérer tous les categorys
  @Get()
  @ApiOperation({ summary: 'Get all categorys' })
  async getAll() {
    return await this.service.getAll();
  }

  // 📌 Supprimer un category
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
