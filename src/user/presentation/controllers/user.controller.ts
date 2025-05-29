/**
 * UserController gère les endpoints de l'API pour l'entité User.
 * Il utilise les cas d'utilisation (Use Cases) pour orchestrer les différentes actions métiers liées à l'entité.
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Injectable,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/user/infrastructure/services/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dtos/user.dto';

@Injectable()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // 📌 Mettre à jour un user
  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.service.update(id, dto);
  }

  // 📌 Récupérer un user par ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  // 📌 Récupérer tous les users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAll() {
    return await this.service.getAll();
  }

  // 📌 Supprimer un user
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  // Désactiver un utilisateur
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.service.deactivate(id);
  }

  // Changer le rôle d'un utilisateur
  @Patch(':id/role')
  async changeRole(@Param('id') id: string, @Body('role') role: string) {
    return this.service.changeRole(id, role);
  }
}
