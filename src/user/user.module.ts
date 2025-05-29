/**
 * UserModule est le module principal qui gère l'entité User.
 * Il regroupe tous les composants nécessaires pour traiter cette entité :
 * - Contrôleur
 * - Repository
 * - Use Cases
 * - Mapper
 * - Service
 */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/infrastructure/services/user.service';
import { UserController } from 'src/user/presentation/controllers/user.controller';
import { UserRepository } from 'src/user/infrastructure/repositories/user.repository';
import { CreateUserUseCase } from 'src/user/application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from 'src/user/application/use-cases/update-user.use-case';
import { GetByIdUserUseCase } from 'src/user/application/use-cases/getById-user.use-case';
import { GetAllUserUseCase } from 'src/user/application/use-cases/getAll-user.use-case';
import { DeleteUserUseCase } from 'src/user/application/use-cases/delete-user.use-case';
import { UserMapper } from 'src/user/domain/mappers/user.mapper';
import { DeactivateUserUseCase } from './application/use-cases/deactivate-user.use-case';
import { ChangeUserRoleUseCase } from './application/use-cases/change-user-role.use-case';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserService,
    UserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetByIdUserUseCase,
    GetAllUserUseCase,
    DeleteUserUseCase,
    DeactivateUserUseCase,
    ChangeUserRoleUseCase,
    UserMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
