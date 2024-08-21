import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [StationService],
  controllers: [StationController],
  exports: [StationService],
})
export class StationModule {}
