import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Super vidéo !' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'user-uuid-1234' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'video-uuid-5678' })
  @IsString()
  videoId: string;
}

export class UpdateCommentDto {
  @ApiPropertyOptional({ example: 'Nouveau commentaire' })
  @IsString()
  content?: string;
}
