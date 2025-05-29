import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChannelService } from 'src/channel/infrastructure/services/channel.service';
import {
  CreateChannelDto,
  UpdateChannelDto,
} from 'src/channel/application/dtos/channel.dto';
import { CurrentUser } from 'src/common/decorators/CurrentUser';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Injectable()
@ApiTags('Channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Créer une chaîne' })
  async create(
    @Param('channelName') channelName: string,
    @CurrentUser() user: any,
  ) {
    const dtoWithUser = { name: channelName, userId: user.id || user.userId };
    return await this.service.create(dtoWithUser);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les chaînes' })
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une chaîne par ID' })
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: "Lister les chaînes d'un utilisateur" })
  async findByUserId(@Param('userId') userId: string) {
    return await this.service.findByUserId(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une chaîne' })
  async update(@Param('id') id: string, @Body() dto: UpdateChannelDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une chaîne' })
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { success: true };
  }
}
