import { Inject, Logger } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

export class ChangeUserRoleUseCase {
  private readonly logger = new Logger(ChangeUserRoleUseCase.name);

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, role: string): Promise<UserEntity> {
    this.logger.log(`Changement de rôle pour l'utilisateur ${id} vers ${role}`);
    return this.userRepository.changeRole(id, role);
  }
}
