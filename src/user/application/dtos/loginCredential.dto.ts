
import { IsOptional, IsString, IsEnum, IsInt, IsBoolean, IsDate, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class LoginCredentialDto {
@ApiProperty({ example: "user@example.com"})
  @IsString()
  email: string;

@ApiProperty({ example: "StrongPassword123!"})
  @IsString()
  password: string;
}
