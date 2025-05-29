import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ISubscriptionRepository } from '../../domain/interfaces/subscription.repository.interface';
import { SubscriptionMapper } from '../../domain/mappers/subscription.mapper';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { CreateSubscriptionDto } from 'src/subscription/application/dtos/subscription.dto';

@Injectable()
export class SubscriptionRepository implements ISubscriptionRepository {
  private readonly logger = new Logger(SubscriptionRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: SubscriptionMapper,
  ) {}

  async create(dto: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    try {
      const data = await this.mapper.toPersistence(dto);
      const created = await this.prisma.subscription.create({
        data: data,
      });
      this.logger.log(
        `User ${data.userId} subscribed to channel ${data.channelId}`,
      );
      return this.mapper.toDomain(created);
    } catch (error) {
      this.logger.error('Error creating subscription', error.stack);
      if (error.code === 'P2002') {
        throw new ConflictException('Déjà abonné à cette chaîne');
      }
      throw error;
    }
  }

  async delete(userId: string, channelId: string): Promise<void> {
    try {
      await this.prisma.subscription.delete({
        where: { userId_channelId: { userId, channelId } },
      });
      this.logger.log(`User ${userId} unsubscribed from channel ${channelId}`);
    } catch (error) {
      this.logger.error('Error deleting subscription', error.stack);
      if (error.code === 'P2025') {
        throw new NotFoundException('Abonnement non trouvé');
      }
      throw error;
    }
  }

  async findByUser(userId: string): Promise<SubscriptionEntity[]> {
    const records = await this.prisma.subscription.findMany({
      where: { userId },
    });
    return records.map(this.mapper.toDomain);
  }

  async findByChannel(channelId: string): Promise<SubscriptionEntity[]> {
    const records = await this.prisma.subscription.findMany({
      where: { channelId },
    });
    return records.map(this.mapper.toDomain);
  }

  async isSubscribed(userId: string, channelId: string): Promise<boolean> {
    const sub = await this.prisma.subscription.findUnique({
      where: { userId_channelId: { userId, channelId } },
    });
    return !!sub;
  }
}
