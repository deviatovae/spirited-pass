import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StationModule } from './station/station.module';
import { TicketModule } from './ticket/ticket.module';
import { TrainModule } from './train/train.module';
import { ExistConstraint } from './validation/exist.constraint';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    StationModule,
    TicketModule,
    TrainModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [],
  providers: [ExistConstraint],
})
export class AppModule {}
