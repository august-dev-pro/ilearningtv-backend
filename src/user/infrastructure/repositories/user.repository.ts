import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dtos/user.dto';
import { IUserRepository } from 'src/user/application/interfaces/user.repository.interface';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { Role } from 'src/user/domain/enums/role.enum';
import { UserMapper } from 'src/user/domain/mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  // create
  async create(data: CreateUserDto): Promise<UserEntity> {
    const toPersist = this.mapper.toPersistence(data);
    const created = await this.prisma.user.create({ data: toPersist });
    return this.mapper.toDomain(created);
  }

  // find by id
  async findById(id: string): Promise<UserEntity> {
    const record = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`UserEntity with id ${id} not found`);
    }

    return this.mapper.toDomain(record);
  }

  // update
  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const toUpdate = this.mapper.toUpdatePersistence(data);
    const updated = await this.prisma.user.update({
      where: { id },
      data: toUpdate,
    });

    return this.mapper.toDomain(updated);
  }

  // find all
  async findAll(): Promise<UserEntity[]> {
    const records = await this.prisma.user.findMany();
    return records.map((record) => this.mapper.toDomain(record));
  }

  // delete
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  // Désactiver un utilisateur
  async deactivate(id: string): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    return this.mapper.toDomain(updated);
  }

  // Changer le rôle d'un utilisateur
  async changeRole(id: string, role: string): Promise<UserEntity> {
    // Import the Role enum from your Prisma client
    // import { Role } from '@prisma/client'; (add this at the top if not already imported)
    const updated = await this.prisma.user.update({
      where: { id },
      data: { role: role as Role }, // Replace 'any' with 'Role' if you import the enum
    });
    return this.mapper.toDomain(updated);
  }
}
