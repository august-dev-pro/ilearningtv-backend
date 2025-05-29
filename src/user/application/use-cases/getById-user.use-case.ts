/**
 * Use Case pour récupérer un User par son ID.
 */
import { Inject, Logger } from '@nestjs/common';
import { IUserRepository } from 'src/user/application/interfaces/user.repository.interface';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export class GetByIdUserUseCase {
  private readonly logger = new Logger(GetByIdUserUseCase.name);

  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserEntity | null> {
    this.logger.log(`Recherche de User par id: ${id}`);
    try {
      const result = await this.userRepository.findById(id);
      this.logger.log('Recherche réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche', error.stack);
      throw error;
    }
  }
}