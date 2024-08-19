import { Controller, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { TokenResult } from './dto/tokenResult.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  @ApiExtraModels(TokenResult)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(TokenResult) },
  })
  async getJWT() {
    return await this.authService.getToken();
  }
}
