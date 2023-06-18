import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
