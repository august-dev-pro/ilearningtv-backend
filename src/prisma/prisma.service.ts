import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service Prisma permettant d'exposer une instance globale du client Prisma
 */
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
