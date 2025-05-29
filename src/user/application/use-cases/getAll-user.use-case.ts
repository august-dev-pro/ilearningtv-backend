/**
 * Use Case pour récupérer tous les Users.
 */
import { Inject, Logger } from '@nestjs/common';
import { IUserRepository } from 'src/user/application/interfaces/user.repository.interface';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export class GetAllUserUseCase {
  private readonly logger = new Logger(GetAllUserUseCase.name);

  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserEntity[]> {
    this.logger.log('Récupération de tous les Users');
    try {
      const result = await this.userRepository.findAll();
      this.logger.log('Récupération réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération', error.stack);
      throw error;
    }
  }
}