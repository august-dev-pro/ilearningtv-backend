
import { IsOptional, IsString, IsEnum, IsInt, IsBoolean, IsDate, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class ResetPasswordDto {
@ApiProperty({ example: "user@example.com"})
  @IsString()
  email: string;

@ApiProperty({ example: "NewStrongPass123!"})
  @IsString()
  newPassword: string;
}
