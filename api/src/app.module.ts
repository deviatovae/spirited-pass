import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StationModule } from './station/station.module';

@Module({
  imports: [AuthModule, StationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
