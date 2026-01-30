import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDate,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' })
  @IsString()
  refreshToken: string;
}
