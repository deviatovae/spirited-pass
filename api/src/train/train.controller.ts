import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { TrainDto } from './dto/train.dto';
import { TrainService } from './train.service';

@Controller('train')
@ApiBearerAuth()
export class TrainController {
  constructor(private train: TrainService) {}

  @Get()
  @ApiUnauthorizedResponse()
  @ApiExtraModels(TrainDto)
  @ApiResponse({ status: 200, schema: { $ref: getSchemaPath(TrainDto) } })
  async getTrain() {
    return await this.train.getTrain();
  }
}
