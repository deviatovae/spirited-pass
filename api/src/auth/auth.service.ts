import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResult } from './dto/tokenResult.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getToken(): Promise<TokenResult> {
    return {
      token: await this.jwtService.signAsync({}),
    };
  }
}
