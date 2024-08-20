import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [TrainService],
  controllers: [TrainController],
  exports: [TrainService],
})
export class TrainModule {}
