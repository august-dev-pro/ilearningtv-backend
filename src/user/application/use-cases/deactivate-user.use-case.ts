import { Inject, Logger } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

export class DeactivateUserUseCase {
  private readonly logger = new Logger(DeactivateUserUseCase.name);

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserEntity> {
    this.logger.log('Désactivation utilisateur');
    return this.userRepository.deactivate(id);
  }
}
