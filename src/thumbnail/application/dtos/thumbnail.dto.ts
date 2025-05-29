import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateThumbnailDto {
  @ApiProperty({ example: 'https://cdn.site.com/thumb.jpg' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ example: 'video-uuid-1234' })
  @IsString()
  videoId: string;
}

export class UpdateThumbnailDto {
  @ApiPropertyOptional({ example: 'https://cdn.site.com/thumb2.jpg' })
  @IsString()
  imageUrl?: string;
}
