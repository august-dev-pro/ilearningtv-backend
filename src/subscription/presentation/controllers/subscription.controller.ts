import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SubscriptionService } from '../../infrastructure/services/subscription.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/CurrentUser';

@ApiTags('Subscription')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly service: SubscriptionService) {}

  @Post()
  @ApiOperation({ summary: "S'abonner à une chaîne" })
  async subscribe(
    @Param('channelId') channelId: string,
    @CurrentUser() user: any,
  ) {
    const dtoWithUser = {
      channelId: channelId,
      userId: user.id || user.userId,
    };
    return await this.service.subscribeUser(dtoWithUser);
  }

  @Delete(':channelId')
  @ApiOperation({ summary: "Se désabonner d'une chaîne" })
  async unsubscribe(
    @Param('channelId') channelId: string,
    @CurrentUser() user: any,
  ) {
    const dtoWithUser = {
      channelId: channelId,
      userId: user.id || user.userId,
    };

    return await this.service.unsubscribeUser(dtoWithUser);
  }

  @Get('me')
  @ApiOperation({ summary: 'Lister mes abonnements' })
  async mySubscriptions(@CurrentUser() user: any) {
    return await this.service.getUserSubscriptions(user.id || user.userId);
  }

  @Get('channel/:channelId')
  @ApiOperation({ summary: "Lister les abonnés d'une chaîne" })
  async channelSubscribers(@Param('channelId') channelId: string) {
    return await this.service.getChannelSubscribers(channelId);
  }
}
