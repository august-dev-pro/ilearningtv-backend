import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IChannelRepository } from '../../domain/interfaces/channel.repository.interface';
import { ChannelMapper } from '../../domain/mappers/channel.mapper';
import { ChannelEntity } from '../../domain/entities/channel.entity';
import {
  CreateChannelDto,
  UpdateChannelDto,
} from '../../application/dtos/channel.dto';

@Injectable()
export class ChannelRepository implements IChannelRepository {
  private readonly logger = new Logger(ChannelRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ChannelMapper,
  ) {}

  async create(data: CreateChannelDto): Promise<ChannelEntity> {
    try {
      const created = await this.prisma.channel.create({ data });
      this.logger.log(`Channel created: ${created.id}`);
      return this.mapper.toDomain(created);
    } catch (error) {
      this.logger.error('Error creating channel', error.stack);
      throw new ConflictException('Erreur lors de la création de la chaîne');
    }
  }

  async findById(id: string): Promise<ChannelEntity | null> {
    try {
      const found = await this.prisma.channel.findUnique({ where: { id } });
      if (!found) {
        this.logger.warn(`Channel not found: ${id}`);
        throw new NotFoundException('Chaîne non trouvée');
      }
      return this.mapper.toDomain(found);
    } catch (error) {
      this.logger.error('Error finding channel', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<ChannelEntity[]> {
    try {
      const records = await this.prisma.channel.findMany();
      return records.map(this.mapper.toDomain);
    } catch (error) {
      this.logger.error('Error listing channels', error.stack);
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<ChannelEntity[]> {
    try {
      const records = await this.prisma.channel.findMany({ where: { userId } });
      return records.map(this.mapper.toDomain);
    } catch (error) {
      this.logger.error('Error listing channels by user', error.stack);
      throw error;
    }
  }

  async update(id: string, data: UpdateChannelDto): Promise<ChannelEntity> {
    try {
      const updated = await this.prisma.channel.update({ where: { id }, data });
      this.logger.log(`Channel updated: ${id}`);
      return this.mapper.toDomain(updated);
    } catch (error) {
      this.logger.error('Error updating channel', error.stack);
      if (error.code === 'P2025') {
        throw new NotFoundException('Chaîne non trouvée');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.channel.delete({ where: { id } });
      this.logger.log(`Channel deleted: ${id}`);
    } catch (error) {
      this.logger.error('Error deleting channel', error.stack);
      if (error.code === 'P2025') {
        throw new NotFoundException('Chaîne non trouvée');
      }
      throw error;
    }
  }
}
