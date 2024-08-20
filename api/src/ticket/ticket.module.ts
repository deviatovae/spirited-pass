import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StationModule } from 'src/station/station.module';
import { ConfigModule } from '@nestjs/config';
import { TrainModule } from 'src/train/train.module';

@Module({
  imports: [PrismaModule, StationModule, TrainModule, ConfigModule],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
