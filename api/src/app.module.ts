import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StationModule } from './station/station.module';
import { TicketModule } from './ticket/ticket.module';
import { TrainModule } from './train/train.module';
import { ExistConstraint } from './validation/exist.constraint';

@Module({
  imports: [PrismaModule, AuthModule, StationModule, TicketModule, TrainModule],
  controllers: [],
  providers: [ExistConstraint],
})
export class AppModule {}
