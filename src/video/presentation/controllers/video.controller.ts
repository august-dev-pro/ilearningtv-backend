/**
 * VideoController gère les endpoints de l'API pour l'entité Video.
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
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VideoService } from 'src/video/infrastructure/services/video.service';
import {
  CreateVideoDto,
  UpdateVideoDto,
} from 'src/video/application/dtos/video.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/CurrentUser';

function fileName(req, file, cb) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, uniqueSuffix + extname(file.originalname));
}

@Injectable()
@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly service: VideoService) {}

  // 📌 Créer un video
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'videoFile', maxCount: 1 },
        { name: 'thumbnailFile', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads', // dossier local
          filename: fileName,
        }),
      },
    ),
  )
  @ApiBody({ type: CreateVideoDto })
  async create(
    @UploadedFiles()
    files: {
      videoFile?: Express.Multer.File[];
      thumbnailFile?: Express.Multer.File[];
    },
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    // Récupérer les chemins des fichiers uploadés
    const videoUrl = files.videoFile?.[0]?.path;
    const thumbnailUrl = files.thumbnailFile?.[0]?.path;

    // Ajouter les URLs dans le body pour la création
    body.videoUrl = videoUrl;
    if (thumbnailUrl) body.thumbnailUrl = thumbnailUrl;

    body.authorId = user.userId;

    // console.log('the body: ', body);

    return this.service.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // 📌 Mettre à jour un video
  @Put(':id')
  @ApiOperation({ summary: 'Update a video' })
  async update(@Param('id') id: string, @Body() dto: UpdateVideoDto) {
    return await this.service.update(id, dto);
  }

  // 📌 Récupérer un video par ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a video by ID' })
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  // 📌 Récupérer tous les videos
  @Get()
  @ApiOperation({ summary: 'Get all videos' })
  async getAll() {
    return await this.service.getAll();
  }

  // 📌 Supprimer un video
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a video by ID' })
  async delete(@Param('id') id: string, @CurrentUser() user: any) {
    const authorId = user.userId;

    return await this.service.delete(id, authorId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // Récupérer les vidéos par auteur
  @Get('channel/:channelId')
  @ApiOperation({ summary: 'Get videos by author' })
  async getByAuthor(@Param('channelId') channelId: string) {
    return this.service.getByChannel(channelId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // Récupérer les vidéos likées par un user
  @Get('liked-by/:userId')
  @ApiOperation({ summary: 'Get videos liked by a user' })
  async getLikedByUser(@Param('userId') userId: string) {
    return this.service.getLikedByUser(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // Récupérer les vidéos commentées par un user
  @Get('commented-by/:userId')
  @ApiOperation({ summary: 'Get videos commented by a user' })
  async getCommentedByUser(@Param('userId') userId: string) {
    return this.service.getCommentedByUser(userId);
  }
}
