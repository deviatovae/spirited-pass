import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StationModule } from 'src/station/station.module';

@Module({
  imports: [PrismaModule, StationModule],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
