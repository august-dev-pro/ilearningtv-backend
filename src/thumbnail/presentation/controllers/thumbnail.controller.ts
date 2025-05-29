/**
 * ThumbnailController gère les endpoints de l'API pour l'entité Thumbnail.
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
import { ThumbnailService } from 'src/thumbnail/infrastructure/services/thumbnail.service';
import {
  CreateThumbnailDto,
  UpdateThumbnailDto,
} from 'src/thumbnail/application/dtos/thumbnail.dto';

@Injectable()
@ApiTags('Thumbnail')
@Controller('thumbnail')
export class ThumbnailController {
  constructor(private readonly service: ThumbnailService) {}

  // 📌 Créer un thumbnail
  @Post()
  @ApiOperation({ summary: 'Create a new thumbnail' })
  async create(@Body() dto: CreateThumbnailDto) {
    return await this.service.create(dto);
  }

  // 📌 Mettre à jour un thumbnail
  @Put(':id')
  @ApiOperation({ summary: 'Update a thumbnail' })
  async update(@Param('id') id: string, @Body() dto: UpdateThumbnailDto) {
    return await this.service.update(id, dto);
  }

  // 📌 Récupérer un thumbnail par ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a thumbnail by ID' })
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  // 📌 Récupérer tous les thumbnails
  @Get()
  @ApiOperation({ summary: 'Get all thumbnails' })
  async getAll() {
    return await this.service.getAll();
  }

  // 📌 Supprimer un thumbnail
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a thumbnail by ID' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  // 📌 Récupérer tous les thumbnails par ID de vidéo
  @Get('video/:videoId')
  @ApiOperation({ summary: 'Get thumbnail for a video' })
  async getByVideoId(@Param('videoId') videoId: string) {
    return await this.service.getByVideoId(videoId);
  }
}
