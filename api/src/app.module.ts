import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StationModule } from './station/station.module';
import { TicketModule } from './ticket/ticket.module';
import { ExistConstraint } from './validation/exist.constraint';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, StationModule, TicketModule],
  controllers: [],
  providers: [ExistConstraint],
})
export class AppModule {}
