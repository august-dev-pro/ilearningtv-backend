/**
 * CommentController gère les endpoints de l'API pour l'entité Comment.
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
import { CommentService } from 'src/comment/infrastructure/services/comment.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from 'src/comment/application/dtos/comment.dto';

@Injectable()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  // 📌 Créer un comment
  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  async create(@Body() dto: CreateCommentDto) {
    return await this.service.create(dto);
  }

  // 📌 Mettre à jour un comment
  @Put(':id')
  @ApiOperation({ summary: 'Update a comment' })
  async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return await this.service.update(id, dto);
  }

  // 📌 Récupérer un comment par ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  // 📌 Récupérer tous les comments
  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  async getAll() {
    return await this.service.getAll();
  }

  // 📌 Supprimer un comment
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
