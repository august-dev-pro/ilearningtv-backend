import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({ example: 'user-uuid-1234' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'video-uuid-5678' })
  @IsString()
  videoId: string;
}

export class UpdateLikeDto {
  // Généralement vide ou optionnel, car un like ne se met pas à jour
}
