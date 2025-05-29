/**
 * LikeController gère les endpoints de l'API pour l'entité Like.
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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LikeService } from 'src/like/infrastructure/services/like.service';
import {
  CreateLikeDto,
  UpdateLikeDto,
} from 'src/like/application/dtos/like.dto';

@Injectable()
@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private readonly service: LikeService) {}

  // 📌 Créer un like
  @Post()
  @ApiOperation({ summary: 'Create a new like' })
  async create(@Body() dto: CreateLikeDto) {
    return await this.service.create(dto);
  }

  // 📌 Mettre à jour un like
  @Put(':id')
  @ApiOperation({ summary: 'Update a like' })
  async update(@Param('id') id: string, @Body() dto: UpdateLikeDto) {
    return await this.service.update(id, dto);
  }

  // 📌 Récupérer un like par ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a like by ID' })
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  // 📌 Récupérer tous les likes
  @Get()
  @ApiOperation({ summary: 'Get all likes' })
  async getAll() {
    return await this.service.getAll();
  }

  // 📌 Supprimer un like
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a like by ID' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  // 📌 Vérifie si un like existe pour un user et une vidéo
  @Get('exists')
  @ApiOperation({
    summary: 'Vérifie si un like existe pour un user et une vidéo',
  })
  async exists(
    @Query('userId') userId: string,
    @Query('videoId') videoId: string,
  ) {
    return { exists: await this.service.exists(userId, videoId) };
  }
}
