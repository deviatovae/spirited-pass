import { Controller, Get } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { StationDto } from './dto/station.dto';
import { StationService } from './station.service';
@Controller('station')
export class StationController {
  constructor(private station: StationService) {}

  @ApiUnauthorizedResponse()
  @ApiExtraModels(StationDto)
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(StationDto) },
    },
  })
  @Get()
  async getList(): Promise<StationDto[]> {
    return await this.station.getList();
  }
}
