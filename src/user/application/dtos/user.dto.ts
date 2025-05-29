import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/user/domain/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'https://cdn.site/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 'USER', enum: Role })
  @IsEnum(Role)
  role: Role;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: 'StrongPassword123!' })
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'https://cdn.site/avatar.jpg' })
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'USER', enum: Role })
  @IsEnum(Role)
  role?: Role;
}
