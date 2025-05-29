import { Injectable, Inject, Logger, ConflictException } from '@nestjs/common';
import { ISubscriptionRepository } from '../../domain/interfaces/subscription.repository.interface';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { CreateSubscriptionDto } from '../dtos/subscription.dto';
import { SubscriptionMapper } from '../../domain/mappers/subscription.mapper';

@Injectable()
export class SubscribeUseCase {
  private readonly logger = new Logger(SubscribeUseCase.name);

  constructor(
    @Inject('ISubscriptionRepository')
    private readonly repo: ISubscriptionRepository,
    private readonly mapper: SubscriptionMapper,
  ) {}

  async execute(dto: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    try {
      this.logger.log(
        `User ${dto.userId} subscribing to channel ${dto.channelId}`,
      );
      return await this.repo.create(dto);
    } catch (error) {
      this.logger.error("Erreur métier lors de l'abonnement", error.stack);
      if (error instanceof ConflictException) throw error;
      throw new ConflictException("Erreur lors de la création de l'abonnement");
    }
  }
}
