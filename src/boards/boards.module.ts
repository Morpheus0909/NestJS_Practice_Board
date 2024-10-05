import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { PrismaService } from 'src/prisma.client';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, PrismaService]
})
export class BoardsModule {}
