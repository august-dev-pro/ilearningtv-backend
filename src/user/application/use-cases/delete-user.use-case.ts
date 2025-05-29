/**
 * Use Case pour supprimer un User.
 */
import { Inject, Logger } from '@nestjs/common';
import { IUserRepository } from 'src/user/application/interfaces/user.repository.interface';

export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Suppression de User id: ${id}`);
    try {
      await this.userRepository.delete(id);
      this.logger.log('Suppression réussie');
    } catch (error) {
      this.logger.error('Erreur lors de la suppression', error.stack);
      throw error;
    }
  }
}