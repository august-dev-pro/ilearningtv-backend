import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/user/application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from 'src/user/application/use-cases/update-user.use-case';
import { GetByIdUserUseCase } from 'src/user/application/use-cases/getById-user.use-case';
import { GetAllUserUseCase } from 'src/user/application/use-cases/getAll-user.use-case';
import { DeleteUserUseCase } from 'src/user/application/use-cases/delete-user.use-case';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dtos/user.dto';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { DeactivateUserUseCase } from 'src/user/application/use-cases/deactivate-user.use-case';
import { ChangeUserRoleUseCase } from 'src/user/application/use-cases/change-user-role.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly updateUseCase: UpdateUserUseCase,
    private readonly getByIdUseCase: GetByIdUserUseCase,
    private readonly getAllUseCase: GetAllUserUseCase,
    private readonly deleteUseCase: DeleteUserUseCase,
    private readonly deactivateUseCase: DeactivateUserUseCase,
    private readonly changeRoleUseCase: ChangeUserRoleUseCase,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    return await this.createUseCase.execute(dto);
  }
  async update(id: string, dto: UpdateUserDto): Promise<UserEntity | null> {
    return await this.updateUseCase.execute(id, dto);
  }
  async getById(id: string): Promise<UserEntity | null> {
    return await this.getByIdUseCase.execute(id);
  }
  async getAll(): Promise<UserEntity[]> {
    return await this.getAllUseCase.execute();
  }
  async delete(id: string): Promise<void> {
    return await this.deleteUseCase.execute(id);
  }

  async deactivate(id: string) {
    return this.deactivateUseCase.execute(id);
  }

  async changeRole(id: string, role: string) {
    return this.changeRoleUseCase.execute(id, role);
  }
}
