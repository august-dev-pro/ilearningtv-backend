import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ example: 'Ma chaîne YouTube' })
  @IsString()
  name: string;

  @IsString()
  userId: string;
}

export class UpdateChannelDto {
  @ApiPropertyOptional({ example: 'Nouveau nom de chaîne' })
  @IsString()
  @IsOptional()
  name?: string;
}
