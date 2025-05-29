import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dtos/user.dto';
import { Role } from 'src/user/domain/enums/role.enum';

@Injectable()
export class UserMapper {
  toDomain(data: any): UserEntity {
    return new UserEntity(
      data.id,
      data.email,
      data.password,
      data.name,
      data.isActive,
      data.role as Role,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.avatarUrl,
    );
  }

  toPersistence(dto: CreateUserDto): any {
    return {
      email: dto.email,
      password: dto.password,
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      isActive: dto.isActive,
      role: dto.role,
    };
  }

  toUpdatePersistence(dto: UpdateUserDto): any {
    const data: any = {};
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.password !== undefined) data.password = dto.password;
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.avatarUrl !== undefined) data.avatarUrl = dto.avatarUrl;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.role !== undefined) data.role = dto.role;
    return data;
  }
}
