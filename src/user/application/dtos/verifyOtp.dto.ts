
import { IsOptional, IsString, IsEnum, IsInt, IsBoolean, IsDate, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class VerifyOtpDto {
@ApiProperty({ example: "user@example.com"})
  @IsString()
  email: string;

@ApiProperty({ example: "123456"})
  @IsString()
  otp: string;
}
