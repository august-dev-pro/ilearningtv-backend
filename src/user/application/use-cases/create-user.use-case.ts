/**
 * Use Case pour créer un User.
 */
import { Inject, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/user/application/dtos/user.dto';
import { IUserRepository } from 'src/user/application/interfaces/user.repository.interface';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    this.logger.log('Début création User');
    try {
      const result = await this.userRepository.create(data);
      this.logger.log('Création réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la création', error.stack);
      throw error;
    }
  }
}