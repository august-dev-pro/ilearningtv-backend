/**
 * Use Case pour mettre à jour un User existant.
 */
import { Inject, Logger } from '@nestjs/common';
import { UpdateUserDto } from 'src/user/application/dtos/user.dto';
import { IUserRepository } from 'src/user/application/interfaces/user.repository.interface';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name);

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, data: UpdateUserDto): Promise<UserEntity | null> {
    this.logger.log(`Mise à jour de User id: ${id}`);
    try {
      const result = await this.userRepository.update(id, data);
      this.logger.log('Mise à jour réussie');
      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la mise à jour', error.stack);
      throw error;
    }
  }
}
