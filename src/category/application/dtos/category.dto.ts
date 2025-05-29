import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Programmation' })
  @IsString()
  name: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Développement Web' })
  @IsString()
  name?: string;
}
