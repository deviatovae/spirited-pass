import { ApiProperty } from '@nestjs/swagger';
import * as R from 'remeda';
import { StationDto } from 'src/station/dto/station.dto';
export class TicketDto {
  @ApiProperty()
  trainId: number;

  @ApiProperty()
  station: StationDto;

  @ApiProperty()
  name: string;

  @ApiProperty()
  issuedAt: Date;

  constructor(values: TicketDto) {
    Object.assign(
      this,
      R.pick(values, ['trainId', 'station', 'name', 'issuedAt']),
    );
  }
}
