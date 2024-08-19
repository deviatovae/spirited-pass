import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
