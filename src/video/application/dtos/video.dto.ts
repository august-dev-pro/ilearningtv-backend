import {
  IsEnum,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VideoTypeEnum } from 'src/video/domain/enums/video-type.enum';

export class CreateVideoDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Fichier vidéo',
  })
  videoFile: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Thumbnail (optionnel)',
  })
  @IsOptional()
  thumbnailFile?: any;

  @ApiProperty({ example: 'Introduction à NestJS' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Une vidéo pour découvrir les bases de NestJS.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'cat-uuid-1234' })
  @IsString()
  categoryId: string;

  @IsString()
  authorId: string;

  @ApiProperty({ example: 'id-de-la-chaine' })
  @IsString()
  channelId: string;

  @ApiPropertyOptional({ example: '/uploads/videos/educational_video.mp4' })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({ example: '/uploads/thumbnails/thumbnail.jpg' })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({ enum: VideoTypeEnum, default: VideoTypeEnum.STANDARD })
  @IsEnum(VideoTypeEnum)
  @IsOptional()
  videoType?: VideoTypeEnum;

  @IsOptional()
  @IsInt()
  views?: number;

  @IsOptional()
  @IsInt()
  liveViewers?: number;

  // @ApiPropertyOptional({ example: 3600 })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiPropertyOptional({ example: ['tuto', 'nestjs'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isLive?: boolean;

  // @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  shares?: number;

  // @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  reports?: number;
}

export class UpdateVideoDto {
  @IsString()
  authorId: string;

  @ApiPropertyOptional({ example: 'Nouveau titre' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Nouvelle description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '/uploads/videos/updated.mp4' })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiPropertyOptional({ example: 'cat-uuid-1234' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ example: 'id-de-la-chaine' })
  @IsString()
  @IsOptional()
  channelId?: string;

  @ApiPropertyOptional({ enum: VideoTypeEnum })
  @IsEnum(VideoTypeEnum)
  @IsOptional()
  videoType?: VideoTypeEnum;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  views?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  liveViewers?: number;

  @ApiPropertyOptional({ example: '2025-03-20T12:00:00Z' })
  @IsOptional()
  publishedAt?: Date;

  @ApiPropertyOptional({ example: 3600 })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiPropertyOptional({ example: ['tuto', 'nestjs'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isLive?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  shares?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  reports?: number;
}
